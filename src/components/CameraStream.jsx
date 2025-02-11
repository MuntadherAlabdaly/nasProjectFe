"use client";
import { useState, useEffect } from "react";

const CameraStream = () => {
  const [youtubeUrls, setYoutubeUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchYoutubeUrls = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          const mockResponse = [
            "HbAMGNGumo4", 
            "HbAMGNGumo4", 
          ];
          setYoutubeUrls(mockResponse);
          setLoading(false);
        }, 2000);
      } catch (err) {
        setError("Failed to load YouTube streams");
        setLoading(false);
      }
    };

    fetchYoutubeUrls();
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
    return <div className="text-black text-center">Loading streams...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-auto px-6">
      {youtubeUrls.map((videoId, index) => (
        <div key={index} className="yt-embed-holder">
          <iframe
            id={`youtube-frame-${index}`}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&fs=1&iv_load_policy=3&playlist=${videoId}`}
            title="YouTube Live Stream"
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
