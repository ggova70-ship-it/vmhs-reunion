import React from 'react';
import Link from 'next/link';
import Countdown from '../components/Countdown';
import studentsData from '../data/students';

const EVENT_DATE = '2026-08-09T09:00:00';

export default function Home(){
  const total = studentsData.length;
  const boys = studentsData.filter(s=>s.gender.toLowerCase().startsWith('m')).length;
  const girls = studentsData.filter(s=>s.gender.toLowerCase().startsWith('f')).length;
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
        <div className="layout-2col">
          <div>
            <div className="card">
              <h3>Overview</h3>
              <div className="kpi-row">
                <div className="kpi"><div className="value">{total}</div><div className="label">Total students</div></div>
                <div className="kpi"><div className="value">{boys}</div><div className="label">Boys</div></div>
                <div className="kpi"><div className="value">{girls}</div><div className="label">Girls</div></div>
              </div>
            </div>

            <div className="card" style={{marginTop:12}}>
              <h3>Next Reunion — Countdown</h3>
              <div>
                <div className="muted">VMHS Reunion — Aug 9, 2026</div>
                <div className="muted">Place: VMHS school, NG Palle, Madanapalle</div>
                <Countdown targetDate={EVENT_DATE} />
              </div>
            </div>
          </div>

          <aside>
            <div className="card">
              <h4>Quick Links</h4>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                <a className="btn" href="/students">Open Students</a>
                <a className="btn" href="/events">Open Events</a>
                <a className="btn" href="/gallery">Open Gallery</a>
              </div>
            </div>

            <div className="card" style={{marginTop:12}}>
              <h4>Event Summary</h4>
              <div className="muted">Date: Aug 9, 2026</div>
              <div className="muted">Venue: VMHS school, NG Palle, Madanapalle</div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="footer">© VMHS Reunion — Batch 2006-2007</footer>
    </div>
  )
}
