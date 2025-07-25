import React from "react";
import UserImg from "/userprofile.png";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChatUserButton = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 items-center p-2 text-xl capitalize font-medium rounded-lg hover:bg-surface transition-all cursor-pointer">
      {/* left  */}
      <div
        className="h-10 min-w-10 w-10"
        onClick={() => navigate(`/users/${data._id}`)}
      >
        <img
          src={data?.avatar?.url ? data?.avatar?.url : UserImg}
          alt="profile-image"
          className="h-full w-full object-contain"
        />
      </div>

      {/* right  */}
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium line-clamp-1">
            {data?.username}
          </span>
          <span className="text-xs line-clamp-1">{data?.name}</span>
        </div>

        <BsThreeDotsVertical />
      </div>
    </div>
  );
};

export default ChatUserButton;
