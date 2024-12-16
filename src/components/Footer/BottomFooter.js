import React from "react";

const BottomFooter = () => {
  return (
    <div className="flex flex-col items-center pt-8">
      {/* <div className="flex items-center space-x-6 mb-2">
        <span>سياسة الخصوصية</span>
        <span>شروط الاستخدام</span>
        <span>التسعير</span>
      </div> */}
      <span className="text-2xl text-orange-500 text-center poppins" dir="rtl">
        شكراً لاختياركم مطبخنا، راحتكم أولوية بالنسبة إلنا.
      </span>
    </div>
  );
};

export default BottomFooter;
