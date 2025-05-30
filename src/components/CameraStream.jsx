// components/CameraStream.jsx
"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

// This component will contain all the logic and UI for the kitchen stream
const CameraStream = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [streamEnabled, setStreamEnabled] = useState(true);
  const [funFact, setFunFact] = useState("");
  const [nowCooking, setNowCooking] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false); // State for confetti animation

  const funFactIntervalRef = useRef(null);
  const nowCookingIntervalRef = useRef(null);
  const audioRef = useRef(null); // Ref for the audio element
  const confettiTimeoutRef = useRef(null); // Ref for confetti timeout



  const dishesCooking = [
    "هسه ينطبخ: كبسة دجاج شهية! 🍗",
    "هسه ينطبخ: فتة شاورما دجاج! 🌯",
    "هسه ينطبخ: مقلوبة خضرة ولحم! 🍚",
    "هسه ينطبخ: منسف أردني أصلي! 🐑",
    "هسه ينطبخ: كفتة بطحينة! 🍲",
    "هسه ينطبخ: تبولة تِرد الروح! 🥗",
  ];

  // --- Effect for fetching config ---
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        console.log("Fetching config...");
        const response = await fetch("/config.json");
        const config = await response.json();
        setStreamEnabled(config.streamEnabled);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching config:", err);
        setError("عذرًا، لم نتمكن من تحميل إعدادات البث. حاول مرة أخرى!");
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  // --- Effect for loading external script and dynamic content intervals ---
  useEffect(() => {
    if (!streamEnabled) {
      // Clear all intervals if stream is disabled
      if (funFactIntervalRef.current) clearInterval(funFactIntervalRef.current);
      if (nowCookingIntervalRef.current) clearInterval(nowCookingIntervalRef.current);
      return;
    }

    // Load the external menu embedder script
    const script = document.createElement("script");
    script.src = "https://www.fbgcdn.com/embedder/js/ewm2.js";
    script.defer = true;
    script.async = true;
    document.body.appendChild(script);

    // Start rotating fun facts

    // Start rotating "Now Cooking" dishes


    // Cleanup function
    return () => {
      document.body.removeChild(script);
      if (funFactIntervalRef.current) clearInterval(funFactIntervalRef.current);
      if (nowCookingIntervalRef.current) clearInterval(nowCookingIntervalRef.current);
    };
  }, [streamEnabled]); 

  // --- Confetti animation logic ---
  const handleOrderClick = useCallback(() => {
    setShowConfetti(true);
    if (confettiTimeoutRef.current) {
      clearTimeout(confettiTimeoutRef.current);
    }
    // Hide confetti after a short period
    confettiTimeoutRef.current = setTimeout(() => {
      setShowConfetti(false);
    }, 1500); // Confetti visible for 1.5 seconds
  }, []);

  // --- Audio Toggle ---
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  // --- Loading State UI ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-warm-gradient p-4 text-gray-800 font-arabic-headline">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-orange-400 h-16 w-16 mb-6 animate-spin-slow"></div>
        <p className="text-xl font-extrabold animate-pulse">
          تجهيز سحر مطبخنا... لحظات فقط! ✨
        </p>
        <p className="text-md text-gray-600 mt-2">
          نحن نحضر لك تجربة شهية!
        </p>
      </div>
    );
  }

  // --- Error State UI ---
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-4 text-center font-arabic-headline">
        <p className="text-5xl mb-4">🚨</p>
        <p className="text-2xl font-bold text-red-700 mb-3">عفوًا، حدث خطأ!</p>
        <p className="text-lg text-red-600 text-center">{error}</p>
        <p className="text-md text-red-500 mt-4">
          الرجاء التأكد من اتصالك بالإنترنت أو المحاولة مرة أخرى قريباً.
        </p>
      </div>
    );
  }

  // --- Restaurant Closed UI ---
  if (!streamEnabled) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-kitchen-pattern p-4 text-center font-arabic-headline">
        <div className="bg-white/90 rounded-2xl p-8 shadow-xl border-t-4 border-orange-500 max-w-md w-full">
          <p className="text-6xl mb-4 animate-bounce-slight">😴</p>
          <h2 className="text-4xl font-extrabold text-orange-600 mb-4">
            المطعم مغلق حالياً
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            البث المباشر غير متاح في الوقت الحالي. يمكنك العودة ومشاهدة الطهاة في العمل خلال ساعات العمل الرسمية!
          </p>
          <p className="text-md text-gray-500 mt-6">
            شكراً لتفهمك!
          </p>
        </div>
      </div>
    );
  }

  // --- Main Stream UI ---
  return (
    <div className="min-h-screen bg-kitchen-pattern flex flex-col items-center p-2 sm:p-4 md:p-6 font-arabic-body relative overflow-hidden">
      {/* Background Sizzle Sound */}
      <audio ref={audioRef} loop muted={isMuted}>
        <source src="/sizzle-sound.mp3" type="audio/mpeg" />
        {/* You need to provide a path to an actual sound file in your public folder */}
        Your browser does not support the audio element.
      </audio>

      {/* Mute/Unmute Toggle Button */}
      <button
        onClick={toggleMute}
        className="fixed top-4 left-4 z-50 p-3 rounded-full bg-orange-600 text-white shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-300"
        aria-label={isMuted ? "Unmute sizzle sound" : "Mute sizzle sound"}
      >
        {isMuted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.293 17.293A8 8 0 015.707 5.707M17.293 17.293L12.707 12.707M17.293 17.293L12 12m0-8.5v8.5m0-8.5l-4-4m4 4l-4 4m0-4.5h-4m4 4.5h4"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.536 8.464A6 6 0 0118 14.5c0 1.282-.197 2.53-.579 3.71l-2.742-2.742m-1.258-.758a1 1 0 01-1 1H7.5a1 1 0 01-1-1V5.707a1 1 0 011-1h6.293a1 1 0 011 1v6.293m-1.258-1.258l2.742 2.742M10 12l2 2m-2-2l2-2m-2 2l-2-2m2 2l-2 2M15.536 8.464l-2.742 2.742"
            />
          </svg>
        )}
      </button>

      {/* Main Content Area */}
      <div className="flex flex-col items-center w-full max-w-full lg:max-w-4xl z-10 p-0"> {/* Adjusted max-w-full for mobile */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-orange-700 mb-2 sm:mb-4 text-center drop-shadow-lg animate-fade-in-down font-arabic-headline leading-tight px-2"> {/* Added px-2 for very small screens */}
          شاهد سحر مطبخنا الآن! 🧑‍🍳
        </h1>
        <p className="text-md sm:text-lg text-gray-700 mb-4 sm:mb-6 text-center animate-fade-in font-arabic-body px-2"> {/* Added px-2 */}
          <span className="chef-typing">الطباخ على الهواء مباشرة!</span>
        </p>

        {/* Live Stream Container (Serving Tray Style) - CROPPING APPLIED HERE */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-orange-300 bg-black transform transition-transform duration-500 hover:scale-[1.01] mb-6 sm:mb-8 kitchen-tray-effect"> {/* Removed max-w-3xl here to allow full width on small screens */}
          <iframe
            className="w-full h-[calc(100%+80px)] absolute top-[-40px] left-0 pointer-events-none"
            src="https://www.youtube.com/embed/live_stream?channel=UCxjcbWh1Rh3XdiFomLHSfNg&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0&disablekb=1&playsinline=1&enablejsapi=1&cc_load_policy=0" // **CRITICAL: RESTORE YOUR ACTUAL YOUTUBE LIVE STREAM URL HERE!**
            title="Live Kitchen View"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            muted // Muted for autoplay compatibility
            playsInline // Essential for iOS autoplay
          ></iframe>
          {/* Subtle Sizzling/Steam Overlay */}
          <div className="absolute inset-0 sizzle-overlay pointer-events-none opacity-50"></div>

          {/* "LIVE" Badge */}
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs sm:text-sm font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full live-pulse shadow-md flex items-center gap-1 z-20"> {/* Adjusted padding/text size for smaller screens */}
            <span className="h-2 w-2 bg-white rounded-full block animate-ping-slow"></span>
            مباشر
          </div>

        </div>

        {/* Dynamic Fun Fact / Now Cooking */}
        {(funFact || nowCooking) && (
          <div className="bg-white/95 rounded-full py-2 px-4 sm:px-6 shadow-xl mb-6 sm:mb-8 text-center text-base sm:text-lg text-gray-800 font-semibold animate-bounce-in w-full max-w-xs sm:max-w-xl border border-orange-200"> {/* Adjusted max-w and text sizes */}
            {nowCooking ? (
              <p className="transition-opacity duration-500">{nowCooking}</p>
            ) : (
              <p className="transition-opacity duration-500">{funFact}</p>
            )}
          </div>
        )}

        {/* Call to Action - Order Button */}
        <div className="flex flex-col items-center gap-3 text-center mb-10 w-full max-w-xs sm:max-w-sm relative px-4"> {/* Added px-4 to prevent button touching edges */}
          <a
            href="#" // This should be a real link if the embedder doesn't handle click
            onClick={handleOrderClick} // Trigger confetti on click
            className="order-button relative overflow-hidden bg-orange-600 hover:bg-orange-700 text-white font-extrabold py-3 px-8 rounded-full text-lg sm:text-xl shadow-xl transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 animate-pulse-once w-full chef-hat-button" // Adjusted padding/text size for smaller screens
            // Assuming data-glf-cuid and data-glf-ruid are handled by the script
            data-glf-cuid="103c1049-90ef-4a8d-be42-8f816e11f1eb"
            data-glf-ruid="2e854e6b-97a0-49b8-895d-63db20e51fd7"
          >
            اطلب الآن ! 🍽️
            {/* Steam effect on hover */}
            <span className="button-steam-top"></span>
            <span className="button-steam-left"></span>
            <span className="button-steam-right"></span>
          </a>
          <p className="text-sm sm:text-md text-gray-700 mt-2 font-medium leading-relaxed"> {/* Adjusted text size */}
            المكونات طازجة .. جرب أكلنا الآن!
          </p>

          {/* Confetti Particles */}
          {showConfetti && (
            <div className="confetti-container">
              {["🍕", "🍔", "🍟", "🌯", "🥗"].map((icon, index) => (
                <span
                  key={index}
                  className="confetti-particle absolute text-2xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    transform: `translateX(${(Math.random() - 0.5) * 200}px)`, // Random horizontal spread
                  }}
                >
                  {icon}
                </span>
              ))}
            </div>
          )}

          {/* WhatsApp Button - Kept separate for fixed positioning */}
          <a
            href="https://wa.me/9647866884455"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 text-sm sm:text-base" // Adjusted padding/text size for mobile
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="20" // Slightly smaller icon for mobile
              height="20" // Slightly smaller icon for mobile
              className="h-5 w-5 mr-1.5 sm:h-6 sm:w-6 sm:mr-2" // Adjusted icon size and margin
              fill="white"
            >
              <path
                d="M19.11 17.205c-.094-.183-.553-.88-.682-.96-.129-.08-.226-.122-.313.081-.087.203-.961 1.445-1.314 1.758-.353.314-.721.353-.984.234-.263-.118-1.559-.578-1.921-.716-.362-.137-.629-.217-.896.081-.267.299-.961 1.445-1.284 1.758-.323.314-.527.362-.814.183-.287-.182-1.744-.666-2.639-1.597-.895-.931-1.422-2.071-1.516-2.274-.094-.203-.016-.406.182-.588.203-.183.406-.479.61-.778.203-.3.263-.527.323-.744.061-.217.031-.48-.062-.652-.094-.172-.527-1.27-.721-1.848-.195-.578-.39-.48-.585-.419-.195.061-.639.307-.984.621-.345.314-1.284 1.259-1.284 3.017 0 1.758 1.284 3.017 1.466 3.201.182.183 2.673 4.04 6.479 5.798 3.806 1.758 4.779 1.18 5.102 1.101.323-.08.782-.323.961-.621.183-.3-.129-.621-.323-.804z"
              />
            </svg>
            مستعجل! اطلب واتساب
          </a>

        </div>
      </div>
    </div>
  );
};

export default CameraStream;