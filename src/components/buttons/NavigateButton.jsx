import React, { createElement } from "react";
import { useNavigate } from "react-router-dom";

const NavigateButton = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex gap-2 items-center p-2 text-xl capitalize font-medium rounded-lg hover:bg-surface transition-all cursor-pointer"
      onClick={() => navigate(data?.url)}
    >
      {data.icon && createElement(data?.icon) }
      {data?.label}
    </div>
  );
};

export default NavigateButton;
