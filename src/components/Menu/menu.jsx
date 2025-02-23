"use client";
import { useState, useEffect } from "react";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("/menu.json");
        const data = await response.json();
        setMenu(data.menu);
      } catch (error) {
        console.error("Error loading menu:", error);
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
        {menu.map((item) => (
          <div key={item.id} className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
            <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-md mb-2" />
            <h3 className="text-lg font-bold text-gray-700">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-lg text-green-600 font-semibold mt-2">${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
