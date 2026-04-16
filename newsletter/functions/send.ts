/**
 * POST /api/send
 *
 * Protected endpoint to send a newsletter to all subscribers.
 * Requires ADMIN_KEY header for authorization.
 *
 * Body: { slug: "2026-04" }
 *
 * The function reads the markdown from content/newsletter/{slug}.md,
 * converts it to a styled HTML email, and sends to all subscribers via Resend.
 */

import type { Context } from '@netlify/functions';
import { getSubscribers } from '../lib/subscribers.ts';
import { buildEmailHtml } from '../lib/email-template.ts';
import { createToken } from '../lib/tokens.ts';

const SITE_URL = 'https://jimmyzhang.org';
const REPLY_EMAIL = 'jz9542063@gmail.com';

export default async function handler(req: Request, _context: Context) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Auth check
  const adminKey = Deno.env.get('ADMIN_KEY') || '';
  const providedKey = req.headers.get('x-admin-key') || '';
  if (!adminKey || providedKey !== adminKey) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resendKey = Deno.env.get('RESEND_API_KEY') || '';
  if (!resendKey) {
    return Response.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 });
  }

  const secret = Deno.env.get('NEWSLETTER_SECRET') || '';
  if (!secret) {
    return Response.json({ error: 'NEWSLETTER_SECRET not configured' }, { status: 500 });
  }

  try {
    const { slug } = await req.json();
    if (!slug || typeof slug !== 'string') {
      return Response.json({ error: 'slug is required' }, { status: 400 });
    }

    // Fetch the newsletter markdown from the deployed site
    const mdUrl = `${SITE_URL}/newsletter/${slug}.md`;
    const mdRes = await fetch(mdUrl);
    if (!mdRes.ok) {
      return Response.json({ error: `Newsletter not found: ${slug}` }, { status: 404 });
    }
    const markdown = await mdRes.text();

    const subscribers = await getSubscribers();
    if (subscribers.length === 0) {
      return Response.json({ error: 'No subscribers' }, { status: 400 });
    }

    const results = { sent: 0, failed: 0, errors: [] as string[] };

    for (const sub of subscribers) {
      const unsubscribeToken = await createToken(secret, {
        email: sub.email,
        action: 'unsubscribe',
      });
      const likeToken = await createToken(secret, {
        email: sub.email,
        action: 'like',
        slug,
      });

      const unsubscribeUrl = `${SITE_URL}/.netlify/functions/unsubscribe?token=${unsubscribeToken}`;
      const likeUrl = `${SITE_URL}/.netlify/functions/like?token=${likeToken}`;
      const webUrl = `${SITE_URL}/newsletter/${slug}`;

      const { html, subject } = buildEmailHtml({
        markdown,
        slug,
        likeUrl,
        unsubscribeUrl,
        replyTo: REPLY_EMAIL,
        webUrl,
      });

      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Jimmy Zhang <newsletter@jimmyzhang.org>',
            to: sub.email,
            subject,
            html,
            reply_to: REPLY_EMAIL,
            headers: {
              'List-Unsubscribe': `<${unsubscribeUrl}>`,
            },
          }),
        });

        if (res.ok) {
          results.sent++;
        } else {
          const err = await res.text();
          results.failed++;
          results.errors.push(`${sub.email}: ${err}`);
        }
      } catch (e) {
        results.failed++;
        results.errors.push(`${sub.email}: ${String(e)}`);
      }
    }

    return Response.json({
      message: `Sent to ${results.sent}/${subscribers.length} subscribers`,
      ...results,
    });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
