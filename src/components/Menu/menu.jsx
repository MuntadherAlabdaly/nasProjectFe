"use client";
import { useState, useEffect } from "react";

const Menu = ({ onOrder }) => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("/api/menu"); 
        const result = await response.json();
        if (result.success) {
          setMenu(result.data);
        } else {
          console.error("Error fetching menu:", result.error);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">جارِ تحميل القائمة...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-orange-500 mb-4">قائمة الطعام</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menu.length > 0 ? (
          menu.map((item) => (
            <div key={item.id} className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
              {item.img ? (
                <img
                  src={`data:image/png;base64,${item.img}`}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-md mb-2"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-300 flex items-center justify-center rounded-md mb-2">
                  <span className="text-gray-500">لا توجد صورة</span>
                </div>
              )}
              <h3 className="text-lg font-bold text-gray-700">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-lg text-green-600 font-semibold mt-2">
                {item.price.toLocaleString()} د.ع
              </p>
              <button
                onClick={() => onOrder(item)}
                className="mt-3 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                اطلب الآن
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-2">لا توجد عناصر متاحة في القائمة.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
