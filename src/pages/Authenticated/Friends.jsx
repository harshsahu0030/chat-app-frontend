import React from "react";
import UserButton from "../../components/buttons/UserButton";
import SearchInput from "../../components/inputs/SearchInput";

const Friends = () => {
  return (
    <div className="h-full w-full flex flex-col gap-2">
      <button
        type="button"
        className="max-h-fit flex-1/2 flex items-center justify-center gap-1 p-2 rounded-lg font-semibold cursor-pointer transition-all hover:scale-95 bg-primary"
      >
        <span className="text-xs md:text-sm capitalize">Friend Requests</span>
      </button>

      <hr className="my-2 text-text/40" />

      <SearchInput />

      <UserButton />
      <UserButton />
      <UserButton />
      <UserButton />
      <UserButton />
      <UserButton />
      <UserButton />
      <UserButton />
      <UserButton />
      <UserButton />
      <UserButton />
      <UserButton />
      <UserButton />
      <UserButton />
      <UserButton />
      <UserButton />
      <UserButton />
      <UserButton />
      <UserButton />
      <UserButton />
      <UserButton />
      <UserButton />
    </div>
  );
};

export default Friends;
