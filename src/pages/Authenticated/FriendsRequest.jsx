import React, { useEffect, useState } from "react";
import FriendRequestButton from "../../components/buttons/FriendRequestButton";
import { getFriendRequestsApi } from "../../app/api/user.api";
import { useQuery } from "@tanstack/react-query";
import { useTanstackApiResponse } from "../../hooks/ApiResponse";
import NavigateBoxSkeleton from "../../components/skeletons/NavigateBoxSkeleton";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

const FriendsRequest = () => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);

  //react-queries
  const { isError, error, data, isLoading, refetch, isSuccess } = useQuery({
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

  useEffect(() => {
    if (isSuccess && Array.isArray(data?.data?.friendRequests[0]?.requests)) {
      setUsers((prev) => {
        const existingIds = new Set(prev.map((u) => u._id));
        const newUsers = data?.data?.friendRequests[0].requests?.filter(
          (u) => !existingIds.has(u._id)
        );
        return [...prev, ...newUsers];
      });
    }
  }, [isSuccess, data]);

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
        ) : users.length > 0 ? (
          users?.map((item, index) => (
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
