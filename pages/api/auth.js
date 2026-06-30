import { getTokenFromCookie, verifyToken } from '@/lib/auth';

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const token = getTokenFromCookie(req);
  if (!token || !verifyToken(token)) return res.status(401).end();
  return res.status(200).json({ ok: true });
}
