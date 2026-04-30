/**
 * Simple per-IP sliding-window rate limiter using Netlify Blobs.
 *
 * Counts are best-effort (concurrent requests from the same IP can lose
 * a single increment), which is fine for the purpose of preventing
 * subscribe-form flooding.
 */

import { getStore } from '@netlify/blobs';

const STORE_NAME = 'rate-limit';

interface Entry {
  count: number;
  windowStart: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export async function checkRateLimit(
  ip: string,
  options: { limit: number; windowSeconds: number; bucket: string },
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowMs = options.windowSeconds * 1000;
  const store = getStore(STORE_NAME);
  const key = `${options.bucket}/${ip}`;

  let entry: Entry | null = null;
  try {
    entry = (await store.get(key, { type: 'json' })) as Entry | null;
  } catch {
    entry = null;
  }

  if (!entry || now - entry.windowStart > windowMs) {
    entry = { count: 1, windowStart: now };
  } else {
    entry.count += 1;
  }

  const allowed = entry.count <= options.limit;
  const retryAfterSeconds = allowed
    ? 0
    : Math.max(1, Math.ceil((entry.windowStart + windowMs - now) / 1000));

  try {
    await store.setJSON(key, entry);
  } catch {
    // If the write fails, fall through — rate limiting is best-effort.
  }

  return {
    allowed,
    remaining: Math.max(0, options.limit - entry.count),
    retryAfterSeconds,
  };
}

export function getClientIp(req: Request): string {
  const headers = req.headers;
  const nf = headers.get('x-nf-client-connection-ip');
  if (nf) return nf.trim();
  const xf = headers.get('x-forwarded-for');
  if (xf) return xf.split(',')[0]!.trim();
  const real = headers.get('x-real-ip');
  if (real) return real.trim();
  return 'unknown';
}
