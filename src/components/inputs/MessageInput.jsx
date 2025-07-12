import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { MdOutlineAttachFile } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const MessageInput = ({
  submitHandler,
  onChange,
  message,
  disabled,
  focusHandler,
  blurHandler,
  onEmojiClick,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  return (
    <div className="w-full flex flex-col">
      <form
        className="flex w-full items-center gap-2 p-2 bg-surface rounded-md"
        onSubmit={submitHandler}
      >
        <MdOutlineAttachFile className="text-xl rotate-45 text-text/70 cursor-pointer transition-all hover:text-text" />
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-xl rotate-45 text-text/70 cursor-pointer transition-all hover:text-text"
        >
          <MdOutlineEmojiEmotions />
        </button>
        <textarea
          onBlur={blurHandler}
          onFocus={focusHandler}
          rows={1}
          id={"message-btn"}
          name={"message"}
          type="text"
          value={message}
          placeholder={"Enter Message"}
          onChange={onChange}
          disabled={disabled}
          className="bg-bg text-sm w-full p-2 rounded-md outline-none border border-transparent focus:border-primary resize-none overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-bg [&::-webkit-scrollbar-thumb]:bg-surface disabled:bg-surface/50 disabled:cursor-not-allowed"
        />
        <button
          disabled={disabled}
          type="submit"
          className="font-semibold text-sm bg-accent px-6 py-2 rounded-md cursor-pointer hover:scale-95 transition-all disabled:bg-accent/50 disabled:cursor-not-allowed"
        >
          <IoSend />
        </button>
      </form>
      {showEmojiPicker && (
        <div className="absolute z-10 bottom-0">
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              onEmojiClick(emojiData.emoji);
              setShowEmojiPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MessageInput;
