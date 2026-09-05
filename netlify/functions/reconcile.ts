/**
 * POST /api/reconcile
 *
 * Answers "who did NOT receive this issue?" by diffing the subscriber list
 * against Resend's delivery log. Requires x-admin-key header.
 *
 * Body: { slug: "2026-08" }
 *
 * This exists because a rate-limited send leaves *no trace* in Resend — the
 * request is rejected before an email record is created. Resend's dashboard
 * can only show what it accepted, so it structurally cannot show you who is
 * missing. That diff is this endpoint's whole job.
 */

import type { Context } from '@netlify/functions';
import { getSubscribers } from './lib/subscribers';
import { parseFrontmatter } from './lib/markdown';

const SITE_URL = 'https://jimmyzhang.org';
const LIST_ENDPOINT = 'https://api.resend.com/emails';
const PAGE_SIZE = 100;
const MAX_PAGES = 20;

interface LogEntry {
  id: string;
  to: string[];
  subject: string;
  created_at: string;
  last_event: string;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Walk the Resend log newest-first. Returns every entry we could reach plus
 * whether we stopped early, so the caller can distinguish "nobody is missing"
 * from "the log does not reach back that far".
 */
async function fetchLog(
  resendKey: string,
): Promise<{ entries: LogEntry[]; exhausted: boolean; error?: string }> {
  const entries: LogEntry[] = [];
  let after: string | null = null;

  for (let page = 0; page < MAX_PAGES; page++) {
    const url = new URL(LIST_ENDPOINT);
    url.searchParams.set('limit', String(PAGE_SIZE));
    if (after) url.searchParams.set('after', after);

    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${resendKey}` },
    });
    if (!res.ok) {
      return { entries, exhausted: false, error: `${res.status} ${await res.text()}` };
    }

    const body = await res.json();
    const data: LogEntry[] = Array.isArray(body?.data) ? body.data : [];
    entries.push(...data);

    if (!body?.has_more || data.length === 0) {
      return { entries, exhausted: true };
    }
    after = data[data.length - 1]!.id;
    await sleep(150); // stay well under the 10 req/s ceiling
  }

  return { entries, exhausted: false };
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

  try {
    const { slug } = await req.json();
    if (!slug || typeof slug !== 'string') {
      return Response.json({ error: 'slug is required' }, { status: 400 });
    }

    const mdRes = await fetch(`${SITE_URL}/newsletter/${slug}.md`);
    if (!mdRes.ok) {
      return Response.json({ error: `Newsletter not found: ${slug}` }, { status: 404 });
    }
    const { frontmatter } = parseFrontmatter(await mdRes.text());
    const subject = frontmatter.title || 'Newsletter';

    const [subscribers, log] = await Promise.all([
      getSubscribers(),
      fetchLog(resendKey),
    ]);
    if (log.error && log.entries.length === 0) {
      return Response.json({ error: `Resend log unavailable: ${log.error}` }, { status: 502 });
    }

    const issueEntries = log.entries.filter((e) => e.subject === subject);
    const recipients = new Map<string, string>(); // email -> last_event
    for (const entry of issueEntries) {
      for (const addr of entry.to || []) {
        recipients.set(addr.toLowerCase().trim(), entry.last_event);
      }
    }

    const missing = subscribers
      .filter((s) => !recipients.has(s.email))
      .map((s) => ({ email: s.email, name: s.name || null }));

    const subscriberEmails = new Set(subscribers.map((s) => s.email));
    const notSubscribed = [...recipients.keys()].filter((e) => !subscriberEmails.has(e));

    // Delivery problems among those Resend *did* accept.
    const bounced = [...recipients.entries()]
      .filter(([, event]) => event === 'bounced' || event === 'complained')
      .map(([email, event]) => ({ email, event }));

    const timestamps = log.entries.map((e) => e.created_at).sort();

    return Response.json({
      slug,
      subject,
      subscriberCount: subscribers.length,
      receivedCount: recipients.size,
      missing,
      notSubscribed,
      bounced,
      // A slug that predates the retained log looks identical to a total send
      // failure, so hand the UI enough to tell the difference.
      logEarliest: timestamps[0] || null,
      logComplete: log.exhausted,
      logError: log.error || null,
    });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
