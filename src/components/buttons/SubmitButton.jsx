import React from "react";

const SubmitButton = ({ label, disabled }) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="mt-4 font-semibold text-sm shadow-md shadow-accent bg-accent px-6 py-2 rounded-md cursor-pointer hover:scale-95 transition-all disabled:bg-accent/50 disabled:cursor-not-allowed"
    >
      {disabled ? "loading..." : label}
    </button>
  );
};

export default SubmitButton;
