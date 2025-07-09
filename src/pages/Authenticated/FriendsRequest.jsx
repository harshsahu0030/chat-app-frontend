import React, { useState } from "react";
import FriendRequestButton from "../../components/buttons/FriendRequestButton";
import { getFriendRequestsApi } from "../../app/api/user.api";
import { useQuery } from "@tanstack/react-query";
import { useTanstackApiResponse } from "../../hooks/ApiResponse";
import NavigateBoxSkeleton from "../../components/skeletons/NavigateBoxSkeleton";

const FriendsRequest = () => {
  const [page, setPage] = useState(1);

  //react-queries
  const { isError, error, data, isLoading, refetch } = useQuery({
    queryKey: ["friends-request", page],
    queryFn: () => getFriendRequestsApi({ page }),
  });

  //api response
  useTanstackApiResponse({
    isError,
    error: error?.response?.data?.message,
  });
  return (
    <div className="h-full w-full flex flex-col gap-2">
      {isLoading ? (
        <NavigateBoxSkeleton count={1} />
      ) : data && data?.data?.friendRequests[0]?.requests.length > 0 ? (
        data?.data?.friendRequests[0]?.requests?.map((item, index) => (
          <FriendRequestButton key={index} data={item} refetch={refetch} />
        ))
      ) : (
        "No friends Request found"
      )}
    </div>
  );
};

export default FriendsRequest;
