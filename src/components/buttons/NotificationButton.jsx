import React from "react";
import UserImg from "/userprofile.png";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const NotificationButton = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 items-center p-2 text-xl capitalize font-medium rounded-lg hover:bg-surface transition-all">
      {/* left  */}
      <div
        className="h-10 min-w-10 w-10 cursor-pointer"
        onClick={() => navigate("/chats/abc123")}
      >
        <img
          src={UserImg}
          alt="profile-image"
          className="h-full w-full object-cover rounded-full bg-bg"
        />
      </div>

      {/* right  */}
      <div className="w-full flex justify-between items-center">
        <div
          className="flex flex-col justify-center cursor-pointer"
          onClick={() => navigate("/chats/abc123")}
        >
          <span className="text-sm font-medium line-clamp-1">HARSH SAHU</span>
          <span className="text-xs line-clamp-1">
            ~ Liked your post - <span className="text-xs font-medium">1d</span>
          </span>
        </div>

        <MdDelete className="text-xl transition-all hover:scale-95 cursor-pointer text-red-400" />
      </div>
    </div>
  );
};

export default NotificationButton;
