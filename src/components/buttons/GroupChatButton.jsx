import React from "react";
import GroupImg from "/group.png";
import { BsThreeDotsVertical } from "react-icons/bs";

const GroupChatButton = ({ data }) => {
  return (
    <div className="flex gap-2 items-center p-2 text-xl capitalize font-medium rounded-lg hover:bg-surface transition-all cursor-pointer">
      {/* left  */}
      <div className="h-10 min-w-10 w-10">
        <img
          src={GroupImg}
          alt="profile-image"
          className="h-full w-full object-cover rounded-full bg-bg"
        />
      </div>

      {/* right  */}
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium line-clamp-1">
            {data?.groupName || "Rista Group "}
          </span>
          <span className="text-xs line-clamp-1"></span>
        </div>

        <BsThreeDotsVertical />
      </div>
    </div>
  );
};

export default GroupChatButton;
