import React from "react";
import ChatListButton from "../../components/buttons/ChatListButton";

const Chats = () => {
  return (
    <div className="flex flex-col gap-2 w-full h-full p-4">
      <ChatListButton />
      <ChatListButton />
      <ChatListButton />
      <ChatListButton />
      <ChatListButton />
      <ChatListButton />
      <ChatListButton />
      <ChatListButton />
    </div>
  );
};

export default Chats;
