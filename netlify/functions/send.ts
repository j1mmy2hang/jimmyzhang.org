/**
 * POST /api/send
 *
 * Protected endpoint to send a newsletter to all subscribers.
 * Requires x-admin-key header for authorization.
 *
 * Body: { slug: "2026-03" }
 *
 * Sends via Resend's batch endpoint (up to 100 messages per request). Sending
 * one request per subscriber silently lost ~1 in 11 recipients to Resend's
 * 10 req/s rate limit — see the August 2026 issue, where 10 of 71 never
 * arrived. Batching keeps the whole send to a single request for a list this
 * size, so there is no rate limit to trip and no loop to time out.
 */

import type { Context } from '@netlify/functions';
import { getSubscribers } from './lib/subscribers';
import { buildEmailHtml } from './lib/email-template';
import { createToken } from './lib/tokens';

const SITE_URL = 'https://jimmyzhang.org';
const BATCH_ENDPOINT = 'https://api.resend.com/emails/batch';
const BATCH_SIZE = 100;
const MAX_ATTEMPTS = 4;

interface BatchMessage {
  from: string;
  to: string[];
  subject: string;
  html: string;
  reply_to: string;
  headers: Record<string, string>;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * POST one batch, retrying on 429 and 5xx. Resend reports its window in
 * `ratelimit-reset` (seconds); fall back to exponential backoff.
 */
async function postBatch(
  resendKey: string,
  messages: BatchMessage[],
): Promise<{ ok: true; accepted: number } | { ok: false; error: string }> {
  let lastError = 'unknown error';

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(BATCH_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messages),
      });

      if (res.ok) {
        const body = await res.json().catch(() => ({}));
        const accepted = Array.isArray(body?.data) ? body.data.length : messages.length;
        return { ok: true, accepted };
      }

      lastError = `${res.status} ${await res.text()}`;

      const retryable = res.status === 429 || res.status >= 500;
      if (!retryable || attempt === MAX_ATTEMPTS) break;

      const resetHeader =
        res.headers.get('ratelimit-reset') || res.headers.get('retry-after');
      const waitMs = resetHeader
        ? Math.max(1, Number(resetHeader)) * 1000
        : 2 ** attempt * 500;
      await sleep(waitMs);
    } catch (e) {
      lastError = String(e);
      if (attempt === MAX_ATTEMPTS) break;
      await sleep(2 ** attempt * 500);
    }
  }

  return { ok: false, error: lastError };
}

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
    const { slug, testEmail, only } = await req.json();
    if (!slug || typeof slug !== 'string') {
      return Response.json({ error: 'slug is required' }, { status: 400 });
    }

    const mdUrl = `${SITE_URL}/newsletter/${slug}.md`;
    const mdRes = await fetch(mdUrl);
    if (!mdRes.ok) {
      return Response.json({ error: `Newsletter not found: ${slug}` }, { status: 404 });
    }
    const markdown = await mdRes.text();

    let subscribers: { email: string; subscribedAt: string }[];
    if (testEmail && typeof testEmail === 'string') {
      subscribers = [{ email: testEmail, subscribedAt: new Date().toISOString() }];
    } else {
      subscribers = await getSubscribers();
      // `only` re-sends to a subset (the reconcile diff). Intersect it with the
      // real list so this can never be used to mail an arbitrary address.
      if (Array.isArray(only) && only.length > 0) {
        const wanted = new Set(
          only.map((e: unknown) => String(e).toLowerCase().trim()),
        );
        subscribers = subscribers.filter((s) => wanted.has(s.email));
        if (subscribers.length === 0) {
          return Response.json(
            { error: 'None of those addresses are current subscribers' },
            { status: 400 },
          );
        }
      }
    }
    if (subscribers.length === 0) {
      return Response.json({ error: 'No subscribers' }, { status: 400 });
    }

    const webUrl = `${SITE_URL}/newsletter/${slug}`;
    let subject = '';

    const messages: BatchMessage[] = await Promise.all(
      subscribers.map(async (sub) => {
        const unsubscribeToken = await createToken(secret, {
          email: sub.email,
          action: 'unsubscribe',
        });
        const unsubscribeUrl = `${SITE_URL}/.netlify/functions/unsubscribe?token=${unsubscribeToken}`;
        const built = buildEmailHtml({ markdown, slug, unsubscribeUrl, webUrl });
        subject = built.subject;
        return {
          from: 'Jimmy Zhang <newsletter@jimmyzhang.org>',
          to: [sub.email],
          subject: built.subject,
          html: built.html,
          reply_to: 'contact@jimmyzhang.org',
          headers: { 'List-Unsubscribe': `<${unsubscribeUrl}>` },
        };
      }),
    );

    const results = { sent: 0, failed: 0, failedEmails: [] as string[], errors: [] as string[] };

    for (let i = 0; i < messages.length; i += BATCH_SIZE) {
      const chunk = messages.slice(i, i + BATCH_SIZE);
      const outcome = await postBatch(resendKey, chunk);

      if (outcome.ok) {
        results.sent += outcome.accepted;
        // A partial accept would mean Resend took fewer than we handed it.
        if (outcome.accepted < chunk.length) {
          const shortfall = chunk.length - outcome.accepted;
          results.failed += shortfall;
          results.errors.push(
            `batch at offset ${i}: Resend accepted ${outcome.accepted}/${chunk.length}`,
          );
        }
      } else {
        results.failed += chunk.length;
        results.failedEmails.push(...chunk.flatMap((m) => m.to));
        results.errors.push(`batch at offset ${i}: ${outcome.error}`);
      }

      // Stay clear of the 10 req/s ceiling when a list needs many batches.
      if (i + BATCH_SIZE < messages.length) await sleep(200);
    }

    const label = testEmail
      ? `test email to ${testEmail}`
      : Array.isArray(only) && only.length > 0
        ? `${subscribers.length} missing subscribers`
        : `${subscribers.length} subscribers`;
    const message =
      results.failed > 0
        ? `Sent to ${results.sent}/${subscribers.length} (${label}) — ${results.failed} FAILED`
        : `Sent to ${results.sent}/${subscribers.length} (${label})`;

    return Response.json({ message, subject, ...results });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
