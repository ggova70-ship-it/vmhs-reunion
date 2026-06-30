import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Gallery(){
  const [images, setImages] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  useEffect(()=>{ fetchImages(); checkAuth(); },[]);

  async function fetchImages(){
    const res = await fetch('/api/images');
    const data = await res.json();
    setImages(data.resources || []);
  }
  async function checkAuth(){
    const res = await fetch('/api/auth');
    setIsOwner(res.status === 200);
  }

  async function login(){
    const pw = prompt('Enter owner password:');
    if(!pw) return;
    const res = await fetch('/api/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password:pw})});
    if(res.ok){ alert('Logged in as owner'); setIsOwner(true); } else alert('Login failed');
  }
  async function logout(){ await fetch('/api/logout'); setIsOwner(false); }

  async function onFiles(e){
    const files = Array.from(e.target.files||[]);
    for(const f of files){
      const dataUrl = await readFile(f);
      const res = await fetch('/api/images',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({dataUrl, name:f.name})});
      if(!res.ok) alert('Upload failed');
    }
    fetchImages();
  }
  function readFile(file){ return new Promise((res, rej)=>{ const fr=new FileReader(); fr.onload=()=>res(fr.result); fr.onerror=rej; fr.readAsDataURL(file); }); }
  async function del(id){ if(!confirm('Delete image?')) return; const res = await fetch('/api/images/'+encodeURIComponent(id),{method:'DELETE'}); if(res.ok) fetchImages(); else alert('Delete failed'); }

  return (
    <div>
      <header className="header">
        <div>
          <h1>VMHS Reunion — Batch 2006-2007</h1>
          <div className="sub">VMHS school, NG Palle, Madanapalle — Aug 9, 2026</div>
        </div>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/students">Students</Link>
          <Link href="/events">Events</Link>
          <Link href="/gallery">Gallery</Link>
        </nav>
      </header>

      <main className="container">
        <div className="card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
            <div>
              <h3 style={{margin:0}}>Gallery</h3>
              <div className="muted" style={{fontSize:13}}>Photos from the batch — owners can upload images</div>
            </div>

            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              {isOwner ? <span className="btn owner-badge">Owner</span> : null}
              {!isOwner && <button className="btn" onClick={login}>Owner login</button>}
              {isOwner && <button className="btn" onClick={logout}>Logout</button>}
            </div>
          </div>

          {isOwner && (
            <div style={{marginBottom:12,display:'flex',gap:8,alignItems:'center'}}>
              <label className="btn" style={{cursor:'pointer'}}>Upload image
                <input type="file" accept="image/*" multiple style={{display:'none'}} onChange={onFiles} />
              </label>
              <div className="muted">Allowed types: jpg, png. Images stored on Cloudinary.</div>
            </div>
          )}

          <div className="gallery-grid">
            {images.length === 0 ? <div className="muted">No images yet.</div> : images.slice().reverse().map(img=> (
              <div className="gallery-item" key={img.public_id}>
                <img src={img.secure_url} alt={img.public_id} />
                {isOwner && <button className="delete-btn" onClick={()=>del(img.public_id)}>Delete</button>}
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">© VMHS Reunion — Batch 2006-2007</footer>
    </div>
  )
}
