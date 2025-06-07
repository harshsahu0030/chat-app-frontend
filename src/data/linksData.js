import { IoHomeOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoChatbubbles } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { IoPeopleSharp } from "react-icons/io5";

export const authenticationLinks = [
  {
    label: "about",
    url: "/about",
  },
  {
    label: "contact",
    url: "/contact",
  },
  {
    label: "blog",
    url: "/blog",
  },
  {
    label: "help",
    url: "/help",
  },
  {
    label: "privacy",
    url: "/privacy",
  },
  {
    label: "terms",
    url: "/terms",
  },
];

export const Navbarlinks = [
  {
    label: "home",
    url: "/",
    icon: IoHomeOutline,
    activeIcon: IoHome,
  },
  {
    label: "search",
    url: "/search",
    icon: IoSearchOutline,
    activeIcon: IoSearchSharp,
  },
  {
    label: "chats",
    url: "/chats",
    icon: IoChatbubblesOutline,
    activeIcon: IoChatbubbles,
  },
  {
    label: "notifications",
    url: "/notifications",
    icon: IoNotificationsOutline,
    activeIcon: IoNotificationsSharp,
  },
  {
    label: "friends",
    url: "/friends",
    icon: IoPeopleOutline,
    activeIcon: IoPeopleSharp,
  },
];
