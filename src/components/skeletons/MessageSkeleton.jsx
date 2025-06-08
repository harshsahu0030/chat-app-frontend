import React from "react";

const MessageSkeleton = ({ count = 1 }) => {
  return Array(count)
    .fill(null)
    .map((_, index) => (
      <div
        key={index}
        className="flex flex-col gap-2 w-[80%] p-4 rounded-lg bg-surface animate-pulse"
      >
        <div className="h-2 bg-bg w-full"></div>
        <div className="h-2 bg-bg w-full"></div>
        <div className="h-2 bg-bg w-1/6 self-end"></div>
      </div>
    ));
};

export default MessageSkeleton;
