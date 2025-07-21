import React from "react";

const TextArea = ({ label, value, onChange, id, name, placeholder, error }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id || ""} className="text-xs font-medium">
        {label}
      </label>
      <textarea
        rows={3}
        id={id || ""}
        name={name || ""}
        type="text"
        value={value || ""}
        placeholder={placeholder || ""}
        onChange={onChange || ""}
        className="bg-surface resize-none text-sm w-full p-2 rounded-md outline-none border border-transparent focus:border-primary"
      />
      {!!error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default TextArea;
