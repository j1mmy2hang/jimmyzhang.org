/**
 * Subscriber storage using Netlify Blobs.
 *
 * Each subscriber is stored under its own key (`sub/<email>`) so that
 * concurrent writes for different emails do not collide. Legacy storage
 * (a single JSON blob at key `subscribers`) is migrated lazily on read.
 */

import { getStore } from '@netlify/blobs';

export interface Subscriber {
  email: string;
  name?: string;
  ip?: string;
  subscribedAt: string;
}

const STORE_NAME = 'newsletter';
const PREFIX = 'sub/';
const LEGACY_KEY = 'subscribers';

function store() {
  return getStore(STORE_NAME);
}

function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

function key(email: string): string {
  return PREFIX + normalizeEmail(email);
}

let migrated = false;
async function migrateIfNeeded() {
  if (migrated) return;
  migrated = true;
  const s = store();
  const legacy = await s.get(LEGACY_KEY);
  if (!legacy) return;
  try {
    const old = JSON.parse(legacy) as Subscriber[];
    await Promise.all(
      old.map((sub) =>
        s.setJSON(key(sub.email), {
          email: normalizeEmail(sub.email),
          name: sub.name,
          ip: sub.ip,
          subscribedAt: sub.subscribedAt,
        }),
      ),
    );
    await s.delete(LEGACY_KEY);
  } catch {
    // Leave the legacy blob in place if migration fails
  }
}

export async function getSubscribers(): Promise<Subscriber[]> {
  await migrateIfNeeded();
  const s = store();
  const { blobs } = await s.list({ prefix: PREFIX });
  const subs = await Promise.all(
    blobs.map((b) => s.get(b.key, { type: 'json' }) as Promise<Subscriber | null>),
  );
  return subs
    .filter((x): x is Subscriber => !!x)
    .sort((a, b) => (a.subscribedAt < b.subscribedAt ? 1 : -1));
}

export async function getSubscriber(email: string): Promise<Subscriber | null> {
  await migrateIfNeeded();
  const s = store();
  return (await s.get(key(email), { type: 'json' })) as Subscriber | null;
}

export async function addSubscriber(input: {
  email: string;
  name?: string;
  ip?: string;
}): Promise<boolean> {
  await migrateIfNeeded();
  const s = store();
  const k = key(input.email);
  const existing = await s.get(k);
  if (existing) return false;
  const sub: Subscriber = {
    email: normalizeEmail(input.email),
    subscribedAt: new Date().toISOString(),
  };
  if (input.name && input.name.trim()) sub.name = input.name.trim();
  if (input.ip) sub.ip = input.ip;
  await s.setJSON(k, sub);
  return true;
}

export async function removeSubscriber(email: string): Promise<boolean> {
  await migrateIfNeeded();
  const s = store();
  const k = key(email);
  const existing = await s.get(k);
  if (!existing) return false;
  await s.delete(k);
  return true;
}

export async function updateSubscriber(
  email: string,
  patch: { newEmail?: string; name?: string | null; ip?: string | null },
): Promise<{ ok: boolean; error?: string }> {
  await migrateIfNeeded();
  const s = store();
  const current = (await s.get(key(email), { type: 'json' })) as Subscriber | null;
  if (!current) return { ok: false, error: 'not found' };

  const next: Subscriber = { ...current };
  if (patch.name !== undefined) {
    next.name = patch.name && patch.name.trim() ? patch.name.trim() : undefined;
  }
  if (patch.ip !== undefined) {
    next.ip = patch.ip || undefined;
  }

  if (patch.newEmail && normalizeEmail(patch.newEmail) !== current.email) {
    const newK = key(patch.newEmail);
    const collision = await s.get(newK);
    if (collision) return { ok: false, error: 'email already exists' };
    next.email = normalizeEmail(patch.newEmail);
    await s.setJSON(newK, next);
    await s.delete(key(email));
  } else {
    await s.setJSON(key(email), next);
  }
  return { ok: true };
}

export async function replaceAllSubscribers(list: Subscriber[]): Promise<number> {
  await migrateIfNeeded();
  const s = store();
  const { blobs } = await s.list({ prefix: PREFIX });
  await Promise.all(blobs.map((b) => s.delete(b.key)));
  const cleaned = list
    .filter((x) => x && typeof x.email === 'string' && x.email.trim())
    .map((x) => ({
      email: normalizeEmail(x.email),
      name: x.name && String(x.name).trim() ? String(x.name).trim() : undefined,
      ip: x.ip ? String(x.ip) : undefined,
      subscribedAt: x.subscribedAt || new Date().toISOString(),
    }));
  // Dedupe by email, keep first
  const seen = new Set<string>();
  const unique: Subscriber[] = [];
  for (const sub of cleaned) {
    if (seen.has(sub.email)) continue;
    seen.add(sub.email);
    unique.push(sub);
  }
  await Promise.all(unique.map((sub) => s.setJSON(key(sub.email), sub)));
  return unique.length;
}

export async function getSubscriberCount(): Promise<number> {
  const subs = await getSubscribers();
  return subs.length;
}
