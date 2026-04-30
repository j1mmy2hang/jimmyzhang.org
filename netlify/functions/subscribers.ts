/**
 * /api/subscribers — admin endpoint. Requires x-admin-key header.
 *
 * GET    → list all subscribers
 * POST   → add a subscriber { email, name?, ip? }
 * PATCH  → edit a subscriber { email, newEmail?, name?, ip? }
 * DELETE → remove a subscriber { email }
 * PUT    → replace the entire subscriber list { subscribers: Subscriber[] }
 */

import type { Context } from '@netlify/functions';
import {
  getSubscribers,
  addSubscriber,
  removeSubscriber,
  updateSubscriber,
  replaceAllSubscribers,
} from './lib/subscribers';

export default async function handler(req: Request, _context: Context) {
  const adminKey = process.env.ADMIN_KEY || '';
  const providedKey = req.headers.get('x-admin-key') || '';
  if (!adminKey || providedKey !== adminKey) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (req.method === 'GET') {
    const subs = await getSubscribers();
    return Response.json({ subscribers: subs, count: subs.length });
  }

  if (req.method === 'POST') {
    const { email, name, ip } = await req.json();
    if (!email) return Response.json({ error: 'email required' }, { status: 400 });
    const added = await addSubscriber({ email, name, ip });
    return Response.json({ added, email });
  }

  if (req.method === 'PATCH') {
    const { email, newEmail, name, ip } = await req.json();
    if (!email) return Response.json({ error: 'email required' }, { status: 400 });
    const result = await updateSubscriber(email, { newEmail, name, ip });
    if (!result.ok) {
      return Response.json({ error: result.error }, { status: 400 });
    }
    return Response.json({ updated: true });
  }

  if (req.method === 'DELETE') {
    const { email } = await req.json();
    if (!email) return Response.json({ error: 'email required' }, { status: 400 });
    const removed = await removeSubscriber(email);
    return Response.json({ removed, email });
  }

  if (req.method === 'PUT') {
    const body = await req.json();
    const list = Array.isArray(body) ? body : body?.subscribers;
    if (!Array.isArray(list)) {
      return Response.json(
        { error: 'expected { subscribers: [...] } or array' },
        { status: 400 },
      );
    }
    const count = await replaceAllSubscribers(list);
    return Response.json({ replaced: true, count });
  }

  return new Response('Method not allowed', { status: 405 });
}
