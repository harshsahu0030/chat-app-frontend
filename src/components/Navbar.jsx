import React, { createElement } from "react";
import { Navbarlinks } from "../data/linksData";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="h-full w-full">
      <ul className="h-full w-full grid grid-cols-4">
        {Navbarlinks?.map((item, index) => (
          <li
            key={index}
            className="h-full w-full flex justify-center items-center text-2xl xl:text-3xl"
          >
            <NavLink
              to={item?.url}
              className={({ isActive }) =>
                isActive
                  ? "text-primary h-full w-full flex justify-center items-center hover:bg-bg transition-all border-b-4 border-primary"
                  : " h-full w-full flex justify-center items-center rounded-lg hover:bg-bg transition-all border-b-4 border-transparent"
              }
            >
              {location?.pathname === item?.url
                ? createElement(item?.activeIcon)
                : createElement(item?.icon)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
