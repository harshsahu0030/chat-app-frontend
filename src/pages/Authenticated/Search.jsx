import React, { useEffect, useState } from "react";
import SearchInput from "../../components/inputs/SearchInput";
import UserButton from "../../components/buttons/UserButton";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../../hooks/DebounceHook";
import { useTanstackApiResponse } from "../../hooks/ApiResponse";
import { getusersApi } from "../../app/api/user.api";
import NavigateBoxSkeleton from "../../components/skeletons/NavigateBoxSkeleton";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

const Search = () => {
  const ThreHold = 60;

  //state
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);

  //hook
  const debouncedSearch = useDebounce(search, 800);

  //react-queries
  const { isError, error, data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["users", debouncedSearch, page],
    queryFn: () => getusersApi({ search: debouncedSearch, page }),
  });

  //functions
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
    if (!debouncedSearch) return;
    refetch();
  }, [debouncedSearch, refetch]);

  useEffect(() => {
    if (isSuccess && Array.isArray(data?.data?.users)) {
      setUsers((prev) => {
        const newUsers = data.data.users;
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
      aria-label="search-list"
      className="h-full w-full rounded-md flex flex-col gap-4 overflow-hidden"
    >
      <SearchInput
        id="search-users"
        name={"search"}
        placeholder={"Search Rista"}
        value={search}
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

export default Search;
