/**
 * Subscriber storage using Netlify Blobs.
 *
 * The subscriber list is stored as a single JSON blob.
 * For a personal newsletter with hundreds of subscribers, this is fine.
 */

import { getStore } from '@netlify/blobs';

export interface Subscriber {
  email: string;
  subscribedAt: string;
}

const STORE_NAME = 'newsletter';
const SUBSCRIBERS_KEY = 'subscribers';

function store() {
  return getStore(STORE_NAME);
}

export async function getSubscribers(): Promise<Subscriber[]> {
  const data = await store().get(SUBSCRIBERS_KEY);
  if (!data) return [];
  return JSON.parse(data) as Subscriber[];
}

export async function addSubscriber(email: string): Promise<boolean> {
  const subs = await getSubscribers();
  const normalized = email.toLowerCase().trim();
  if (subs.some((s) => s.email === normalized)) return false;
  subs.push({ email: normalized, subscribedAt: new Date().toISOString() });
  await store().set(SUBSCRIBERS_KEY, JSON.stringify(subs));
  return true;
}

export async function removeSubscriber(email: string): Promise<boolean> {
  const subs = await getSubscribers();
  const normalized = email.toLowerCase().trim();
  const filtered = subs.filter((s) => s.email !== normalized);
  if (filtered.length === subs.length) return false;
  await store().set(SUBSCRIBERS_KEY, JSON.stringify(filtered));
  return true;
}

export async function getSubscriberCount(): Promise<number> {
  const subs = await getSubscribers();
  return subs.length;
}
