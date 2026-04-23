export default function SpeedControl({ speed, setSpeed }) {

  const percentage = ((speed - 1) / (2 - 1)) * 100;

  return (
    <div className="mt-4">

      <div className="flex justify-between text-sm mb-2 text-gray-300">
        <span>⚡ Playback Speed</span>
        <span className="bg-purple-600/20 px-2 py-1 rounded-md text-purple-300">
          {speed}x
        </span>
      </div>

      {/* slider */}
      <div className="relative h-2 bg-white/10 rounded-full">

        {/* progress */}
        <div
          className="absolute h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>

        <input
          type="range"
          min="1"
          max="2"
          step="0.25"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>

      {/* ticks */}
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>1x</span>
        <span>1.25x</span>
        <span>1.5x</span>
        <span>1.75x</span>
        <span>2x</span>
      </div>

    </div>
  );
}