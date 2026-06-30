import '../styles/globals.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';

export default function App({ Component, pageProps }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const res = await fetch('/api/auth');
    setIsAdmin(res.ok);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Component {...pageProps} isAdmin={isAdmin} />
      </main>
      <footer className="bg-slate-800 text-white text-center py-4 text-sm">
        © VMHS Reunion 2006-2007 | Batch Reunion
      </footer>
    </div>
  );
}
