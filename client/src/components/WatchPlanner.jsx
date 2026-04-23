import { useState } from "react";

export default function WatchPlanner({ totalSeconds }) {
  const [hours, setHours] = useState(2);

  const totalHours = Number(totalSeconds) / 3600;
  const days = hours ? (totalHours / hours).toFixed(1) : 0;

  return (
    <div className="mt-4 bg-white/20 p-3 rounded-xl">
      <label className="text-sm text-white">
        Hours per day
      </label>

      <input
        type="number"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        className="w-full p-2 mt-1 rounded-lg"
      />

      <p className="mt-2 font-bold text-white">
        📅 Finish in {days} days
      </p>
    </div>
  );
}