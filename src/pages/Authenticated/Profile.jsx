import React, { createElement, useState } from "react";
import UserImg from "/userprofile.png";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import FriendDialog from "../../components/DialogBox/FriendDialog";

const ProfileButton = ({ variant, label, icon, clickHandler }) => {
  return (
    <button
      type="button"
      onClick={clickHandler ? clickHandler : () => {}}
      className={`flex-1/2 flex items-center justify-center gap-1 p-2 rounded-lg font-semibold cursor-pointer transition-all hover:scale-95 ${
        variant === "dark" ? "bg-surface" : "bg-primary"
      }`}
    >
      {createElement(icon)}
      <span className="text-xs md:text-sm capitalize">{label}</span>
    </button>
  );
};

const Profile = () => {
  const user = false;

  //states
  const [manageFriend, setManageFriend] = useState(false);

  return (
    <div className="h-full w-full flex flex-col gap-2">
      {/* top  */}
      <div className="flex items-center justify-between gap-5 bg-surface p-4 rounded-lg">
        <span className="text-base font-semibold">harsh0030</span>
        <BsThreeDotsVertical className="text-xl cursor-pointer transition-all hover:scale-95" />
      </div>

      <div className="w-full h-fit flex justify-between gap-5 p-4 rounded-lg items-center">
        <img
          src={UserImg}
          alt="profile-image"
          className="h-25 w-25 min-w-25 md:h-40 md:w-40 md:min-w-40 rounded-full object-cover p-1 bg-bg"
        />

        <div className="flex flex-col justify-center gap-2">
          <span className="text-base md:text-lg font-semibold">Harsh Sahu</span>
          <span className="text-xs md:text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
            quos?
          </span>
          <Link
            to="/friends"
            className="text-xs md:text-sm text-text/50 font-medium cursor-pointer"
          >
            145 friends
          </Link>
        </div>
      </div>

      {!!user && (
        <div className="flex items-center gap-2 text-sm">
          <ProfileButton label={"add post"} icon={IoMdAdd} />
          <ProfileButton
            variant={"dark"}
            label={"edit profile"}
            icon={MdEdit}
          />
        </div>
      )}

      {/* <div className="flex items-center gap-2 text-sm">
        <ProfileButton label={"confirm request"} icon={IoCheckmarkSharp} />
        <ProfileButton
          variant={"dark"}
          label={"reject request"}
          icon={IoMdClose }
        />
      </div> */}

      <div className="flex items-center gap-2 text-sm">
        <ProfileButton
          variant={"dark"}
          label={"friends"}
          icon={IoCheckmarkSharp}
          clickHandler={() => setManageFriend(true)}
        />

        {!!manageFriend && (
          <FriendDialog closeHandler={() => setManageFriend(false)} />
        )}
      </div>

      <hr className="border-b border-text/50 my-2" />
    </div>
  );
};

export default Profile;
