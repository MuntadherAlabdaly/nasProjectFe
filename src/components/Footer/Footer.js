import React from "react";
import Image from "next/image";
import BottomFooter from "./BottomFooter";
import MainFooter from "./MainFooter";
import Logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer-bg px-6 py-12">
      <div className="flex flex-row justify-evenly">
        <div>
          <Image src={Logo} alt={Logo} width={150} height={150} />
        </div>
        <div className="max-w-screen-xl">
          <MainFooter />
          <BottomFooter />
        </div>
        <div>
          <Image src={Logo} alt={Logo} width={150} height={150} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
