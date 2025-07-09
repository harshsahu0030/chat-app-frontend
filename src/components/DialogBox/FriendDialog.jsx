import { useMutation } from "@tanstack/react-query";
import React, { useRef } from "react";
import { removeFriendApi } from "../../app/api/user.api";
import toast from "react-hot-toast";

const FriendDialog = ({ closeHandler, userId, relationRefetch }) => {
  const dialogRef = useRef();

  //react-queries
  const { mutate, isPending } = useMutation({
    mutationFn: removeFriendApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      relationRefetch();
    },
  });

  //function
  const handleRemoveFriend = () => {
    mutate(userId);
    closeHandler();
  };

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
        className="h-fit w-[80%] md:w-[40%] xl:w-[30%] bg-surface p-4 rounded-md flex flex-col gap-4"
      >
        {/* top  */}
        <div className="text-base font-bold">Manage Relation</div>

        <hr className="border border-text/10" />

        <button
          type="button"
          disabled={isPending}
          className="bg-red-400 w-full text-sm font-semibold px-4 py-1 rounded-md cursor-pointer transition-all hover:scale-95 disabled:cursor-not-allowed"
          onClick={handleRemoveFriend}
        >
          {isPending ? "loading..." : "Remove Friend"}
        </button>

        <button
          type="button"
          className="bg-accent text-sm font-semibold px-4 py-1 rounded-md cursor-pointer transition-all hover:scale-95"
          onClick={closeHandler}
        >
          Close
        </button>
      </div>
    </section>
  );
};

export default FriendDialog;
