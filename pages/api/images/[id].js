import cloudinary from '@/lib/cloudinary';
import { getTokenFromCookie, verifyToken } from '@/lib/auth';

function isAdmin(req) {
  const token = getTokenFromCookie(req);
  return token && verifyToken(token);
}

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const result = await cloudinary.uploader.destroy(id);
      return res.status(200).json(result);
    } catch (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ error: 'Delete failed' });
    }
  }

  res.setHeader('Allow', 'DELETE');
  res.status(405).end();
}
