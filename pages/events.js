import { useEffect, useState } from 'react';

export default function Events({ isAdmin }) {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', date: '', time: '', location: '', details: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const res = await fetch('/api/events');
    const data = await res.json();
    setEvents(data.events || []);
  }

  async function handleSave() {
    if (!formData.title || !formData.date) {
      alert('Please fill in title and date');
      return;
    }

    if (editingId) {
      const res = await fetch(`/api/events/${editingId}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchEvents();
        setEditingId(null);
        setFormData({ title: '', description: '', date: '', time: '', location: '', details: '' });
        setShowForm(false);
      }
    } else {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchEvents();
        setFormData({ title: '', description: '', date: '', time: '', location: '', details: '' });
        setShowForm(false);
      }
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this event?')) return;
    const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
    if (res.ok) fetchEvents();
  }

  return (
    <div className="space-y-6">
      <div className="card flex justify-between items-center">
        <h2 className="text-3xl font-bold">Events</h2>
        {isAdmin && (
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? 'Cancel' : 'Add Event'}
          </button>
        )}
      </div>

      {showForm && isAdmin && (
        <div className="card bg-blue-50">
          <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Event' : 'New Event'}</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Event Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Additional Details"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={handleSave} className="w-full btn-primary">
              {editingId ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="card">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <div className="space-y-1 text-gray-700">
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()} at {event.time || '09:00'}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  {event.description && <p><strong>Description:</strong> {event.description}</p>}
                  {event.details && <p><strong>Details:</strong> {event.details}</p>}
                </div>
              </div>
              {isAdmin && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setFormData(event);
                      setEditingId(event.id);
                      setShowForm(true);
                    }}
                    className="btn-secondary text-sm"
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(event.id)} className="btn-danger text-sm">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
