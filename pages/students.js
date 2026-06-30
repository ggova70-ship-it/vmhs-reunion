import React, { useMemo, useState } from 'react';
import studentsData from '../data/students';
import { StudentList } from '../components/StudentList';
import Link from 'next/link';

export default function Students(){
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const filtered = useMemo(()=>{
    let list = studentsData.slice();
    if(filter==='boys') list = list.filter(s=>s.gender.toLowerCase().startsWith('m'));
    if(filter==='girls') list = list.filter(s=>s.gender.toLowerCase().startsWith('f'));
    if(query) list = list.filter(s=>s.name.toLowerCase().includes(query.toLowerCase()));
    return list;
  },[filter,query]);

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
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <h3>Students</h3>
            <div className="muted">Batch 2006-2007</div>
          </div>

          <div className="controls" role="toolbar">
            <div>
              <button className={`btn ${filter==='all'?'active':''}`} onClick={()=>setFilter('all')}>All</button>
              <button className={`btn ${filter==='boys'?'active':''}`} onClick={()=>setFilter('boys')}>Boys</button>
              <button className={`btn ${filter==='girls'?'active':''}`} onClick={()=>setFilter('girls')}>Girls</button>
            </div>
            <div style={{marginLeft:'auto'}}>
              <label className="muted" style={{marginRight:8}}>Search</label>
              <input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by name..." />
            </div>
          </div>

          <StudentList students={filtered} />
        </div>
      </main>

      <footer className="footer">© VMHS Reunion — Batch 2006-2007</footer>
    </div>
  )
}
