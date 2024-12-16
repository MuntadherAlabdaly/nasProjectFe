"use client";

import React, { useEffect, useState } from "react";
import AboutItem from "./AboutItem";

const AboutUs = () => {
  const [aboutData, setAboutData] = useState([]);

  //fetching about us data
  useEffect(() => {
    fetch("/aboutus.json")
      .then((res) => res.json())
      .then((data) => setAboutData(data));
  }, []);
  return (
    <div className="text-white max-w-screen-xl mx-auto my-12 px-6 text-right">
      <h1 className="text-4xl pb-4">ليش لازم تختارنا؟</h1>
      <p className="text-xl ml-auto max-w-screen-md" dir="rtl">
        نحن نهتم بكل تفصيلة من أكلك، من أول ما نبدأ نحضره قدام عيونك، لحد ما
        يوصلك وأنت مرتاح ببيتك. نخليك تشوف شغلنا وتطمن على جودة الأكل، لأن رضاك
        غايتنا!
      </p>

      {/* about us cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8"
        dir="rtl"
      >
        {aboutData.map((item) => (
          <AboutItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
