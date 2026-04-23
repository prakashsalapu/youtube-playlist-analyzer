import { useState } from "react";

export default function WatchPlanner({ totalSeconds }) {

  const [hours, setHours] = useState(3.5);

  const totalHours = totalSeconds / 3600;
  const days = (totalHours / hours).toFixed(1);

  const progress = Math.min((hours / totalHours) * 100, 100);

  return (
    <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-300">📅 Daily Watch Plan</span>

        <span className="text-green-400 text-xs bg-green-500/10 px-2 py-1 rounded-md">
          You're on track!
        </span>
      </div>

      {/* Input */}
      <div className="flex items-center gap-3 mb-3">
        <input
          type="number"
          value={hours}
          step="0.5"
          onChange={(e) => setHours(Number(e.target.value))}
          className="w-20 p-2 bg-black/40 border border-white/10 rounded-md text-center outline-none appearance-none"
        />
        <span className="text-gray-400 text-sm">hours / day</span>
      </div>

      {/* Progress */}
      <div className="text-xs text-gray-400 mb-1">
        {hours}h / day
      </div>

      <div className="h-2 bg-white/10 rounded-full">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Result */}
      <div className="mt-4 text-center bg-purple-600/10 p-3 rounded-lg">
        <p className="text-gray-400 text-sm">Completion Time</p>
        <p className="text-xl font-bold text-purple-300">
          {days} days
        </p>
      </div>

    </div>
  );
}