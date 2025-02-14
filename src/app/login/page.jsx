"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/config.json");

      if (!response.ok) {
        throw new Error("فشل تحميل بيانات المستخدم");
      }

      const config = await response.json();

      if (
        formData.username === config.username &&
        formData.password === config.password
      ) {
        localStorage.setItem("isAuthenticated", "true");
        router.push("/dashboard");
      } else {
        setError("اسم المستخدم أو كلمة المرور غير صحيحة");
      }
    } catch (error) {
      console.error("خطأ في تسجيل الدخول:", error);
      setError("حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" dir="rtl">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700">تسجيل دخول </h2>
        <form onSubmit={handleLogin} className="mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">اسم المستخدم</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-orange-500"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600">كلمة المرور</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-orange-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
