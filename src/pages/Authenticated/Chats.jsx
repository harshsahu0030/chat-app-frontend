import React from "react";
import ChatListButton from "../../components/buttons/ChatListButton";
import { useTanstackApiResponse } from "../../hooks/ApiResponse";
import { useQuery } from "@tanstack/react-query";
import { getChatsApi } from "../../app/api/chat.api";
import { useState } from "react";
import { useEffect } from "react";
import NavigateBoxSkeleton from "../../components/skeletons/NavigateBoxSkeleton";
import { useDebounce } from "../../hooks/DebounceHook";
import SearchInput from "../../components/inputs/SearchInput";

const Chats = () => {
  const ThreHold = 60;

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [chats, setchats] = useState([]);

  //hook
  const debouncedSearch = useDebounce(search, 800);

  //react-queries
  const { isError, error, data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["chats", debouncedSearch, page],
    queryFn: () => getChatsApi({ search: debouncedSearch, page }),
  });

  //functions
  const handleChange = (e) => {
    setchats([]);
    setSearch(e.target.value);
    setPage(1);
  };

  const handleScroll = (e) => {
    const scrollTop = Math.floor(e.target.scrollTop);
    const clientHeight = Math.floor(e.target.clientHeight);
    const scrollHeight = Math.floor(e.target.scrollHeight);

    const remaingHeight = scrollHeight - scrollTop - clientHeight;

    if (
      remaingHeight < ThreHold &&
      !isLoading &&
      data?.data?.filteredUsers !== chats.length &&
      data?.data?.totalPages >= page
    ) {
      setPage((prev) => prev + 1);
    }
  };

  //useEffect
  useEffect(() => {
    if (!debouncedSearch) return;
    refetch();
  }, [debouncedSearch, refetch]);

  //useffect
  useEffect(() => {
    if (isSuccess && Array.isArray(data?.data?.chats)) {
      setchats((prev) => {
        const existingIds = new Set(prev.map((u) => u._id));
        const newChats = data?.data?.chats.filter(
          (u) => !existingIds.has(u._id)
        );
        return [...prev, ...newChats];
      });
    }
  }, [isSuccess, data]);

  //api response
  useTanstackApiResponse({
    isError,
    error: error?.response?.data?.message,
  });

  return (
    <section className="h-full w-full rounded-md flex flex-col gap-4 overflow-hidden">
      <SearchInput
        id="search-chats"
        name={"search"}
        placeholder={"Search Rista"}
        value={search}
        onChange={handleChange}
      />

      <div
        className="flex flex-col gap-2 h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-bg [&::-webkit-scrollbar-thumb]:bg-surface"
        onScroll={handleScroll}
      >
        {chats?.map((item, index) => (
          <ChatListButton key={index} data={item} />
        ))}

        {isLoading ? (
          <NavigateBoxSkeleton count={1} />
        ) : (
          <span className="text-sm text-text/50 w-full text-center py-1">
            No more chats found
          </span>
        )}
      </div>
    </section>
  );
};

export default Chats;
