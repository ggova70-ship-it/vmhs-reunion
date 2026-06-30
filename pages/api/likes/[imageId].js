import { readJSON, writeJSON } from '@/lib/storage';

export default function handler(req, res) {
  const { imageId } = req.query;

  if (req.method === 'POST') {
    const likes = readJSON('likes.json', {});
    likes[imageId] = (likes[imageId] || 0) + 1;
    writeJSON('likes.json', likes);
    return res.status(200).json({ likes: likes[imageId] });
  }

  res.setHeader('Allow', 'POST');
  res.status(405).end();
}
