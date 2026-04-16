/**
 * GET/POST/DELETE /api/subscribers
 *
 * Admin endpoint to manage subscribers. Requires x-admin-key header.
 *
 * GET    → list all subscribers
 * POST   → add a subscriber { email }
 * DELETE → remove a subscriber { email }
 */

import type { Context } from '@netlify/functions';
import { getSubscribers, addSubscriber, removeSubscriber } from './lib/subscribers';

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
    const { email } = await req.json();
    if (!email) return Response.json({ error: 'email required' }, { status: 400 });
    const added = await addSubscriber(email);
    return Response.json({ added, email });
  }

  if (req.method === 'DELETE') {
    const { email } = await req.json();
    if (!email) return Response.json({ error: 'email required' }, { status: 400 });
    const removed = await removeSubscriber(email);
    return Response.json({ removed, email });
  }

  return new Response('Method not allowed', { status: 405 });
}
