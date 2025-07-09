import React from "react";
import LOGO from "/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { IoMenu } from "react-icons/io5";
import { IoPersonCircle } from "react-icons/io5";
import { useSelector } from "react-redux";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="h-full w-full overflow-hidden border-b border-surface grid grid-cols-12 gap-5">
      {/* left  */}
      <div className="h-full flex items-center col-span-4 sm:col-span-3">
        <img
          loading="lazy"
          src={LOGO}
          alt="logo"
          className="h-[7vh] md:h-[4vh] xl:h-[7vh] w-fit object-contain cursor-pointer hover:scale-95 transition-all hover:drop-shadow-lg hover:drop-shadow-secondary"
          onClick={() => navigate("/")}
        />
      </div>

      {isAuthenticated && (
        <>
          {/* center  */}
          <div className="h-full w-full items-center hidden sm:flex sm:col-span-6">
            <Navbar />
          </div>

          {/* right  */}
          <div className="h-full w-full flex items-center col-span-8 sm:col-span-3 justify-end text-2xl xl:text-3xl">
            <Link
              to={`/users/${user?._id}`}
              className="p-2 rounded-full flex justify-center items-center hover:bg-bg transition-all"
            >
              <IoPersonCircle />
            </Link>
            <Link
              to="/bookmarks"
              className="p-2 rounded-full flex justify-center items-center hover:bg-bg transition-all"
            >
              <IoMenu />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
