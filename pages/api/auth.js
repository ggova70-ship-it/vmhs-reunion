import jwt from 'jsonwebtoken';

export default function handler(req,res){
  if(req.method !== 'GET') return res.status(405).end();
  const token = req.cookies && req.cookies.vmhs_token;
  if(!token) return res.status(401).end();
  try{
    jwt.verify(token, process.env.OWNER_PASSWORD);
    return res.status(200).json({ ok: true });
  }catch(e){ return res.status(401).end(); }
}
