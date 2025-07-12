import { createElement, useEffect, useState, useMemo } from "react";
import UserImg from "/userprofile.png";
import { useNavigate, useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";
import FriendDialog from "../../components/DialogBox/FriendDialog";
import {
  acceptFriendRequestApi,
  cancelFriendRequestApi,
  getuserApi,
  getuserRelation,
  rejectFriendRequestApi,
  sendFriendRequestApi,
} from "../../app/api/user.api";
import { useTanstackApiResponse } from "../../hooks/ApiResponse";
import { useMutation, useQuery } from "@tanstack/react-query";
import PageLoader from "../../components/Loader/PageLoader";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ProfileButton = ({
  variant = "primary",
  label,
  icon,
  clickHandler,
  disabled,
}) => (
  <button
    disabled={disabled}
    type="button"
    onClick={clickHandler}
    className={`flex items-center justify-center gap-1 p-2 rounded-lg font-semibold cursor-pointer transition-all hover:scale-95 ${
      variant === "dark" ? "bg-surface" : "bg-primary"
    }`}
  >
    {createElement(icon)}
    <span className="text-xs md:text-sm capitalize">
      {disabled ? "loading..." : label}
    </span>
  </button>
);

const MessageButton = ({ userId }) => {
  const navigate = useNavigate();
  return (
    <ProfileButton
      label="message"
      icon={RiMessage2Fill}
      clickHandler={() => navigate(`/chats/${userId}`)}
    />
  );
};

const MeStatus = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 gap-2">
      <ProfileButton label="add post" icon={IoMdAdd} />
      <ProfileButton
        variant="dark"
        label="edit profile"
        icon={MdEdit}
        clickHandler={() => navigate(`/user/update/${user?._id}`)}
      />
    </div>
  );
};

const NoneStatus = ({ userId, refetch }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: sendFriendRequestApi,
    onSuccess: (data) => {
      toast.success(data.message);
      refetch();
    },
    onError: (error) => toast.error(error.response?.data?.message),
  });
  return (
    <div className="grid grid-cols-2 gap-2">
      <MessageButton userId={userId} />
      <ProfileButton
        disabled={isPending}
        variant="dark"
        label="add friend"
        icon={IoMdAdd}
        clickHandler={() => mutate(userId)}
      />
    </div>
  );
};

const FriendStatus = ({ userId, refetch }) => {
  const [manageFriend, setManageFriend] = useState(false);
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <MessageButton userId={userId} />
        <ProfileButton
          variant="dark"
          label="friends"
          icon={IoCheckmarkSharp}
          clickHandler={() => setManageFriend(true)}
        />
      </div>
      {manageFriend && (
        <FriendDialog
          closeHandler={() => setManageFriend(false)}
          userId={userId}
          relationRefetch={refetch}
        />
      )}
    </>
  );
};

const RequestStatus = ({ userId, refetch }) => {
  const { mutate: accept, isPending: accepting } = useMutation({
    mutationFn: acceptFriendRequestApi,
    onSuccess: (data) => {
      toast.success(data.message);
      refetch();
    },
    onError: (error) => toast.error(error.response?.data?.message),
  });

  const { mutate: reject, isPending: rejecting } = useMutation({
    mutationFn: rejectFriendRequestApi,
    onSuccess: (data) => {
      toast.success(data.message);
      refetch();
    },
    onError: (error) => toast.error(error.response?.data?.message),
  });

  return (
    <div className="grid grid-cols-2 gap-2">
      <ProfileButton
        label="confirm"
        icon={IoCheckmarkSharp}
        disabled={accepting}
        clickHandler={() => accept(userId)}
      />
      <ProfileButton
        variant="dark"
        label="reject"
        icon={IoMdClose}
        disabled={rejecting}
        clickHandler={() => reject(userId)}
      />
    </div>
  );
};

const RequestedStatus = ({ userId, refetch }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: cancelFriendRequestApi,
    onSuccess: (data) => {
      toast.success(data.message);
      refetch();
    },
    onError: (error) => toast.error(error.response?.data?.message),
  });
  return (
    <ProfileButton
      disabled={isPending}
      variant="dark"
      label="cancel request"
      icon={IoMdClose}
      clickHandler={() => mutate(userId)}
    />
  );
};

const StatusSection = ({ status, userId, refetch }) => {
  switch (status) {
    case "me":
      return <MeStatus />;
    case "friend":
      return <FriendStatus userId={userId} refetch={refetch} />;
    case "request":
      return <RequestStatus userId={userId} refetch={refetch} />;
    case "sendRequest":
      return <RequestedStatus userId={userId} refetch={refetch} />;
    default:
      return <NoneStatus userId={userId} refetch={refetch} />;
  }
};

const Profile = () => {
  const { id } = useParams();

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
    error: userErrObj,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getuserApi({ id }),
  });

  const {
    data: relationData,
    isLoading: relationLoading,
    isError: relationError,
    error: relationErrObj,
    refetch,
  } = useQuery({
    queryKey: ["user-relation", id],
    queryFn: () => getuserRelation({ id }),
    staleTime: 0,
  });

  useTanstackApiResponse({
    isError: userError,
    error: userErrObj?.response?.data?.message,
  });

  useTanstackApiResponse({
    isError: relationError,
    error: relationErrObj?.response?.data?.message,
  });

  const status = relationData?.data?.status ?? "none";

  if (userLoading || relationLoading) return <PageLoader />;

  const user = userData?.data?.user;
  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="text-lg font-semibold">User not found</span>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between bg-surface p-4 rounded-lg">
        <span className="text-base font-semibold">{user.username}</span>
      </div>

      <div className="flex gap-5 items-center p-4 rounded-lg">
        <img
          src={user.avatar?.url || UserImg}
          alt="profile"
          className="h-25 w-25 md:h-40 md:w-40 rounded-full object-cover p-1 bg-bg"
        />
        <div>
          <div className="text-base md:text-lg font-semibold">{user.name}</div>
          <div className="text-xs md:text-sm">{user.bio}</div>
        </div>
      </div>

      <hr className="border-b border-text/50" />

      <StatusSection status={status} userId={id} refetch={refetch} />
    </section>
  );
};

export default Profile;
