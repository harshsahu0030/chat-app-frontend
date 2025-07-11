import React, { useState } from "react";
import FriendRequestButton from "../../components/buttons/FriendRequestButton";
import { getFriendRequestsApi } from "../../app/api/user.api";
import { useQuery } from "@tanstack/react-query";
import { useTanstackApiResponse } from "../../hooks/ApiResponse";
import NavigateBoxSkeleton from "../../components/skeletons/NavigateBoxSkeleton";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

const FriendsRequest = () => {
  const [page, setPage] = useState(1);

  //react-queries
  const { isError, error, data, isLoading, refetch } = useQuery({
    queryKey: ["friends-request", page],
    queryFn: () => getFriendRequestsApi({ page }),
  });

  const handleScroll = useInfiniteScroll({
    threshold: 60,
    loading: isLoading,
    page: page,
    totalPages: data?.data?.totalPages,
    setPage: setPage,
  });

  //api response
  useTanstackApiResponse({
    isError,
    error: error?.response?.data?.message,
  });
  return (
    <section aria-label="friends request" className="h-full w-full">
      <div
        className="flex flex-col gap-2 h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-bg [&::-webkit-scrollbar-thumb]:bg-surface"
        onScroll={handleScroll}
      >
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
    </section>
  );
};

export default FriendsRequest;
