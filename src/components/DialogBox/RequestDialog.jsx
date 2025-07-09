import React, { useRef } from "react";
import FriendRequestButton from "../buttons/FriendRequestButton";

const RequestDialog = ({ closeHandler }) => {
  const dialogRef = useRef();

  const handleOutsideClick = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      closeHandler(); // Close modal when clicked outside
    }
  };
  return (
    <section
      className="fixed top-0 left-0 h-screen w-full bg-bg/80 z-[999] flex justify-center items-center"
      onClick={handleOutsideClick}
    >
      <div
        ref={dialogRef}
        className="h-fit max-h-[70vh] w-[80%] md:w-[40%] xl:w-[30%] bg-surface p-4 rounded-md flex flex-col gap-4 "
      >
        {/* top  */}
        <div className="text-base font-bold">Friend Requests</div>

        <hr className="border border-text/10" />

        <div className="flex flex-col gap-2 overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-surface [&::-webkit-scrollbar-thumb]:bg-bg">
          <FriendRequestButton />
          <FriendRequestButton />
          <FriendRequestButton />
          <FriendRequestButton />
          <FriendRequestButton />
          <FriendRequestButton />
          <FriendRequestButton />
          <FriendRequestButton />
          <FriendRequestButton />
          <FriendRequestButton />
          <FriendRequestButton />
          <FriendRequestButton />
        </div>

        <button
          className="bg-accent text-sm font-semibold px-4 py-1 rounded-md cursor-pointer transition-all hover:scale-95"
          onClick={closeHandler}
        >
          Close
        </button>
      </div>
    </section>
  );
};

export default RequestDialog;
