import cloudinary from '../../../../lib/cloudinary';
import jwt from 'jsonwebtoken';

function verify(req){
  const token = req.cookies && req.cookies.vmhs_token;
  if(!token) return null;
  try{ return jwt.verify(token, process.env.OWNER_PASSWORD); }catch(e){ return null; }
}

export default async function handler(req,res){
  const { id } = req.query;
  if(req.method === 'DELETE'){
    const v = verify(req);
    if(!v) return res.status(401).json({ error: 'unauthorized' });
    try{
      const result = await cloudinary.uploader.destroy(id);
      return res.status(200).json(result);
    }catch(err){ console.error(err); return res.status(500).json({ error: 'delete failed' }); }
  }
  res.setHeader('Allow','DELETE');
  res.status(405).end();
}
