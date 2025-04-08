"use client"
import React, { useState, useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";

const ViewerCounter = () => {
  const [viewers, setViewers] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => {
        let change = Math.random() > 0.5 ? 1 : -1; 
        let newCount = prev + change;

        if (newCount < 7) return 7;
        if (newCount > 30) return 30;
        return newCount < 1 ? 1 : newCount; 
      });
    }, 6000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-2 right-2 flex items-center space-x-3 text-gray-200 bg-gray-800 bg-opacity-50 border border-gray-300 rounded-lg px-5 py-2">
      <AiOutlineEye className="h-8 w-8 text-white" />
      <span className="text-xl font-bold text-white">{viewers}</span>
    </div>
  );
};

export default ViewerCounter;
