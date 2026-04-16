/**
 * POST /api/preview
 *
 * Returns the rendered HTML email for a given newsletter slug.
 * Requires x-admin-key header.
 */

import type { Context } from '@netlify/functions';
import { buildEmailHtml } from '../lib/email-template.ts';

const SITE_URL = 'https://jimmyzhang.org';

export default async function handler(req: Request, _context: Context) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const adminKey = Deno.env.get('ADMIN_KEY') || '';
  const providedKey = req.headers.get('x-admin-key') || '';
  if (!adminKey || providedKey !== adminKey) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await req.json();
    if (!slug) return Response.json({ error: 'slug required' }, { status: 400 });

    const mdUrl = `${SITE_URL}/newsletter/${slug}.md`;
    const mdRes = await fetch(mdUrl);
    if (!mdRes.ok) {
      return Response.json({ error: `Newsletter not found: ${slug}` }, { status: 404 });
    }
    const markdown = await mdRes.text();

    const { html, subject } = buildEmailHtml({
      markdown,
      slug,
      likeUrl: '#',
      unsubscribeUrl: '#',
      replyTo: 'jz9542063@gmail.com',
      webUrl: `${SITE_URL}/newsletter/${slug}`,
    });

    return Response.json({ html, subject });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
