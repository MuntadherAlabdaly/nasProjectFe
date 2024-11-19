"use client";
import { useState, useEffect } from "react";

const CameraStream = () => {
  const [cameraUrls, setCameraUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCameraUrls = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          const mockResponse = [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
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
          className="bg-gray-100 rounded-lg  overflow-hidden flex items-center justify-center w-full h-full"
        >
          <video
            src={url}
            autoPlay
            controls
            muted
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default CameraStream;
