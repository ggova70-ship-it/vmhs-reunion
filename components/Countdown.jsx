import { useEffect, useState } from 'react';

export default function Countdown({ targetDate }) {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = Math.max(0, target - now);

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-2 md:gap-4 justify-center md:justify-start">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-3 md:p-4 text-center shadow-lg">
        <div className="text-2xl md:text-4xl font-bold">{time.days}</div>
        <div className="text-xs md:text-sm font-medium">Days</div>
      </div>
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-3 md:p-4 text-center shadow-lg">
        <div className="text-2xl md:text-4xl font-bold">{String(time.hours).padStart(2, '0')}</div>
        <div className="text-xs md:text-sm font-medium">Hours</div>
      </div>
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-3 md:p-4 text-center shadow-lg">
        <div className="text-2xl md:text-4xl font-bold">{String(time.mins).padStart(2, '0')}</div>
        <div className="text-xs md:text-sm font-medium">Mins</div>
      </div>
      <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-3 md:p-4 text-center shadow-lg">
        <div className="text-2xl md:text-4xl font-bold">{String(time.secs).padStart(2, '0')}</div>
        <div className="text-xs md:text-sm font-medium">Secs</div>
      </div>
    </div>
  );
}
