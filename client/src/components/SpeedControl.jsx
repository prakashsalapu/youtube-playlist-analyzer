export default function SpeedControl({ speed, setSpeed }) {
  return (
    <div className="mt-4">
      <label className="text-white text-sm">
        Playback Speed: {speed}x
      </label>

      <input
        type="range"
        min="1"
        max="2"
        step="0.25"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}