import { readJSON, writeJSON } from '@/lib/storage';

export default function handler(req, res) {
  const { imageId } = req.query;

  if (req.method === 'POST') {
    const { name, email, comment } = req.body || {};
    if (!name || !comment) return res.status(400).json({ error: 'Missing fields' });

    const comments = readJSON('comments.json', {});
    if (!comments[imageId]) comments[imageId] = [];

    comments[imageId].push({
      id: Date.now(),
      name,
      email: email || 'anonymous',
      comment,
      timestamp: new Date().toISOString(),
    });

    writeJSON('comments.json', comments);
    return res.status(200).json({ ok: true });
  }

  res.setHeader('Allow', 'POST');
  res.status(405).end();
}
