import cloudinary from '@/lib/cloudinary';
import { getTokenFromCookie, verifyToken } from '@/lib/auth';
import { readJSON, writeJSON } from '@/lib/storage';

function isAdmin(req) {
  const token = getTokenFromCookie(req);
  return token && verifyToken(token);
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await cloudinary.api.resources({ type: 'upload', prefix: 'vmhs_gallery/', max_results: 500 });
      const resources = result.resources || [];
      const likeData = readJSON('likes.json', {});
      const commentData = readJSON('comments.json', {});
      const enriched = resources.map((r) => ({
        ...r,
        likes: likeData[r.public_id] || 0,
        comments: commentData[r.public_id] || [],
      }));
      return res.status(200).json({ resources: enriched });
    } catch (err) {
      console.error('Error fetching images:', err);
      return res.status(500).json({ error: 'Failed to fetch images' });
    }
  }

  if (req.method === 'POST') {
    if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

    const { dataUrl, name } = req.body || {};
    if (!dataUrl) return res.status(400).json({ error: 'Missing data' });

    try {
      const upload = await cloudinary.uploader.upload(dataUrl, { folder: 'vmhs_gallery' });
      return res.status(200).json(upload);
    } catch (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: 'Upload failed' });
    }
  }

  res.setHeader('Allow', 'GET,POST');
  res.status(405).end();
}
