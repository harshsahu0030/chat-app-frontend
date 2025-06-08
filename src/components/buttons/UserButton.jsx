import React from "react";
import UserImg from "/userprofile.png";
import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserButton = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex gap-2 items-center p-2 text-xl capitalize font-medium rounded-lg hover:bg-surface transition-all cursor-pointer"
      onClick={() => navigate("/abc123")}
    >
      {/* left  */}
      <div className="h-10 min-w-10 w-10 rounded-full bg-bg">
        <img
          src={UserImg}
          alt="profile-image"
          className="h-full w-full object-contain"
        />
      </div>

      {/* right  */}
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium line-clamp-1">harsh0030</span>
          <span className="text-xs line-clamp-1">HARSH SAHU</span>
        </div>

        <button className="text-xs p-2 bg-surface rounded-lg">friends</button>
      </div>
    </div>
  );
};

export default UserButton;
