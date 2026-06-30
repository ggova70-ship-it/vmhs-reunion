import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end();
  const { password } = req.body || {};
  const secret = process.env.OWNER_PASSWORD;
  if(!secret) return res.status(500).json({ error: 'Server not configured' });
  if(password !== secret) return res.status(401).json({ error: 'Unauthorized' });
  const token = jwt.sign({ owner: true }, secret, { expiresIn: '12h' });
  const cookie = serialize('vmhs_token', token, { httpOnly: true, path: '/', maxAge: 12*60*60 });
  res.setHeader('Set-Cookie', cookie);
  return res.status(200).json({ ok: true });
}
