import { getTokenFromCookie, verifyToken, setTokenCookie, createToken } from '@/lib/auth';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body || {};
  const adminPassword = process.env.OWNER_PASSWORD || 'Fifa2026';

  if (username === 'Messi' && password === adminPassword) {
    const token = createToken();
    setTokenCookie(res, token);
    return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}
