import React from "react";
import { MdCloudUpload } from "react-icons/md";
import UserImg from "/userprofile.png";

const AvatarInput = ({ id, name, avatarHandler, value, avatarPreview }) => {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      <label htmlFor={id} className="flex cursor-pointer ">
        <div className="relative flex items-center justify-center h-40 w-40 rounded-full overflow-hidden">
          <img
            className="object-contain h-full w-full"
            src={avatarPreview}
            alt="image"
          />
          <div className="absolute h-full w-full flex justify-center items-center bg-surface/50 opacity-50 hover:opacity-100">
            <MdCloudUpload className="text-lg" />
          </div>
        </div>
        <input
          id={id}
          name={name}
          type="file"
          className="hidden"
          value={value}
          onChange={avatarHandler}
        />
      </label>
    </div>
  );
};

export default AvatarInput;
