"use client";
import { useState, useEffect, useRef } from "react";

const CameraStream = () => {
  const [cameraUrls, setCameraUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imgRefs = useRef([]);

  useEffect(() => {
    const fetchCameraUrls = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          const mockResponse = [
            "https://nasstream.fly.dev/stream",
            "https://nasstream.fly.dev/stream",
          ];
          setCameraUrls(mockResponse);
          setLoading(false);
        }, 2000);
      } catch (err) {
        setError("Failed to load camera streams");
        setLoading(false);
      }
    };

    fetchCameraUrls();
  }, []);

  const handleFullscreen = (index) => {
    if (imgRefs.current[index]) {
      if (imgRefs.current[index].requestFullscreen) {
        imgRefs.current[index].requestFullscreen();
      } else if (imgRefs.current[index].webkitRequestFullscreen) { 
        imgRefs.current[index].webkitRequestFullscreen();
      } else if (imgRefs.current[index].mozRequestFullScreen) { 
        imgRefs.current[index].mozRequestFullScreen();
      } else if (imgRefs.current[index].msRequestFullscreen) {
        imgRefs.current[index].msRequestFullscreen();
      }
    }
  };

  if (loading) {
    return <div className="text-black">Loading camera streams...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
      {cameraUrls.map((url, index) => (
        <div
          key={index}
          className="relative bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center w-full h-full"
        >
          <img
            ref={(el) => (imgRefs.current[index] = el)}
            src={`${url}?t=${Date.now()}`}
            alt="Live camera stream"
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => handleFullscreen(index)}
          />

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
