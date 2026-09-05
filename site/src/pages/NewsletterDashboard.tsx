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

interface Reconciliation {
  subject: string;
  subscriberCount: number;
  receivedCount: number;
  missing: { email: string; name: string | null }[];
  notSubscribed: string[];
  bounced: { email: string; event: string }[];
  logEarliest: string | null;
  logComplete: boolean;
  logError: string | null;
}

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
  const [sendFailures, setSendFailures] = useState<string[]>([]);
  const [sending, setSending] = useState(false);

  // Reconcile
  const [recon, setRecon] = useState<Reconciliation | null>(null);
  const [reconStatus, setReconStatus] = useState('');
  const [reconciling, setReconciling] = useState(false);

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

  function exportCsv() {
    const escape = (v: string) =>
      /[",\r\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
    const header = ['name', 'email', 'ip', 'subscribedAt'];
    const rows = subscribers.map((s) =>
      [s.name || '', s.email, s.ip || '', s.subscribedAt].map(escape).join(','),
    );
    const csv = [header.join(','), ...rows].join('\r\n') + '\r\n';
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `subscribers-${stamp}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function parseCsv(text: string): Subscriber[] {
    const rows: string[][] = [];
    let row: string[] = [];
    let field = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') {
            field += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          field += c;
        }
      } else {
        if (c === '"') {
          inQuotes = true;
        } else if (c === ',') {
          row.push(field);
          field = '';
        } else if (c === '\n' || c === '\r') {
          if (c === '\r' && text[i + 1] === '\n') i++;
          row.push(field);
          rows.push(row);
          row = [];
          field = '';
        } else {
          field += c;
        }
      }
    }
    if (field.length > 0 || row.length > 0) {
      row.push(field);
      rows.push(row);
    }
    if (rows.length === 0) return [];

    const header = rows[0]!.map((h) => h.trim().toLowerCase());
    const idx = (n: string) => header.indexOf(n);
    const iName = idx('name');
    const iEmail = idx('email');
    const iIp = idx('ip');
    const iDate = idx('subscribedat');
    if (iEmail === -1) {
      throw new Error("CSV must include an 'email' column");
    }

    const subs: Subscriber[] = [];
    for (let r = 1; r < rows.length; r++) {
      const cols = rows[r]!;
      if (cols.every((c) => c.trim() === '')) continue;
      const email = (cols[iEmail] || '').trim();
      if (!email) continue;
      subs.push({
        email,
        name: iName >= 0 ? (cols[iName] || '').trim() || undefined : undefined,
        ip: iIp >= 0 ? (cols[iIp] || '').trim() || undefined : undefined,
        subscribedAt:
          iDate >= 0 && cols[iDate]?.trim()
            ? cols[iDate]!.trim()
            : new Date().toISOString(),
      });
    }
    return subs;
  }

  async function importCsv(file: File) {
    const text = await file.text();
    let list: Subscriber[];
    try {
      list = parseCsv(text);
    } catch (e) {
      setSubStatus(`Invalid CSV: ${e instanceof Error ? e.message : String(e)}`);
      return;
    }
    if (list.length === 0) {
      setSubStatus('No rows found in CSV');
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
    setRecon(null);
    setReconStatus('');
    setSendFailures([]);
  }, [selectedSlug]);

  async function reconcile() {
    if (!selectedSlug || reconciling) return;
    setReconciling(true);
    setRecon(null);
    setReconStatus('Checking Resend log...');
    try {
      const res = await fetch('/.netlify/functions/reconcile', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ slug: selectedSlug }),
      });
      const data = await res.json();
      if (!res.ok) {
        setReconStatus(data.error || `Error ${res.status}`);
      } else {
        setRecon(data);
        setReconStatus('');
      }
    } catch {
      setReconStatus('Could not reach the reconcile endpoint');
    }
    setReconciling(false);
  }

  async function sendToMissing() {
    if (!recon || recon.missing.length === 0 || sending) return;
    const emails = recon.missing.map((m) => m.email);
    if (
      !window.confirm(
        `Send "${selectedSlug}" to the ${emails.length} subscriber(s) who never received it?`,
      )
    ) {
      return;
    }
    setSending(true);
    setSendFailures([]);
    setSendStatus(`Sending to ${emails.length} missing subscriber(s)...`);
    try {
      const res = await fetch('/.netlify/functions/send', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ slug: selectedSlug, only: emails }),
      });
      const data = await res.json();
      setSendStatus(data.message || data.error || 'Done');
      setSendFailures(Array.isArray(data.failedEmails) ? data.failedEmails : []);
    } catch {
      setSendStatus('Failed to send');
    }
    setSending(false);
    reconcile();
  }

  const TEST_EMAIL = 'jz9542063@gmail.com';

  async function send(testEmail?: string) {
    if (!selectedSlug || sending) return;
    const confirmed = testEmail
      ? window.confirm(`Send test of "${selectedSlug}" to ${testEmail}?`)
      : window.confirm(`Send "${selectedSlug}" to ${subscribers.length} subscriber(s)?`);
    if (!confirmed) return;
    setSending(true);
    setSendFailures([]);
    setSendStatus(testEmail ? 'Sending test...' : 'Sending...');
    try {
      const res = await fetch('/.netlify/functions/send', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(testEmail ? { slug: selectedSlug, testEmail } : { slug: selectedSlug }),
      });
      const data = await res.json();
      setSendStatus(data.message || data.error || 'Done');
      // Anything Resend refused. Delivery status (bounced, opened, complained)
      // lives in the Resend log — this only reports what never got accepted.
      setSendFailures(Array.isArray(data.failedEmails) ? data.failedEmails : []);
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
              <button className="dash-btn" onClick={exportCsv} disabled={subscribers.length === 0}>
                Export CSV
              </button>
              <button className="dash-btn" onClick={() => fileInputRef.current?.click()}>
                Import CSV
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="text/csv,.csv"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) importCsv(file);
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
            <button
              className="dash-btn"
              onClick={reconcile}
              disabled={!selectedSlug || reconciling}
            >
              {reconciling ? 'Checking...' : 'Who got it?'}
            </button>
          </div>
          {sendStatus && <p className="dash-status">{sendStatus}</p>}
          {sendFailures.length > 0 && (
            <div className="dash-failures">
              <p className="dash-status">
                Not accepted by Resend ({sendFailures.length}) — these people did
                not receive the issue:
              </p>
              <ul className="dash-failure-list">
                {sendFailures.map((email) => (
                  <li key={email} className="dash-mono">{email}</li>
                ))}
              </ul>
            </div>
          )}
          {reconStatus && <p className="dash-status">{reconStatus}</p>}

          {recon && (
            <div
              className={
                recon.missing.length > 0 ? 'dash-recon dash-recon--bad' : 'dash-recon'
              }
            >
              <p className="dash-recon-head">
                {recon.receivedCount}/{recon.subscriberCount} subscribers received
                “{recon.subject}”
                {recon.missing.length === 0 && ' — everyone is covered.'}
              </p>

              {recon.missing.length > 0 && (
                <>
                  <p className="dash-status">
                    Never received it ({recon.missing.length}):
                  </p>
                  <ul className="dash-failure-list">
                    {recon.missing.map((m) => (
                      <li key={m.email}>
                        {m.name ? `${m.name} — ` : ''}
                        <span className="dash-mono">{m.email}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="dash-btn"
                    onClick={sendToMissing}
                    disabled={sending}
                    style={{ marginTop: '1.2rem' }}
                  >
                    {sending
                      ? 'Sending...'
                      : `Send to these ${recon.missing.length}`}
                  </button>
                </>
              )}

              {recon.bounced.length > 0 && (
                <p className="dash-status">
                  Accepted but not delivered:{' '}
                  {recon.bounced.map((b) => `${b.email} (${b.event})`).join(', ')}
                </p>
              )}

              {recon.notSubscribed.length > 0 && (
                <p className="dash-status dash-muted">
                  Sent to {recon.notSubscribed.length} address(es) no longer on the
                  list (unsubscribed since, or a test send).
                </p>
              )}

              {(!recon.logComplete || recon.logError) && (
                <p className="dash-status dash-muted">
                  Warning: the Resend log could not be read in full
                  {recon.logError ? ` (${recon.logError})` : ''}, so “missing” may
                  be overstated.
                </p>
              )}

              {recon.receivedCount === 0 && recon.logEarliest && (
                <p className="dash-status dash-muted">
                  Resend’s log only reaches back to{' '}
                  {new Date(recon.logEarliest).toLocaleDateString()}. If this issue
                  was sent before then, its records have aged out — that is not
                  proof it never went out.
                </p>
              )}
            </div>
          )}

          <p className="dash-status dash-muted">
            Per-recipient delivery status (delivered, bounced, opened) lives in the{' '}
            <a href="https://resend.com/emails" target="_blank" rel="noreferrer">
              Resend log
            </a>.
          </p>
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
