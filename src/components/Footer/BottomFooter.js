import React from "react";

const BottomFooter = () => {
  return (
    <div className="flex flex-col items-center pt-8">
      <div className="flex items-center space-x-6 mb-2">
        <span className="poppins text-white cursor-pointer">
          سياسة الخصوصية
        </span>
        <span className="poppins text-white cursor-pointer">
          شروط الاستخدام
        </span>
        <span className="poppins text-white cursor-pointer">التسعير</span>
      </div>
      <span className="text-gray-400 text-sm text-center poppins" dir="rtl">
        شكراً لاختياركم مطبخنا، راحتكم أولوية بالنسبة إلنا.
      </span>
    </div>
  );
};

export default BottomFooter;
