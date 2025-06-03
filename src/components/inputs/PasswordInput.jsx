import React, { useState } from "react";

const PasswordInput = ({ label, value, onChange, id, name, placeholder }) => {
  const [show, setshow] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-medium">
        {label || ""}
      </label>

      <div className="relative text-sm w-full">
        <input
          id={id || ""}
          name={name || ""}
          type={show ? "text" : "password"}
          value={value || ""}
          placeholder={placeholder || ""}
          onChange={onChange || ""}
          className="bg-surface w-full p-2 rounded-md outline-none border border-transparent focus:border-primary"
        />

        <button
          type="button"
          className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 text-xs font-medium cursor-pointer"
          onClick={() => setshow((prev) => !prev)}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
