import { useState, useEffect, useRef, type FormEvent } from 'react';
import { loadNewsletterIndex } from '../siteIndex';
import '../styles/dashboard.css';

interface Subscriber {
  email: string;
  name?: string;
  ip?: string;
  subscribedAt: string;
}

type IssueOption = { slug: string; title: string };

export default function NewsletterDashboard() {
  const [adminKey, setAdminKey] = useState('');
  const [authed, setAuthed] = useState(false);

  // Subscribers
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [subStatus, setSubStatus] = useState('');
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [filter, setFilter] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Send
  const [issueList, setIssueList] = useState<IssueOption[]>([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [previewHtml, setPreviewHtml] = useState('');
  const [sendStatus, setSendStatus] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadNewsletterIndex().then((list) => {
      if (cancelled) return;
      setIssueList(
        list
          .map((m) => ({ slug: m.slug, title: m.title || m.slug }))
          .sort((a, b) => b.slug.localeCompare(a.slug))
      );
    });
    return () => { cancelled = true; };
  }, []);

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
      body: JSON.stringify({ email: newEmail.trim(), name: newName.trim() || undefined }),
    });
    const data = await res.json();
    setSubStatus(data.added ? `Added ${newEmail}` : `Already exists`);
    setNewEmail('');
    setNewName('');
    loadSubscribers();
  }

  async function removeSub(email: string) {
    if (!window.confirm(`Remove ${email}?`)) return;
    await fetch('/.netlify/functions/subscribers', {
      method: 'DELETE',
      headers: headers(),
      body: JSON.stringify({ email }),
    });
    setSubStatus(`Removed ${email}`);
    loadSubscribers();
  }

  function startEdit(s: Subscriber) {
    setEditingEmail(s.email);
    setEditName(s.name || '');
    setEditEmail(s.email);
  }

  function cancelEdit() {
    setEditingEmail(null);
    setEditName('');
    setEditEmail('');
  }

  async function saveEdit(originalEmail: string) {
    const body: Record<string, string> = { email: originalEmail };
    if (editEmail.trim() && editEmail.trim() !== originalEmail) {
      body.newEmail = editEmail.trim();
    }
    body.name = editName.trim();
    const res = await fetch('/.netlify/functions/subscribers', {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setSubStatus(`Updated ${originalEmail}`);
      cancelEdit();
      loadSubscribers();
    } else {
      const data = await res.json().catch(() => ({}));
      setSubStatus(`Error: ${data.error || res.status}`);
    }
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(subscribers, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `subscribers-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function importJson(file: File) {
    const text = await file.text();
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      setSubStatus('Invalid JSON');
      return;
    }
    const list = Array.isArray(parsed)
      ? parsed
      : (parsed as { subscribers?: unknown })?.subscribers;
    if (!Array.isArray(list)) {
      setSubStatus('Expected an array of subscribers');
      return;
    }
    if (
      !window.confirm(
        `Replace current ${subscribers.length} subscriber(s) with ${list.length} from file? This cannot be undone.`,
      )
    ) {
      return;
    }
    const res = await fetch('/.netlify/functions/subscribers', {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify({ subscribers: list }),
    });
    if (res.ok) {
      const data = await res.json();
      setSubStatus(`Imported ${data.count} subscriber(s)`);
      loadSubscribers();
    } else {
      const data = await res.json().catch(() => ({}));
      setSubStatus(`Import failed: ${data.error || res.status}`);
    }
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

  const TEST_EMAIL = 'jz9542063@gmail.com';

  async function send(testEmail?: string) {
    if (!selectedSlug || sending) return;
    const confirmed = testEmail
      ? window.confirm(`Send test of "${selectedSlug}" to ${testEmail}?`)
      : window.confirm(`Send "${selectedSlug}" to ${subscribers.length} subscriber(s)?`);
    if (!confirmed) return;
    setSending(true);
    setSendStatus(testEmail ? 'Sending test...' : 'Sending...');
    try {
      const res = await fetch('/.netlify/functions/send', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(testEmail ? { slug: selectedSlug, testEmail } : { slug: selectedSlug }),
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

  const filtered = filter.trim()
    ? subscribers.filter((s) => {
        const q = filter.toLowerCase();
        return (
          s.email.toLowerCase().includes(q) ||
          (s.name || '').toLowerCase().includes(q) ||
          (s.ip || '').toLowerCase().includes(q)
        );
      })
    : subscribers;

  return (
    <main className="dash">
      <div className="dash-inner dash-inner--wide">
        <h1 className="dash-title">Newsletter Dashboard</h1>

        {/* --- Subscribers --- */}
        <section className="dash-section">
          <div className="dash-section-head">
            <h2 className="dash-h2">Subscribers ({subscribers.length})</h2>
            <div className="dash-section-actions">
              <button className="dash-btn" onClick={exportJson} disabled={subscribers.length === 0}>
                Export JSON
              </button>
              <button className="dash-btn" onClick={() => fileInputRef.current?.click()}>
                Import JSON
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) importJson(file);
                  e.target.value = '';
                }}
              />
            </div>
          </div>

          <form onSubmit={addSub} className="dash-row">
            <input
              type="text"
              placeholder="Name (optional)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="dash-input dash-input--small"
            />
            <input
              type="email"
              placeholder="email@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="dash-input"
            />
            <button type="submit" className="dash-btn">Add</button>
          </form>

          <input
            type="search"
            placeholder="Filter by name, email, or IP..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="dash-input dash-filter"
          />

          {subStatus && <p className="dash-status">{subStatus}</p>}

          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>IP</th>
                  <th>Signed up</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => {
                  const editing = editingEmail === s.email;
                  return (
                    <tr key={s.email}>
                      <td>
                        {editing ? (
                          <input
                            type="text"
                            className="dash-input dash-input--cell"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder="Name"
                          />
                        ) : (
                          <span className={s.name ? '' : 'dash-muted'}>
                            {s.name || '—'}
                          </span>
                        )}
                      </td>
                      <td>
                        {editing ? (
                          <input
                            type="email"
                            className="dash-input dash-input--cell"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                          />
                        ) : (
                          <span className="dash-mono">{s.email}</span>
                        )}
                      </td>
                      <td className="dash-mono dash-muted">{s.ip || '—'}</td>
                      <td className="dash-muted">
                        {new Date(s.subscribedAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="dash-actions">
                        {editing ? (
                          <>
                            <button
                              className="dash-btn dash-btn--small"
                              onClick={() => saveEdit(s.email)}
                            >
                              Save
                            </button>
                            <button
                              className="dash-btn dash-btn--small"
                              onClick={cancelEdit}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="dash-btn dash-btn--small"
                              onClick={() => startEdit(s)}
                            >
                              Edit
                            </button>
                            <button
                              className="dash-btn dash-btn--small dash-btn--danger"
                              onClick={() => removeSub(s.email)}
                            >
                              Remove
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="dash-empty">
                      {subscribers.length === 0 ? 'No subscribers yet.' : 'No matches.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
              onClick={() => send(TEST_EMAIL)}
              disabled={!selectedSlug || sending}
            >
              {sending ? 'Sending...' : `Send test to ${TEST_EMAIL}`}
            </button>
            <button
              className="dash-btn"
              onClick={() => send()}
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
