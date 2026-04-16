import type { Context } from '@netlify/functions';
import { addLike, getLikes } from '../lib/likes.ts';
import { verifyToken } from '../lib/tokens.ts';

export default async function handler(req: Request, _context: Context) {
  const url = new URL(req.url);

  // GET: return like count, or process like from email link (with token)
  if (req.method === 'GET') {
    const token = url.searchParams.get('token');

    if (token) {
      // From email link — clicking "Like" in the email
      const secret = Deno.env.get('NEWSLETTER_SECRET') || '';
      const payload = await verifyToken(secret, token);
      if (!payload || payload.action !== 'like' || !payload.slug) {
        return new Response(likePage(null, false), {
          status: 400,
          headers: { 'Content-Type': 'text/html' },
        });
      }
      const count = await addLike(payload.slug);
      return new Response(likePage(count, true), {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    // No token — just return the count for a slug
    const slug = url.searchParams.get('slug');
    if (!slug) {
      return Response.json({ error: 'slug is required' }, { status: 400 });
    }
    const count = await getLikes(slug);
    return Response.json({ slug, likes: count });
  }

  // POST: add a like from the website
  if (req.method === 'POST') {
    try {
      const { slug } = await req.json();
      if (!slug) {
        return Response.json({ error: 'slug is required' }, { status: 400 });
      }
      const count = await addLike(slug);
      return Response.json({ slug, likes: count });
    } catch {
      return Response.json({ error: 'Invalid request' }, { status: 400 });
    }
  }

  return new Response('Method not allowed', { status: 405 });
}

function likePage(count: number | null, success: boolean): string {
  const message = success
    ? `<p>Thanks for the love! This issue now has ${count} like${count === 1 ? '' : 's'}.</p>`
    : `<p>Invalid or expired link.</p>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Liked — Jimmy Zhang</title>
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
  <h1>${success ? '♥' : 'Error'}</h1>
  ${message}
  <p><a href="https://jimmyzhang.org/newsletter">← Read more newsletters</a></p>
</body>
</html>`;
}
