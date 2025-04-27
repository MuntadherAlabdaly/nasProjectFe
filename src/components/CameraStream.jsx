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
        console.log("Fetching config...");
        const response = await fetch("/config.json");
        const config = await response.json();
        setStreamEnabled(config.streamEnabled);
        const videoIdResponse = await fetch("/videoId.json");
        if (!videoIdResponse.ok) {
          throw new Error("Failed to fetch videoId.json");
        }
        const videoId= await videoIdResponse.json();
        //const videoIds = videoText.split("\n").map((id) => id.trim()).filter(Boolean);
        if (config.streamEnabled) {
          setTimeout(() => {
            setYoutubeUrls([videoId.videoIds[0], videoId.videoIds[0]]);
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
    return <div className="text-black text-center">جارِ تحميل البث المباشر...</div>;
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
    <div
      className={`w-full h-auto px-6 ${
        youtubeUrls.length === 1
          ? "flex justify-center"
          : "grid grid-cols-1 md:grid-cols-2 gap-6"
      }`}
    >
      {youtubeUrls.map((videoId, index) => (
        <div
          key={index}
          className="relative aspect-video rounded-lg overflow-hidden shadow-lg group w-full max-w-2xl"
        >
        <iframe
        id={`youtube-frame-${index}`}
        className="w-full h-full pointer-events-none"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playlist=${videoId}&fs=0&disablekb=1&playsinline=1&enablejsapi=1&cc_load_policy=0`}
        title="Nas Stream"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        muted
        playsInline
        ></iframe>
  
          <div className="absolute top-0 left-0 w-full h-full z-10"></div>
  
          <button
            onClick={() => handleFullscreen(index)}
            className="absolute top-2 right-2 z-20 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md text-sm"
          >
            ⛶ Fullscreen
          </button>
        </div>
      ))}
    </div>
  );
  
};

export default CameraStream;
