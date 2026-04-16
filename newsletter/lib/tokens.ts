/**
 * Simple HMAC-based tokens for unsubscribe and like links.
 * No database lookup needed — the token encodes the email/action
 * and can be verified with the secret.
 */

const encoder = new TextEncoder();

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Create a token encoding an action.
 * Payload is base64url({ email, action, ...extra }) + "." + hmac.
 */
export async function createToken(
  secret: string,
  payload: Record<string, string>,
): Promise<string> {
  const json = JSON.stringify(payload);
  const b64 = btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const sig = await hmac(secret, b64);
  return `${b64}.${sig}`;
}

/**
 * Verify and decode a token. Returns null if invalid.
 */
export async function verifyToken(
  secret: string,
  token: string,
): Promise<Record<string, string> | null> {
  const dot = token.lastIndexOf('.');
  if (dot === -1) return null;
  const b64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = await hmac(secret, b64);
  if (sig !== expected) return null;
  try {
    const padded = b64.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}
