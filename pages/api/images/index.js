import cloudinary from '../../../lib/cloudinary';
import jwt from 'jsonwebtoken';

function verify(req){
  const token = req.cookies && req.cookies.vmhs_token;
  if(!token) return null;
  try{ return jwt.verify(token, process.env.OWNER_PASSWORD); }catch(e){ return null; }
}

export default async function handler(req,res){
  if(req.method === 'GET'){
    try{
      const result = await cloudinary.api.resources({ type: 'upload', prefix: 'vmhs_reunion/', max_results: 200 });
      return res.status(200).json(result);
    }catch(err){ console.error(err); return res.status(500).json({ error: 'failed' }); }
  }

  if(req.method === 'POST'){
    // owner-only
    const v = verify(req);
    if(!v) return res.status(401).json({ error: 'unauthorized' });
    const { dataUrl, name } = req.body || {};
    if(!dataUrl) return res.status(400).json({ error: 'missing data' });
    try{
      const upload = await cloudinary.uploader.upload(dataUrl, { folder: 'vmhs_reunion' });
      return res.status(200).json(upload);
    }catch(err){ console.error(err); return res.status(500).json({ error: 'upload failed' }); }
  }

  res.setHeader('Allow', 'GET,POST');
  res.status(405).end();
}
