import type { Context } from '@netlify/functions';
import { removeSubscriber } from './lib/subscribers';
import { verifyToken } from './lib/tokens';

export default async function handler(req: Request, _context: Context) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return new Response(unsubscribePage('Missing token.', false), {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  const secret = process.env.NEWSLETTER_SECRET || '';
  const payload = await verifyToken(secret, token);

  if (!payload || payload.action !== 'unsubscribe') {
    return new Response(unsubscribePage('Invalid or expired link.', false), {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  const removed = await removeSubscriber(payload.email);

  if (removed) {
    const resendKey = process.env.RESEND_API_KEY || '';
    if (resendKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Newsletter <newsletter@jimmyzhang.org>',
            to: 'contact@jimmyzhang.org',
            subject: `Unsubscribe: ${payload.email}`,
            html: `<p><strong>${escapeHtml(payload.email)}</strong> just unsubscribed.</p>`,
          }),
        });
      } catch {}
    }
  }

  return new Response(unsubscribePage(payload.email, true), {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unsubscribePage(detail: string, success: boolean): string {
  const message = success
    ? `<p>${detail} has been unsubscribed.</p><p>Sorry to see you go.</p>`
    : `<p>${detail}</p>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Unsubscribe — Jimmy Zhang</title>
  <style>
    body {
      font-family: Georgia, 'Times New Roman', serif;
      max-width: 480px;
      margin: 80px auto;
      padding: 0 20px;
      color: #100F0F;
      background: #FFFCF0;
      line-height: 1.6;
    }
    h1 { font-size: 1.4em; font-weight: 400; }
    a { color: #205EA6; }
  </style>
</head>
<body>
  <h1>${success ? 'Unsubscribed' : 'Error'}</h1>
  ${message}
  <p><a href="https://jimmyzhang.org">← Back to jimmyzhang.org</a></p>
</body>
</html>`;
}
