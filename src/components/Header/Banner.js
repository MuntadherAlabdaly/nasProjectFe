import React from "react";
import Image from "next/image";
import Logo2 from "../../assets/logo2.png";

import CameraStream from "../CameraStream";
import { AiOutlineEye } from "react-icons/ai";
import ViewerCounter from "./ViewerCounter";

const Banner = () => {
  return (
    <section className="header-banner  w-full">
      <div className="p-6 sm:pt-6 flex items-center justify-between">
        <div className="absolute top-2 left-2 flex items-center justify-center text-white bg-orange-500 rounded-lg px-5 py-2 text-lg font-bold">
          مباشر
        </div>

        <div>
          <ViewerCounter />
        </div>
      </div>
      <div className="mr-2">
        <h1 className="text-center text-orange-500 text-xl md:text-4xl lg:text-4xl font-semibold mt-8 sm:mt-6 flex items-center justify-center">
          <Image
            className="mr-5"
            src={Logo2}
            alt="Logo"
            width={80}
            height={80}
          />{" "}
          عيونك على اكلك وهو يجهز
        </h1>
      </div>
      <div className="overflow-hidden h-96 flex items-center justify-center p-4 pb-8">
        <CameraStream />
      </div>
    </section>
  );
};

export default Banner;
