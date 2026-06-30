import Countdown from '@/components/Countdown';

const GRT_DATE = '2026-08-09T21:00:00';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-2xl md:text-4xl font-bold mb-2">Welcome to VMHS Reunion 2026-2027</h2>
        <p className="text-gray-600 mb-4">Batch 2006-2007 | GRT Event</p>
        <p className="text-gray-700 mb-6">Join us for the Grand Reunion & Get Together at VMHS school, NG Palle, Madanapalle</p>
        <Countdown targetDate={GRT_DATE} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">2006-07</div>
          <div className="text-gray-600">Batch Year</div>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">Aug 9</div>
          <div className="text-gray-600">Event Date</div>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold text-orange-600 mb-2">9 PM</div>
          <div className="text-gray-600">Event Time</div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold mb-4">Event Details</h3>
        <div className="space-y-2 text-gray-700">
          <p><strong>Event:</strong> Grand Reunion & Get Together (GRT)</p>
          <p><strong>Location:</strong> VMHS school, NG Palle, Madanapalle</p>
          <p><strong>Date:</strong> August 9, 2026</p>
          <p><strong>Time:</strong> 9:00 PM onwards</p>
          <p><strong>School:</strong> Vivekananda Municipal High School</p>
        </div>
      </div>
    </div>
  );
}
