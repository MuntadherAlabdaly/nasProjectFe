import React from "react";
import CameraStream from "../CameraStream";
import { AiOutlineEye } from "react-icons/ai";

const Banner = () => {
  return (
    <section className="header-banner h-96 w-full bg-yellow-50">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-beige-shadow text-center text-3xl md:text-4xl lg:text-5xl poppins font-semibold mt-16 sm:mt-9">
          🍽️ عيونك على اكلك وهو يجهز
        </h1>

        <div className="p-6 rounded-xl w-full max-w-screen-lg h-[90vh] flex flex-col mt-12 sm:mt-0">
          <div className="absolute top-2 left-2 flex items-center justify-center text-white bg-red-500 rounded-lg px-5 py-2 text-lg font-bold">
            مباشر
          </div>

          <div className="absolute top-2 right-2 flex items-center space-x-3 text-gray-200 bg-gray-800 bg-opacity-50 border border-gray-300 rounded-lg px-5 py-2">
            <AiOutlineEye className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">5</span>
          </div>

          <div className="relative overflow-hidden flex-1 flex items-center justify-center">
            <CameraStream />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
