import CameraStream from "../components/CameraStream"
import { AiOutlineEye } from "react-icons/ai";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lightblue via-greenmid to-darkblue flex items-center justify-center p-6">
      <div className="p-6 rounded-xl  w-full max-w-screen-lg h-[90vh] flex flex-col justify-between">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Live Camera Streams</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              LIVE
            </div>
            <div className="absolute top-2 right-2 flex items-center space-x-2 text-gray-200">
              <AiOutlineEye className="h-6 w-6 text-gray-200" /> {/* Neutral contrasting color */}
              <span className="text-lg font-semibold text-gray-200">5</span> {/* Neutral contrasting color */}
            </div>
          <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden relative">
            {/* Camera Placeholder */}
             <CameraStream
                streamUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            />
          </div>
          {/* Camera 2 */}
          <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden relative">
            {/* Camera Placeholder */}
            <CameraStream
                streamUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
