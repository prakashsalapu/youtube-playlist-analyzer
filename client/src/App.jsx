import { useState } from "react";
import axios from "axios";
import StatsCard from "./components/StatsCard";
import SpeedControl from "./components/SpeedControl";
import WatchPlanner from "./components/WatchPlanner";

export default function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [speed, setSpeed] = useState(1);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchData = async () => {
    if (!url.trim()) return alert("Enter valid URL");

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/playlist`,
        { url }
      );

      setData(res.data);

    } catch (err) {
      alert("Error fetching playlist");
    } finally {
      setLoading(false);
    }
  };

 const totalSeconds = Number(data?.totalSeconds) || 0;

 const dynamicHours = totalSeconds
  ? (totalSeconds / 3600 / speed).toFixed(1)
  : 0;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

      <div className="w-full max-w-xl p-6 rounded-3xl backdrop-blur-xl bg-white/20 shadow-2xl">

        <h1 className="text-2xl text-white text-center font-bold mb-4">
          🎬 Playlist Analyzer
        </h1>

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste playlist URL..."
          className="w-full p-3 rounded-lg mb-3"
        />

        <button
          onClick={fetchData}
          className="w-full bg-purple-600 text-white py-3 rounded-lg"
        >
          {loading ? "Loading..." : "Analyze"}
        </button>

        {/* Speed */}
        {data && (
          <SpeedControl speed={speed} setSpeed={setSpeed} />
        )}

        {/* Results */}
        {data && (
          <>
            <img
              src={data.thumbnail}
              className="mt-4 rounded-xl"
            />

            <h2 className="text-white mt-2">{data.title}</h2>

            {/* Cards */}
            <div className="grid grid-cols-2 gap-3 mt-4">

              <StatsCard
                icon="📹"
                label="Videos"
                value={data.totalVideos}
              />

              <StatsCard
                icon="⏱"
                label="Total"
                value={data.totalDuration}
              />

              <StatsCard
                icon="📊"
                label="Average"
                value={data.averageVideoDuration}
              />

              <StatsCard
                icon="⚡"
                label={`At ${speed}x`}
                value={`${dynamicHours}h`}
              />
            </div>

            {/* Planner */}
            <WatchPlanner totalSeconds={totalSeconds} />
          </>
        )}
      </div>
    </div>
  );
}