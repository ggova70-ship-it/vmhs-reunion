import { readJSON, writeJSON } from '@/lib/storage';
import { getTokenFromCookie, verifyToken } from '@/lib/auth';

function isAdmin(req) {
  const token = getTokenFromCookie(req);
  return token && verifyToken(token);
}

const defaultEvents = [
  {
    id: 1,
    title: 'GRT - Grand Reunion & Get Together',
    description: 'Batch 2006-2007 Grand Reunion and Get Together event. Join us to celebrate old memories and create new ones.',
    date: '2026-08-09',
    time: '21:00',
    location: 'VMHS school, NG Palle, Madanapalle',
    details: 'Event starts at 9 PM onwards on the same day. Light refreshments will be provided.',
  },
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    const events = readJSON('events.json', defaultEvents);
    return res.status(200).json({ events });
  }

  if (req.method === 'POST') {
    if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

    const { title, description, date, time, location, details } = req.body || {};
    if (!title || !date) return res.status(400).json({ error: 'Missing required fields' });

    const events = readJSON('events.json', defaultEvents);
    const newEvent = {
      id: Math.max(...events.map((e) => e.id), 0) + 1,
      title,
      description,
      date,
      time: time || '09:00',
      location: location || 'VMHS school, NG Palle, Madanapalle',
      details: details || '',
    };
    events.push(newEvent);
    writeJSON('events.json', events);
    return res.status(200).json(newEvent);
  }

  res.setHeader('Allow', 'GET,POST');
  res.status(405).end();
}
