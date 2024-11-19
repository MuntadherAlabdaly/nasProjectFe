"use client";

const CameraStream = ({ streamUrl }) => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden flex items-center justify-center h-full">
      {streamUrl ? (
        <video
          src={streamUrl}
          autoPlay
          controls
          muted
          className="w-full h-full object-cover" 
        />
      ) : (
        <div className="text-gray-500 text-center">Stream not available</div>
      )}
    </div>
  );
};

export default CameraStream;
