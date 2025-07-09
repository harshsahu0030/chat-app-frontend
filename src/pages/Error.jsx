import React from "react";
import FunctionButton from "../components/buttons/FunctionButton";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="h-screen w-full bg-bg flex justify-center items-center flex-col gap-5">
      <h1 className="text-7xl font-semibold text-text">404 Error</h1>
      <FunctionButton label="Back To Home" clickHandler={handleClick} />
    </div>
  );
};

export default Error;
