import express from "express";
import { extractPlaylistId } from "../utils/extractId.js";
import { getCache, setCache } from "../utils/cache.js";
import { 
  getPlaylistDetails, 
  getAllVideoIds, 
  getVideoDurations, 
  convertISOToSeconds 
} from "../utils/youtube.js";

const router = express.Router();

// ✅ Format time
function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${hrs}h ${mins}m ${secs}s`;
}

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;

    // ✅ Validate input
    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Playlist URL is required",
      });
    }

    const playlistId = extractPlaylistId(url);

    if (!playlistId) {
      return res.status(400).json({
        success: false,
        message: "Invalid YouTube playlist URL",
      });
    }

    // ✅ Check cache AFTER validation
    const cached = getCache(playlistId);
    if (cached) {
      return res.json({ ...cached, cached: true });
    }

    // ✅ Fetch playlist details
    const details = await getPlaylistDetails(playlistId);

    if (!details) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found or private",
      });
    }

    // ✅ Fetch video IDs
    const videoIds = await getAllVideoIds(playlistId);

    // ✅ Fetch durations
    const durations = await getVideoDurations(videoIds);

    // ✅ Calculate total duration
    const totalSeconds = durations.reduce((sum, d) => {
      return sum + convertISOToSeconds(d);
    }, 0);

    // ✅ Average duration
    const avgSeconds = videoIds.length
      ? totalSeconds / videoIds.length
      : 0;

    // ✅ Playback speeds
    const speeds = {
      "1x": totalSeconds,
      "1.25x": totalSeconds / 1.25,
      "1.5x": totalSeconds / 1.5,
      "2x": totalSeconds / 2,
    };

    // ✅ Prepare result object
    const result = {
      success: true,
      playlistId,
      title: details.title,
      thumbnail: details.thumbnail,
      totalVideos: videoIds.length,

      totalDuration: formatTime(totalSeconds),
      averageVideoDuration: formatTime(avgSeconds),

      playbackTime: {
        "1x": formatTime(speeds["1x"]),
        "1.25x": formatTime(speeds["1.25x"]),
        "1.5x": formatTime(speeds["1.5x"]),
        "2x": formatTime(speeds["2x"]),
      },
    };

    // ✅ Save to cache (IMPORTANT FIX)
    setCache(playlistId, result);

    // ✅ Send response
    return res.json(result);

  } catch (error) {
    console.error("SERVER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;