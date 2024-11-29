import React from "react";
import { AiFillInstagram, AiOutlineWhatsApp } from "react-icons/ai";

const MainFooter = () => {
  const FooterLinks = [
    { id: 1, text: "حول مطبخنا" },
    { id: 2, text: "اقرأ مدونتنا" },
    { id: 3, text: "سجل كمسؤول توصيل" },
    { id: 4, text: "أضف مطعمك معنا" },
    { id: 5, text: "احصل على مساعدة" },
    { id: 6, text: "اطرح أي سؤال" },
    { id: 7, text: "اطلب الآن" },
    { id: 8, text: "تواصل معنا" },
  ];

  return (
    <div className="flex pb-8 justify-center">
      <div className="flex space-x-12">
        <div className="flex flex-col space-y-2">
          {FooterLinks.slice(0, 4).map((item) => (
            <span className="text-white poppins" key={item.id}>
              {item.text}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-2">
          {FooterLinks.slice(4, 8).map((item) => (
            <span className="text-white poppins" key={item.id}>
              {item.text}
            </span>
          ))}
        </div>
        <div className="flex flex-col items-center space-y-2">
          <a
            href="https://www.instagram.com"
            className="flex items-center text-white space-x-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillInstagram size={24} />
            <span className="poppins">انستغرام</span>
          </a>
          <a
            href="https://www.whatsapp.com"
            className="flex items-center text-white space-x-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineWhatsApp size={24} />
            <span className="poppins">واتساب</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
