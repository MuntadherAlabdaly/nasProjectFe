"use client";
import { useState, useEffect } from "react";
import Menu from "./Menu/menu";

const CameraStream = () => {
  const [youtubeUrls, setYoutubeUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [streamEnabled, setStreamEnabled] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/config.json");
        const config = await response.json();
        setStreamEnabled(config.streamEnabled);

        if (config.streamEnabled) {
          setTimeout(() => {
            setYoutubeUrls(["poDycJmf1k4", "poDycJmf1k4"]);
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

  const handleOrder = (item) => {
    const customerName = prompt("أدخل اسمك لعرض الطلب على الشاشة:");
    if (customerName) {
      const newOrder = { id: Date.now(), name: customerName, dish: item.name, status: "قيد الإعداد" };
      setOrders((prevOrders) => [...prevOrders, newOrder]);

      fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
    }
  };

  if (loading) {
    return <div className="text-black text-center">جارِ تحميل البث...</div>;
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
    <div className="flex flex-col items-center w-full px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {youtubeUrls.map((videoId, index) => (
          <div key={index} className="relative yt-embed-holder w-full">
            <iframe
              id={`youtube-frame-${index}`}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&fs=1&iv_load_policy=3&playlist=${videoId}`}
              title="Nas Stream"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-60 md:h-96"
            ></iframe>
            <button
              onClick={() => handleFullscreen(index)}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md text-sm"
            >
              ⛶ Fullscreen
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowMenu(true)}
        className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition"
      >
        عرض القائمة 🍽️
      </button>

      <div className="mt-6 w-full max-w-2xl p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-orange-500 text-center">الطلبات الحالية</h2>
        {orders.length === 0 ? (
          <p className="text-center text-gray-500 mt-3">لا توجد طلبات بعد</p>
        ) : (
          <ul className="mt-3">
            {orders.map((order) => (
              <li key={order.id} className="p-3 bg-gray-100 rounded-lg mb-2 flex justify-between">
                <span>{order.name} طلب {order.dish}</span>
                <span className="text-green-500 font-semibold">{order.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowMenu(false)}>
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setShowMenu(false)} className="absolute top-2 right-4 text-gray-600 text-xl">✖</button>
              <Menu onOrder={handleOrder} />
            </div>
         </div>
        )}

    </div>
  );
};

export default CameraStream;
