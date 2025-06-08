import React from "react";
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = ({ id, name, value, placeholder, onChange }) => {
  return (
    <div className="relative flex flex-col gap-1">
      <input
        id={id || ""}
        name={name || ""}
        type="search"
        value={value || ""}
        placeholder={placeholder || ""}
        onChange={onChange || ""}
        className="bg-surface text-sm w-full p-4 rounded-md outline-none border border-transparent focus:border-primary"
      />
      <IoSearchSharp className="absolute top-1/2 right-0 -translate-y-1/2 mr-2 text-2xl cursor-pointer transition-all hover:scale-95" />
    </div>
  );
};

export default SearchInput;
