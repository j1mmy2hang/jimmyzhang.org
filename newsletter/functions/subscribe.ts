import type { Context } from '@netlify/functions';
import { addSubscriber } from '../lib/subscribers.ts';

export default async function handler(req: Request, _context: Context) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const added = await addSubscriber(email);

    if (!added) {
      return Response.json({ message: 'Already subscribed' }, { status: 200 });
    }

    return Response.json({ message: 'Subscribed successfully' }, { status: 200 });
  } catch {
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
