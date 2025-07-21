import ChatListButton from "../../components/buttons/ChatListButton";
import { useTanstackApiResponse } from "../../hooks/ApiResponse";
import { useQuery } from "@tanstack/react-query";
import { getChatsApi } from "../../app/api/chat.api";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import NavigateBoxSkeleton from "../../components/skeletons/NavigateBoxSkeleton";
import { useDebounce } from "../../hooks/DebounceHook";
import SearchInput from "../../components/inputs/SearchInput";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { NEW_MESSAGE_ALERT, ONLINE_USERS } from "../../constant/events";
import { getSocket } from "../../Socket";
import { useSocketEvents } from "../../hooks/SocketEvent";
import toast from "react-hot-toast";

const Chats = () => {
  const socket = getSocket();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [chats, setChats] = useState([]);

  //hook
  const debouncedSearch = useDebounce(search, 800);

  //react-queries
  const { isError, error, data, isLoading, isSuccess } = useQuery({
    queryKey: ["chats", debouncedSearch, page],
    queryFn: () => getChatsApi({ search: debouncedSearch, page }),
    refetchOnWindowFocus: true,
  });

  //functions
  const handleChange = (e) => {
    setChats([]);
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

  const newMessageAlert = useCallback((data) => {
    setChats((prev) => {
      let newArr = prev.filter((chat) => chat._id !== data.chat._id);
      return [data.chat, ...newArr];
    });

    toast.success("New Message");
  }, []);

  const eventHandler = {
    [NEW_MESSAGE_ALERT]: newMessageAlert,
  };

  // useEffect
  useSocketEvents(socket, eventHandler);

  //useffect
  useEffect(() => {
    if (isSuccess && Array.isArray(data?.data?.chats)) {
      setChats((prev) => {
        const incoming = data.data.chats;

        if (page === 1) {
          return incoming;
        }

        const existingIds = new Set(prev.map((c) => c._id));
        const newChats = incoming.filter((c) => !existingIds.has(c._id));
        return [...prev, ...newChats];
      });
    }
  }, [isSuccess, data, page, socket]);

  //api response
  useTanstackApiResponse({
    isError,
    error: error?.response?.data?.message,
  });

  return (
    <section
      aria-label="chats-list"
      className="h-full w-full rounded-md flex flex-col gap-4 overflow-hidden"
    >
      <div className="flex items-center gap-2 w-full">
        <SearchInput
          id="search-chats"
          name={"search"}
          placeholder={"Search Rista"}
          value={search}
          onChange={handleChange}
        />
      </div>

      <div
        className="flex flex-col gap-2 h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-bg [&::-webkit-scrollbar-thumb]:bg-surface"
        onScroll={handleScroll}
      >
        {!isLoading &&
          chats?.map((item) => <ChatListButton key={item._id} data={item} />)}

        {isLoading ? (
          <NavigateBoxSkeleton count={1} />
        ) : chats.length === 0 ? (
          <span className="text-sm text-text/50 w-full text-center py-1">
            No chats found
          </span>
        ) : (
          <span className="text-sm text-text/50 w-full text-center py-1">
            No more chats
          </span>
        )}
      </div>
    </section>
  );
};

export default Chats;
