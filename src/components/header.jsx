import React from "react";
import "../styles/header.css";

const Header = () => {
  return (
    <div className="header mt-2">
      <img className="px-5" src="/assets/headerLogo.svg" alt="" />
      <span className="title">Monk Upsell & Cross-sell</span>
    </div>
  );
};

export default Header;
