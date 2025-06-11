import React, { useState } from "react";
import UserImg from "/userprofile.png";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import GroupInfoDialog from "../DialogBox/GroupInfoDialog";

const GroupInfoButton = ({ data }) => {
  const navigate = useNavigate();

  //useState
  const [show, setShow] = useState(false);

  return (
    <div className="flex gap-2 items-center p-2 text-xl capitalize font-medium rounded-lg hover:bg-surface transition-all cursor-pointer">
      {/* left  */}
      <div
        className="h-10 min-w-10 w-10 rounded-full bg-bg"
        onClick={() => navigate("/abc123")}
      >
        <img
          src={UserImg}
          alt="profile-image"
          className="h-full w-full object-contain"
        />
      </div>

      {/* right  */}
      <div
        className="w-full flex justify-between items-center"
        onClick={() => navigate("/abc123")}
      >
        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium line-clamp-1">harsh0030</span>
          <span className="text-xs line-clamp-1">HARSH SAHU</span>
        </div>

        <BsThreeDotsVertical
          className="text-xs text-primary"
          onClick={() => setShow(true)}
        />

        {!!show && <GroupInfoDialog closeHandler={() => setShow(false)} />}
      </div>
    </div>
  );
};

export default GroupInfoButton;
