/**
 * POST /api/send
 *
 * Protected endpoint to send a newsletter to all subscribers.
 * Requires x-admin-key header for authorization.
 *
 * Body: { slug: "2026-03" }
 */

import type { Context } from '@netlify/functions';
import { getSubscribers } from '../lib/subscribers.ts';
import { buildEmailHtml } from '../lib/email-template.ts';
import { createToken } from '../lib/tokens.ts';

const SITE_URL = 'https://jimmyzhang.org';

export default async function handler(req: Request, _context: Context) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const adminKey = process.env.ADMIN_KEY || '';
  const providedKey = req.headers.get('x-admin-key') || '';
  if (!adminKey || providedKey !== adminKey) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resendKey = process.env.RESEND_API_KEY || '';
  if (!resendKey) {
    return Response.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 });
  }

  const secret = process.env.NEWSLETTER_SECRET || '';
  if (!secret) {
    return Response.json({ error: 'NEWSLETTER_SECRET not configured' }, { status: 500 });
  }

  try {
    const { slug } = await req.json();
    if (!slug || typeof slug !== 'string') {
      return Response.json({ error: 'slug is required' }, { status: 400 });
    }

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

      const unsubscribeUrl = `${SITE_URL}/.netlify/functions/unsubscribe?token=${unsubscribeToken}`;
      const webUrl = `${SITE_URL}/newsletter/${slug}`;

      const { html, subject } = buildEmailHtml({
        markdown,
        slug,
        unsubscribeUrl,
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
