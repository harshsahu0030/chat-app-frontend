import React from "react";
import ChatUserButton from "../../components/buttons/ChatUserButton";
import Message from "../../components/messageBox/Message";

const Chat = () => {
  return (
    <section className="h-full w-full rounded-md flex flex-col gap-2 bg-surface">
      {/* top */}
      <ChatUserButton />

      {/* center  */}
      <div className="h-full w-full bg-bg overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-bg [&::-webkit-scrollbar-thumb]:bg-surface p-2 flex flex-col gap-2">
        <Message />
        <Message />
        <Message />
      </div>

      {/* botton  */}
      <div></div>
    </section>
  );
};

export default Chat;
