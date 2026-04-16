import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import '../styles/subscribe.css';

interface Props {
  variant?: 'home' | 'page';
}

export default function SubscribeForm({ variant = 'page' }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    try {
      const res = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          setStatus('error');
          setMessage(data.error || `Error ${res.status}`);
        } catch {
          setStatus('error');
          setMessage(`Error ${res.status}: ${text.slice(0, 100)}`);
        }
        return;
      }
      const data = await res.json();
      setStatus('success');
      setMessage(data.message || 'Subscribed!');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(`Could not connect: ${err}`);
    }
  }

  const isHome = variant === 'home';

  return (
    <div className={`subscribe ${isHome ? 'subscribe--home' : 'subscribe--page'}`}>
      {status === 'success' ? (
        <p className="subscribe-message">{message}</p>
      ) : (
        <>
          <p className="subscribe-label">
            Subscribe to my <Link to="/newsletter" className="subscribe-link">monthly newsletter</Link>
          </p>
          <form className="subscribe-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="subscribe-input"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              className="subscribe-button"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? '...' : 'Subscribe'}
            </button>
          </form>
          {status === 'error' && (
            <p className="subscribe-error">{message}</p>
          )}
        </>
      )}
    </div>
  );
}
