import React from "react";
import LOGO from "/logo.jpg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full border-b border-surface">
      <img
        src={LOGO}
        alt="logo"
        className="h-full w-fit object-contain cursor-pointer hover:scale-95 transition-all hover:drop-shadow-lg hover:drop-shadow-secondary"
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default Header;
