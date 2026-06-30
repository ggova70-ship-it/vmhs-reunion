import React, { useEffect, useState } from 'react';
export default function Countdown({ targetDate }){
  const [now, setNow] = useState(Date.now());
  useEffect(()=>{ const t = setInterval(()=>setNow(Date.now()),1000); return ()=>clearInterval(t); },[]);
  const diff = Math.max(0, new Date(targetDate) - now);
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor(diff / (1000*60*60) % 24);
  const mins = Math.floor(diff / (1000*60) % 60);
  const secs = Math.floor(diff / 1000 % 60);
  return (
    <div className="countdown" aria-live="polite">
      <div className="unit"><span>{days}</span> d</div>
      <div className="unit"><span>{String(hours).padStart(2,'0')}</span> h</div>
      <div className="unit"><span>{String(mins).padStart(2,'0')}</span> m</div>
      <div className="unit"><span>{String(secs).padStart(2,'0')}</span> s</div>
    </div>
  );
}
