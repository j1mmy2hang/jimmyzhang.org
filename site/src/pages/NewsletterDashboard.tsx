import { useState, useEffect, type FormEvent } from 'react';
import '../styles/dashboard.css';

interface Subscriber {
  email: string;
  subscribedAt: string;
}

const modules = import.meta.glob('../../../content/newsletter/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): Record<string, string> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fm: Record<string, string> = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const m = line.match(/^([\w-]+):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  });
  return fm;
}

const issueList = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    const fm = parseFrontmatter(raw);
    return { slug, title: fm.title || slug };
  })
  .sort((a, b) => b.slug.localeCompare(a.slug));

export default function NewsletterDashboard() {
  const [adminKey, setAdminKey] = useState('');
  const [authed, setAuthed] = useState(false);

  // Subscribers
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [subStatus, setSubStatus] = useState('');

  // Send
  const [selectedSlug, setSelectedSlug] = useState('');
  const [previewHtml, setPreviewHtml] = useState('');
  const [sendStatus, setSendStatus] = useState('');
  const [sending, setSending] = useState(false);

  function headers() {
    return {
      'Content-Type': 'application/json',
      'x-admin-key': adminKey,
    };
  }

  async function login(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/.netlify/functions/subscribers', {
        headers: { 'x-admin-key': adminKey },
      });
      if (res.ok) {
        setAuthed(true);
        const data = await res.json();
        setSubscribers(data.subscribers);
      } else {
        setSubStatus('Invalid admin key');
      }
    } catch {
      setSubStatus('Could not connect');
    }
  }

  async function loadSubscribers() {
    const res = await fetch('/.netlify/functions/subscribers', {
      headers: { 'x-admin-key': adminKey },
    });
    if (res.ok) {
      const data = await res.json();
      setSubscribers(data.subscribers);
    }
  }

  async function addSub(e: FormEvent) {
    e.preventDefault();
    if (!newEmail.trim()) return;
    const res = await fetch('/.netlify/functions/subscribers', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ email: newEmail.trim() }),
    });
    const data = await res.json();
    setSubStatus(data.added ? `Added ${newEmail}` : `Already exists`);
    setNewEmail('');
    loadSubscribers();
  }

  async function removeSub(email: string) {
    await fetch('/.netlify/functions/subscribers', {
      method: 'DELETE',
      headers: headers(),
      body: JSON.stringify({ email }),
    });
    setSubStatus(`Removed ${email}`);
    loadSubscribers();
  }

  async function loadPreview() {
    if (!selectedSlug) return;
    setPreviewHtml('');
    const res = await fetch('/.netlify/functions/preview', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ slug: selectedSlug }),
    });
    if (res.ok) {
      const data = await res.json();
      setPreviewHtml(data.html);
    } else {
      setPreviewHtml('<p>Could not load preview</p>');
    }
  }

  useEffect(() => {
    if (selectedSlug) loadPreview();
  }, [selectedSlug]);

  async function handleSend() {
    if (!selectedSlug || sending) return;
    const confirmed = window.confirm(
      `Send "${selectedSlug}" to ${subscribers.length} subscriber(s)?`
    );
    if (!confirmed) return;
    setSending(true);
    setSendStatus('Sending...');
    try {
      const res = await fetch('/.netlify/functions/send', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ slug: selectedSlug }),
      });
      const data = await res.json();
      setSendStatus(data.message || data.error || 'Done');
    } catch {
      setSendStatus('Failed to send');
    }
    setSending(false);
  }

  if (!authed) {
    return (
      <main className="dash">
        <div className="dash-inner">
          <h1 className="dash-title">Newsletter Dashboard</h1>
          <form onSubmit={login} className="dash-login">
            <input
              type="password"
              placeholder="Admin key"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="dash-input"
            />
            <button type="submit" className="dash-btn">Login</button>
          </form>
          {subStatus && <p className="dash-status">{subStatus}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="dash">
      <div className="dash-inner">
        <h1 className="dash-title">Newsletter Dashboard</h1>

        {/* --- Subscribers --- */}
        <section className="dash-section">
          <h2 className="dash-h2">Subscribers ({subscribers.length})</h2>
          <form onSubmit={addSub} className="dash-row">
            <input
              type="email"
              placeholder="Add subscriber email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="dash-input"
            />
            <button type="submit" className="dash-btn">Add</button>
          </form>
          {subStatus && <p className="dash-status">{subStatus}</p>}
          <ul className="dash-list">
            {subscribers.map((s) => (
              <li key={s.email} className="dash-list-item">
                <span className="dash-email">{s.email}</span>
                <span className="dash-date">
                  {new Date(s.subscribedAt).toLocaleDateString()}
                </span>
                <button
                  className="dash-btn dash-btn--danger"
                  onClick={() => removeSub(s.email)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* --- Send --- */}
        <section className="dash-section">
          <h2 className="dash-h2">Send Newsletter</h2>
          <div className="dash-row">
            <select
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="dash-select"
            >
              <option value="">Select an issue...</option>
              {issueList.map((i) => (
                <option key={i.slug} value={i.slug}>
                  {i.title} ({i.slug})
                </option>
              ))}
            </select>
            <button
              className="dash-btn"
              onClick={handleSend}
              disabled={!selectedSlug || sending}
            >
              {sending ? 'Sending...' : 'Send to all'}
            </button>
          </div>
          {sendStatus && <p className="dash-status">{sendStatus}</p>}
          {previewHtml && (
            <div className="dash-preview">
              <h3 className="dash-h3">Email Preview</h3>
              <iframe
                srcDoc={previewHtml}
                title="Email preview"
                className="dash-iframe"
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
