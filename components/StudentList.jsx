import React from 'react';
export function StudentList({ students }){
  if(!students.length) return <div className="muted">No students found.</div>;
  return (
    <div className="student-list" aria-live="polite">
      {students.map(s=> (
        <div className="student" key={s.id}>
          <div className="avatar">{s.name.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase()}</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700}}>{s.name}</div>
            <div className="muted" style={{fontSize:13}}>{s.gender}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
