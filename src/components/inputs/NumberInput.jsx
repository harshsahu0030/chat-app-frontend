import React from "react";

const NumberInput = ({
  label,
  value,
  onChange,
  id,
  name,
  placeholder,
  error,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id || ""} className="text-xs font-medium">
        {label}
      </label>
      <input
        id={id || ""}
        name={name || ""}
        type="number"
        value={value || ""}
        placeholder={placeholder || ""}
        onChange={onChange || ""}
        className="bg-surface text-sm w-full p-2 rounded-md outline-none border border-transparent focus:border-primary"
      />
      {!!error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default NumberInput;
2;
