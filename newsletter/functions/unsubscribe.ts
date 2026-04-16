import type { Context } from '@netlify/functions';
import { removeSubscriber } from '../lib/subscribers.ts';
import { verifyToken } from '../lib/tokens.ts';

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

  await removeSubscriber(payload.email);

  return new Response(unsubscribePage(payload.email, true), {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });
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
