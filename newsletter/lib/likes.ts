/**
 * Like counter storage using Netlify Blobs.
 * Each newsletter issue has a simple integer count.
 */

import { getStore } from '@netlify/blobs';

const STORE_NAME = 'newsletter';

function store() {
  return getStore(STORE_NAME);
}

function likesKey(slug: string): string {
  return `likes:${slug}`;
}

export async function getLikes(slug: string): Promise<number> {
  const data = await store().get(likesKey(slug));
  if (!data) return 0;
  return parseInt(data, 10) || 0;
}

export async function addLike(slug: string): Promise<number> {
  const current = await getLikes(slug);
  const next = current + 1;
  await store().set(likesKey(slug), String(next));
  return next;
}
