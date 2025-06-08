import React from "react";

const NavigateBoxSkeleton = ({ count = 1 }) => {
  return Array(count)
    .fill(null)
    .map((_, index) => (
      <div
        key={index}
        className="flex gap-2 items-center p-2 rounded-lg bg-surface animate-pulse"
      >
        <svg
          className="w-10 h-10 me-3 text-bg"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>

        <div className="flex flex-col gap-1 w-full">
          <div className="h-2 bg-bg w-full"></div>
          <div className="h-2 bg-bg w-1/3"></div>
        </div>
      </div>
    ));
};

export default NavigateBoxSkeleton;
