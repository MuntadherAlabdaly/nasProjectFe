"use client";
import { useState, useEffect } from "react";

const CameraStream = () => {
  const [youtubeUrls, setYoutubeUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [streamEnabled, setStreamEnabled] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/config.json");
        const config = await response.json();
        setStreamEnabled(config.streamEnabled);

        if (config.streamEnabled) {
          setTimeout(() => {
            setYoutubeUrls(["YpzMewbTIqw", "YpzMewbTIqw"]);
            setLoading(false);
          }, 2000);
        } else {
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to load stream settings");
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleFullscreen = (index) => {
    const iframe = document.getElementById(`youtube-frame-${index}`);
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    }
  };

  if (loading) {
    return <div className="text-black text-center">Loading stream settings...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!streamEnabled) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-3xl font-bold text-orange-500">المطعم مغلق حاليا</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-auto px-6">
      {youtubeUrls.map((videoId, index) => (
        <div key={index} className="yt-embed-holder">
          <iframe
            id={`youtube-frame-${index}`}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&fs=1&iv_load_policy=3&playlist=${videoId}`}
            title="Nas Stream"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <button
            onClick={() => handleFullscreen(index)}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md text-sm"
          >
            ⛶ Fullscreen
          </button>
        </div>
      ))}
    </div>
  );
};

export default CameraStream;
