import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const SECRET = process.env.OWNER_PASSWORD || 'Fifa2026';

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    return null;
  }
}

export function createToken() {
  return jwt.sign({ admin: true }, SECRET, { expiresIn: '24h' });
}

export function getTokenFromCookie(req) {
  const cookies = req.headers.cookie || '';
  const token = cookies
    .split(';')
    .find((c) => c.trim().startsWith('vmhs_token='))
    ?.split('=')[1];
  return token ? decodeURIComponent(token) : null;
}

export function setTokenCookie(res, token) {
  const cookie = serialize('vmhs_token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 24 * 60 * 60,
    sameSite: 'lax',
  });
  res.setHeader('Set-Cookie', cookie);
}

export function clearTokenCookie(res) {
  const cookie = serialize('vmhs_token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
  });
  res.setHeader('Set-Cookie', cookie);
}
