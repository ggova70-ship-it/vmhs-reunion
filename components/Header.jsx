import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Header({ isAdmin, setIsAdmin }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    if (username !== 'Messi' || password !== 'Fifa2026') {
      setError('Invalid credentials');
      return;
    }
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      setIsAdmin(true);
      setShowLoginModal(false);
      setUsername('');
      setPassword('');
    } else {
      setError('Login failed');
    }
  }

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' });
    setIsAdmin(false);
  }

  return (
    <>
      <header className="header">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">VMHS Reunion 2026-2027</h1>
            <p className="text-blue-100 text-xs md:text-sm">Batch 2006-2007 | GRT Event</p>
          </div>
          <nav className="flex gap-2 md:gap-4 items-center">
            <Link href="/" className="nav-link text-sm md:text-base">
              Home
            </Link>
            <Link href="/students" className="nav-link text-sm md:text-base">
              Students
            </Link>
            <Link href="/events" className="nav-link text-sm md:text-base">
              Events
            </Link>
            <Link href="/gallery" className="nav-link text-sm md:text-base">
              Gallery
            </Link>
            <div>
              {!isAdmin ? (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="btn-primary text-sm md:text-base"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-sm md:text-base"
                >
                  Logout
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
            {error && <div className="text-red-600 mb-4 text-sm">{error}</div>}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Messi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Fifa2026"
                />
              </div>
              <button type="submit" className="w-full btn-primary">
                Login
              </button>
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="w-full btn-secondary"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
