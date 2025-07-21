import React from "react";
import UserImg from "/userprofile.png";
import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  acceptFriendRequestApi,
  rejectFriendRequestApi,
} from "../../app/api/user.api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const FriendRequestButton = ({ data, refetch }) => {
  const navigate = useNavigate();

  //react-queries
  const { mutate, isPending } = useMutation({
    mutationFn: acceptFriendRequestApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onSettled: () => refetch(),
  });

  const { mutate: rejectMutate, isPending: rejectPending } = useMutation({
    mutationFn: rejectFriendRequestApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onSettled: () => refetch(),
  });

  return (
    <div className="flex gap-2 items-center p-2 text-xl capitalize font-medium rounded-lg hover:bg-surface transition-all cursor-pointer">
      {/* left  */}
      <div
        className="h-10 min-w-10 w-10 rounded-full bg-bg"
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
        <div
          className="flex flex-col justify-center"
          onClick={() => navigate(`/users/${data._id}`)}
        >
          <span className="text-sm font-medium line-clamp-1">
            {data?.username}
          </span>
          <span className="text-xs line-clamp-1">{data?.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => mutate(data?._id)}
            disabled={isPending || rejectPending}
            button="button"
            className="text-xs p-2 bg-primary rounded-lg cursor-pointer transition-all hover:scale-95 disabled::cursor-not-allowed"
          >
            {isPending ? "loading" : "Accept"}
          </button>
          <button
            onClick={() => rejectMutate(data?._id)}
            disabled={isPending || rejectPending}
            button="button"
            className="text-xs p-2 bg-red-400 rounded-lg cursor-pointer transition-all hover:scale-95 disabled::cursor-not-allowed"
          >
            {rejectPending ? "loading" : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestButton;
