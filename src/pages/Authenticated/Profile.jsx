import { createElement, useEffect, useState } from "react";
import UserImg from "/userprofile.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import FriendDialog from "../../components/DialogBox/FriendDialog";
import { RiMessage2Fill } from "react-icons/ri";
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

const ProfileButton = ({ variant, label, icon, clickHandler, disabled }) => {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={clickHandler ? clickHandler : () => {}}
      className={`ax-h-fit flex-1/2 flex items-center justify-center gap-1 p-2 rounded-lg font-semibold cursor-pointer transition-all hover:scale-95 ${
        variant === "dark" ? "bg-surface" : "bg-primary"
      }`}
    >
      {createElement(icon)}
      <span className="text-xs md:text-sm capitalize">
        {disabled ? "loading..." : label}
      </span>
    </button>
  );
};

const MessageButton = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <ProfileButton
      label={"message"}
      icon={RiMessage2Fill}
      clickHandler={() => navigate(`/chats/${id}`)}
    />
  );
};

const MeStatus = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2 text-sm">
      <ProfileButton label={"add post"} icon={IoMdAdd} />
      <ProfileButton
        variant={"dark"}
        label={"edit profile"}
        icon={MdEdit}
        clickHandler={() => navigate(`/user/update/${user?._id}`)}
      />
    </div>
  );
};

const NoneStatus = ({ userId, relationRefetch }) => {
  //react-queries
  const { mutate, isPending } = useMutation({
    mutationFn: sendFriendRequestApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      relationRefetch();
    },
  });

  //function
  const handleSendRequest = () => {
    mutate(userId);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2 text-sm">
        <MessageButton />
        <ProfileButton
          disabled={isPending}
          variant={"dark"}
          label={"add friend"}
          icon={IoMdAdd}
          clickHandler={handleSendRequest}
        />
      </div>
    </div>
  );
};

const FriendStatus = ({ userId, relationRefetch }) => {
  const [manageFriend, setManageFriend] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2 text-sm">
        <MessageButton />

        <ProfileButton
          variant={"dark"}
          label={"friends"}
          icon={IoCheckmarkSharp}
          clickHandler={() => setManageFriend(true)}
        />

        {!!manageFriend && (
          <FriendDialog
            closeHandler={() => setManageFriend(false)}
            userId={userId}
            relationRefetch={relationRefetch}
          />
        )}
      </div>
    </div>
  );
};

const RequestStatus = ({ userId, relationRefetch }) => {
  //react-queries
  const { mutate, isPending } = useMutation({
    mutationFn: acceptFriendRequestApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      relationRefetch();
    },
  });

  const { mutate: rejectMutate, isPending: rejectPending } = useMutation({
    mutationFn: rejectFriendRequestApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      relationRefetch();
    },
  });

  //function
  const handleAcceptRequest = () => {
    mutate(userId);
  };

  const handleRejectRequest = () => {
    rejectMutate(userId);
  };

  return (
    <div className="flex flex-col gap-4">
      <MessageButton />

      <div className="grid grid-cols-2 gap-2 text-sm">
        <ProfileButton
          label={"confirm request"}
          icon={IoCheckmarkSharp}
          disabled={isPending}
          clickHandler={handleAcceptRequest}
        />
        <ProfileButton
          variant={"dark"}
          label={"reject request"}
          icon={IoMdClose}
          disabled={rejectPending}
          clickHandler={handleRejectRequest}
        />
      </div>
    </div>
  );
};

const RequestedStatus = ({ userId, relationRefetch }) => {
  //react-queries
  const { mutate, isPending } = useMutation({
    mutationFn: cancelFriendRequestApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      relationRefetch();
    },
  });

  //function
  const handleCancelRequest = () => {
    mutate(userId);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2 text-sm">
        <MessageButton />
        <ProfileButton
          disabled={isPending}
          variant={"dark"}
          label={"cancel request"}
          icon={IoMdClose}
          clickHandler={handleCancelRequest}
        />
      </div>
    </div>
  );
};

const Profile = () => {
  const { id } = useParams();

  //states
  const [status, setStatus] = useState("none");

  //react-queries
  const { isError, error, data, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getuserApi({ id }),
  });

  const {
    isError: relationIsError,
    error: relationError,
    data: relationData,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["user-relation", id],
    queryFn: () => getuserRelation({ id }),
    staleTime: 0,
  });

  //useEffect
  useEffect(() => {
    if (isSuccess) {
      setStatus(relationData?.data?.status);
    }
  }, [isSuccess, relationData?.data?.status]);

  //api response
  useTanstackApiResponse({
    isError,
    error: error?.response?.data?.message,
  });
  useTanstackApiResponse({
    isError: relationIsError,
    error: relationError?.response?.data?.message,
  });

  if (isLoading) {
    <PageLoader />;
  }

  if (!data?.data?.user) {
    return (
      <div className="h-full w-full flex flex-col gap-2">
        <div className="flex items-center justify-between gap-5 bg-surface p-4 rounded-lg">
          <span className="text-base font-semibold">user not found</span>
        </div>
      </div>
    );
  }

  return (
    <section
      aria-label="profile-section"
      className="h-full w-full flex flex-col gap-2"
    >
      {/* top  */}
      <div className="flex items-center justify-between gap-5 bg-surface p-4 rounded-lg">
        <span className="text-base font-semibold">
          {data?.data?.user?.username}
        </span>
      </div>

      <div className="w-full h-fit flex gap-5 p-4 rounded-lg items-center">
        <img
          src={
            data?.data?.user?.avatar?.url
              ? data?.data?.user?.avatar?.url
              : UserImg
          }
          alt="profile-image"
          className="h-25 w-25 min-w-25 md:h-40 md:w-40 md:min-w-40 rounded-full object-cover p-1 bg-bg"
        />

        <div className="flex flex-col justify-center gap-2">
          <span className="text-base md:text-lg font-semibold">
            {data?.data?.user?.name}
          </span>
          <span className="text-xs md:text-sm">{data?.data?.user?.bio}</span>
        </div>
      </div>

      <hr className="border-b border-text/50 my-2" />
      {
        {
          none: <NoneStatus userId={id} relationRefetch={refetch} />,
          me: <MeStatus userId={id} relationRefetch={refetch} />,
          friend: <FriendStatus userId={id} relationRefetch={refetch} />,
          request: <RequestStatus userId={id} relationRefetch={refetch} />,
          sendRequest: (
            <RequestedStatus userId={id} relationRefetch={refetch} />
          ),
        }[status]
      }
    </section>
  );
};

export default Profile;
