"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        if (localStorage.getItem("isAuthenticated") !== "true") {
          router.push("/login");
          return;
        }

        setLoading(true);
        const response = await fetch("/config.json");

        if (!response.ok) {
          throw new Error("فشل تحميل إعدادات البث");
        }

        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error("خطأ في جلب الإعدادات:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const toggleStream = async () => {
    if (!config) return;

    const newStatus = !config.streamEnabled;
    setConfig({ ...config, streamEnabled: newStatus });

    try {
      const response = await fetch("/api/updateConfig", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ streamEnabled: newStatus }),
      });

      if (!response.ok) {
        throw new Error("فشل تحديث إعدادات البث");
      }
    } catch (error) {
      console.error("خطأ في تحديث حالة البث:", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-700">جارِ التحميل...</div>;
  }

  if (!config) {
    return <div className="text-center text-red-500">حدث خطأ أثناء تحميل الإعدادات.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">لوحة التحكم</h2>
        <div className="mt-4 text-right">
          <h3 className="text-lg font-medium">
            حالة البث: 
            <span className={`ml-2 font-bold ${config.streamEnabled ? "text-green-500" : "text-red-500"}`}>
              {config.streamEnabled ? "مُفعل" : "مغلق"}
            </span>
          </h3>
          <button
            onClick={toggleStream}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            {config.streamEnabled ? "إيقاف البث" : "تفعيل البث"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
