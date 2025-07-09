import React from "react";

const FunctionButton = ({ label, clickHandler, background, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={clickHandler}
      type="button"
      className={`mt-4 font-semibold text-sm px-6 py-2 rounded-md cursor-pointer hover:scale-95 transition-all  disabled:cursor-not-allowed ${
        background
          ? `${background} bg-red-300`
          : "bg-accent disabled:bg-accent/50"
      }`}
    >
      {disabled ? "loading..." : label}
    </button>
  );
};

export default FunctionButton;
