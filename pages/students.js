import { useState, useMemo } from 'react';
import { students } from '@/data/students';

export default function Students() {
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return students;
    return students.filter((s) => s.gender === filter);
  }, [filter]);

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-3xl font-bold mb-4">Batch 2006-2007 Students</h2>
        <div className="flex gap-2 flex-wrap">
          {['All', 'Male', 'Female'].map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-lg transition font-medium ${
                filter === option ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              {option} ({students.filter((s) => option === 'All' || s.gender === option).length})
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((student) => (
          <div key={student.id} className="card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-lg">
                {student.name.split(' ')[0][0]}
              </div>
              <div>
                <div className="font-bold text-lg">{student.name}</div>
                <div className="text-sm text-gray-600">{student.gender}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
