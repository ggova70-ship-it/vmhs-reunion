import React from 'react';
import Countdown from '../components/Countdown';
import Link from 'next/link';

const EVENT_DATE = '2026-08-09T09:00:00';
export default function Events(){
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
          <h3>Events</h3>
          <div style={{marginTop:6}}>
            <div style={{fontWeight:700,fontSize:18}}>Grand Reunion & Get Together (GRT)</div>
            <div className="muted">VMHS school, NG Palle, Madanapalle</div>
            <div style={{marginTop:8}}>Event date: Aug 9, 2026</div>
            <Countdown targetDate={EVENT_DATE} />
          </div>

          <hr style={{margin:'14px 0',border:'none',borderTop:'1px dashed #e6e9ef'}} />
          <h4>Other items</h4>
          <ul className="muted">
            <li>Schedule & Agenda (to be added)</li>
            <li>RSVP list (requires backend)</li>
          </ul>
        </div>
      </main>

      <footer className="footer">© VMHS Reunion — Batch 2006-2007</footer>
    </div>
  )
}
