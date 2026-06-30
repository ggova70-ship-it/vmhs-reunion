import { readJSON, writeJSON } from '@/lib/storage';
import { getTokenFromCookie, verifyToken } from '@/lib/auth';

function isAdmin(req) {
  const token = getTokenFromCookie(req);
  return token && verifyToken(token);
}

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

    const { title, description, date, time, location, details } = req.body || {};
    const events = readJSON('events.json', []);
    const idx = events.findIndex((e) => e.id === parseInt(id));

    if (idx === -1) return res.status(404).json({ error: 'Event not found' });

    events[idx] = { ...events[idx], title, description, date, time, location, details };
    writeJSON('events.json', events);
    return res.status(200).json(events[idx]);
  }

  if (req.method === 'DELETE') {
    if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

    const events = readJSON('events.json', []);
    const filtered = events.filter((e) => e.id !== parseInt(id));
    writeJSON('events.json', filtered);
    return res.status(200).json({ ok: true });
  }

  res.setHeader('Allow', 'PUT,DELETE');
  res.status(405).end();
}
