import type { Context } from '@netlify/functions';
import { addSubscriber } from './lib/subscribers';
import { checkRateLimit, getClientIp } from './lib/rate-limit';

const NOTIFY_EMAIL = 'contact@jimmyzhang.org';

export default async function handler(req: Request, _context: Context) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const ip = getClientIp(req);

  // 5 attempts per IP per hour
  const rl = await checkRateLimit(ip, {
    limit: 5,
    windowSeconds: 60 * 60,
    bucket: 'subscribe',
  });
  if (!rl.allowed) {
    return Response.json(
      { error: 'Too many attempts. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rl.retryAfterSeconds) },
      },
    );
  }

  try {
    const body = await req.json();
    const email = typeof body?.email === 'string' ? body.email : '';
    const name = typeof body?.name === 'string' ? body.name : '';

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (email.length > 254 || name.length > 200) {
      return Response.json({ error: 'Input too long' }, { status: 400 });
    }

    const added = await addSubscriber({ email, name, ip });

    if (!added) {
      return Response.json({ message: 'Already subscribed' }, { status: 200 });
    }

    // Notify owner of new subscriber
    const resendKey = process.env.RESEND_API_KEY || '';
    if (resendKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Newsletter <newsletter@jimmyzhang.org>',
            to: NOTIFY_EMAIL,
            subject: `New subscriber: ${email}`,
            html: `<p><strong>${escapeHtml(email)}</strong> just subscribed.</p>
                   ${name ? `<p>Name: ${escapeHtml(name)}</p>` : ''}
                   <p>IP: ${escapeHtml(ip)}</p>`,
          }),
        });
      } catch {}
    }

    return Response.json({ message: 'Subscribed successfully' }, { status: 200 });
  } catch {
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
