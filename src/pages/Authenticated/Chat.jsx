import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  getChatApi,
  getMessagesApi,
  sendMessageApi,
} from "../../app/api/chat.api";
import ChatUserButton from "../../components/buttons/ChatUserButton";
import GroupChatButton from "../../components/buttons/GroupChatButton";
import MessageInput from "../../components/inputs/MessageInput";
import { useTanstackApiResponse } from "../../hooks/ApiResponse";
import { useSocketEvents } from "../../hooks/SocketEvent";
import { getSocket } from "../../Socket";
import {
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../../constant/events";
import Message from "../../components/messageBox/Message";
import MessageSkeleton from "../../components/skeletons/MessageSkeleton";
import toast from "react-hot-toast";
import { useRef } from "react";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useSelector } from "react-redux";

const Chat = () => {
  const socket = getSocket();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const messagesContainerRef = useRef(null);

  // states
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);

  const [members, setMembers] = useState([]);

  const [userTyping, setUserTyping] = useState(false);

  // queries
  const {
    isError: chatIsError,
    error: chatError,
    data: ChatData,
    isLoading: chatIsLoading,
    isSuccess: chatIsSuccess,
  } = useQuery({
    queryKey: ["chat", id],
    queryFn: () => getChatApi({ id }),
    retry: 2,
  });

  // Fetch messages by page
  const { isError, error, data, isLoading, isSuccess } = useQuery({
    queryKey: ["messages", id, page],
    queryFn: () => getMessagesApi({ id, page }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: sendMessageApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: () => {
      if (ChatData?.data?.chat?._id !== id) {
        navigate(`/chats/${ChatData?.data?.chat?._id}`);
      }
    },
  });

  const onChange = (e) => setMessage(e.target.value);

  const onEmojiClick = (emoji) => {
    setMessage((prev) => prev + emoji);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    mutate({ id, message });
    setMessage("");
    messagesContainerRef.current.scrollTop = 0;
  };

  const handleScroll = useInfiniteScroll({
    threshold: 60,
    loading: isLoading,
    page: page,
    totalPages: data?.data?.totalPages,
    setPage: setPage,
    reverse: true,
  });

  const focusHandler = () => {
    setTimeout(() => {
      socket.emit(START_TYPING, { members, id });
    }, 1000);
  };

  const blurHandler = () => {
    setTimeout(() => {
      socket.emit(STOP_TYPING, { members, id });
    }, 1000);
  };
  const newMessagesListener = (data) => {
    if (data.chatId !== id) return;
    setMessages((prev) => [data?.message, ...prev]);
  };

  const startTypingListener = (data) => {
    if (data.chatId !== id) return;
    setUserTyping(true);
  };

  const stopTypingListener = (data) => {
    if (data.chatId !== id) return;
    setUserTyping(false);
  };

  const eventHandler = {
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  // useEffect
  useSocketEvents(socket, eventHandler);

  // message
  useEffect(() => {
    if (isSuccess && Array.isArray(data?.data?.messages)) {
      setMessages((prev) => {
        const existing = new Set(prev.map((m) => m._id));
        const newOnes = data.data.messages.filter((m) => !existing.has(m._id));
        return [...prev, ...newOnes];
      });
    }

    return () => {
      setMessages([]);
      setMessage("");
      setPage(1);
    };
  }, [isSuccess, data, members, socket, user]);

  // chat data
  useEffect(() => {
    if (chatIsSuccess && ChatData?.data?.chat?.members) {
      setMembers(ChatData?.data?.chat?.members?.map((m) => m._id));
    }
  }, [chatIsSuccess, ChatData, id, navigate]);

  useTanstackApiResponse({
    isError,
    error: error?.response?.data?.message,
  });

  useTanstackApiResponse({
    isError: chatIsError,
    error: chatError?.response?.data?.message,
  });

  if (chatIsLoading) {
    return (
      <section className="h-full w-full flex justify-center items-center text-text/50 italic">
        Loading chats...
      </section>
    );
  }

  return (
    <section
      aria-label="chat-box"
      className="h-full w-full rounded-md flex flex-col"
    >
      {/* Top bar */}
      {ChatData?.data?.isGroupChat ? (
        <GroupChatButton data={{ groupName: ChatData?.data?.groupName }} />
      ) : (
        <ChatUserButton data={ChatData?.data?.user} />
      )}

      {/* Message box */}
      <div
        ref={messagesContainerRef}
        className="flex flex-col-reverse gap-2 h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-bg [&::-webkit-scrollbar-thumb]:bg-surface p-4"
        onScroll={handleScroll}
      >
        {messages?.map((item) => {
          return (
            <Message
              key={item._id}
              data={item}
              isGroupChat={ChatData?.data?.isGroupChat}
            />
          );
        })}

        {isLoading && <MessageSkeleton count={1} />}

        <span className="tecxt-sm font-medium italic text-text/50 w-fyll text-center">
          No Chats
        </span>
      </div>

      {userTyping && (
        <span className="italic text-sm text-text/50 animate-pulse">
          typing...
        </span>
      )}

      {/* Input */}

      <MessageInput
        blurHandler={blurHandler}
        focusHandler={focusHandler}
        disabled={isPending}
        message={message}
        onChange={onChange}
        submitHandler={submitHandler}
        onEmojiClick={onEmojiClick}
      />
    </section>
  );
};

export default Chat;
