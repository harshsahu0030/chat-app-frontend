import React, { useEffect, useState } from "react";
import UserButton from "../../components/buttons/UserButton";
import SearchInput from "../../components/inputs/SearchInput";
import { useQuery } from "@tanstack/react-query";
import { useTanstackApiResponse } from "../../hooks/ApiResponse";
import NavigateBoxSkeleton from "../../components/skeletons/NavigateBoxSkeleton";
import { useDebounce } from "../../hooks/DebounceHook";
import { getFriendsApi } from "../../app/api/user.api";
import { useNavigate } from "react-router-dom";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

const Friends = () => {
  const ThreHold = 60;
  const navigate = useNavigate();
  //state
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);

  //hook
  const debouncedSearch = useDebounce(search, 800);

  //react-queries
  const { isError, error, data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["friends", debouncedSearch, page],
    queryFn: () => getFriendsApi({ search: debouncedSearch, page }),
  });

  //function
  const handleChange = (e) => {
    setUsers([]);
    setSearch(e.target.value);
    setPage(1);
  };

  const handleScroll = useInfiniteScroll({
    threshold: 60,
    loading: isLoading,
    page: page,
    totalPages: data?.data?.totalPages,
    setPage: setPage,
  });

  //useEffect
  useEffect(() => {
    if (isSuccess && Array.isArray(data?.data?.friends)) {
      setUsers((prev) => {
        const newUsers = data?.data?.friends;
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
    <section
      aria-label="friends-list"
      className="h-full w-full flex flex-col gap-2"
    >
      <button
        type="button"
        onClick={() => navigate("/friends/request")}
        className="max-h-fit flex-1/2 flex items-center justify-center gap-1 p-2 rounded-lg font-semibold cursor-pointer transition-all hover:scale-95 bg-primary"
      >
        <span className="text-xs md:text-sm capitalize">Friend Requests</span>
      </button>

      <hr className="my-2 text-text/40" />

      <SearchInput
        id="search-friends"
        name="search"
        value={search}
        placeholder="Search Friends"
        onChange={handleChange}
      />

      <div
        className="flex flex-col gap-2 h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-bg [&::-webkit-scrollbar-thumb]:bg-surface"
        onScroll={handleScroll}
      >
        {users?.map((item, index) => (
          <UserButton key={index} data={item} />
        ))}

        {isLoading ? (
          <NavigateBoxSkeleton count={1} />
        ) : (
          <span className="text-sm text-text/50 w-full text-center py-1">
            No more users found
          </span>
        )}
      </div>
    </section>
  );
};

export default Friends;
