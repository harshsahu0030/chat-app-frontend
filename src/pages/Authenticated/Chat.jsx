import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  getChatApi,
  getMessagesApi,
  sendMessageApi,
} from "../../app/api/chat.api";

import { getSocket } from "../../Socket";
import { useSocketEvents } from "../../hooks/SocketEvent";
import { useTanstackApiResponse } from "../../hooks/ApiResponse";

import { NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../../constant/events";

import ChatUserButton from "../../components/buttons/ChatUserButton";
import GroupChatButton from "../../components/buttons/GroupChatButton";
import Message from "../../components/messageBox/Message";
import MessageInput from "../../components/inputs/MessageInput";
import MessageSkeleton from "../../components/skeletons/MessageSkeleton";

const Chat = () => {
  const socket = getSocket();
  const { id } = useParams();
  const navigate = useNavigate();

  const messagesContainerRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [userTyping, setUserTyping] = useState(false);

  // Fetch chat data
  const {
    data: ChatData,
    isLoading: chatIsLoading,
    isError: chatIsError,
    error: chatError,
  } = useQuery({
    queryKey: ["chat", id],
    queryFn: () => getChatApi({ id }),
    retry: 2,
  });

  // Extract members with useMemo
  const members = useMemo(() => {
    return ChatData?.data?.chat?.members?.map((m) => m._id) || [];
  }, [ChatData]);

  // Fetch messages by page
  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["messages", id, page],
    queryFn: () => getMessagesApi({ id, page }),
    refetchOnWindowFocus: true,
    staleTime: 10000,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: sendMessageApi,
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: () => {
      if (ChatData?.data?.chat?._id && ChatData?.data?.chat?._id !== id) {
        navigate(`/chats/${ChatData?.data?.chat?._id}`);
      }
    },
  });

  const onChange = (e) => setMessage(e.target.value);
  const onEmojiClick = (emoji) => setMessage((prev) => prev + emoji);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    mutate({ id, message });
    setMessage("");
    messagesContainerRef.current.scrollTop = 0;
  };

  const handleScroll = useCallback(
    (e) => {
      const threshold = 60;
      if (isLoading) return;
      const scrollTop = e.target.scrollTop;

      if (scrollTop < threshold && data?.data?.totalPages >= page) {
        setPage((prev) => prev + 1);
      }
    },
    [isLoading, data?.data?.totalPages, page]
  );

  const focusHandler = () => {
    socket.emit(START_TYPING, { members, id });
  };

  const blurHandler = () => {
    socket.emit(STOP_TYPING, { members, id });
  };

  const newMessagesListener = (data) => {
    if (data.chatId !== id) return;
    setMessages((prev) => [data?.message, ...prev]);
  };

  const startTypingListener = (data) => {
    if (data.chatId === id) setUserTyping(true);
  };

  const stopTypingListener = (data) => {
    if (data.chatId === id) setUserTyping(false);
  };

  useSocketEvents(socket, {
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  });

  // Load messages into state
  useEffect(() => {
    if (isSuccess && Array.isArray(data?.data?.messages)) {
      setMessages((prev) => {
        const existing = new Set(prev.map((m) => m._id));
        const newMessages = data.data.messages.filter(
          (m) => !existing.has(m._id)
        );
        return [...prev, ...newMessages];
      });
    }
  }, [isSuccess, data]);

  // Reset state on unmount
  useEffect(() => {
    return () => {
      setMessages([]);
      setMessage("");
      setPage(1);
    };
  }, []);

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
      {/* Top Bar */}
      {ChatData?.data?.isGroupChat ? (
        <GroupChatButton data={{ groupName: ChatData?.data?.groupName }} />
      ) : (
        <ChatUserButton data={ChatData?.data?.user} />
      )}

      {/* Message Container */}
      <div
        ref={messagesContainerRef}
        className="flex flex-col-reverse gap-2 h-full overflow-y-auto p-4
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-bg
        [&::-webkit-scrollbar-thumb]:bg-surface"
        onScroll={handleScroll}
      >
        {messages?.map((item) => (
          <Message
            key={item._id}
            data={item}
            isGroupChat={ChatData?.data?.isGroupChat}
          />
        ))}

        {isLoading && <MessageSkeleton count={1} />}

        {messages.length === 0 && !isLoading && (
          <span className="text-sm font-medium italic text-text/50 w-full text-center">
            No Chats
          </span>
        )}
      </div>

      {/* Typing indicator */}
      {userTyping && (
        <span className="italic text-sm text-text/50 animate-pulse">
          typing...
        </span>
      )}

      {/* Input Field */}
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
