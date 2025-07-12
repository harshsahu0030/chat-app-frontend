import { IoCall, IoHomeOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { IoPeopleSharp } from "react-icons/io5";
import { FaBlog } from "react-icons/fa";
import { IoHelpCircle } from "react-icons/io5";
import { MdGroup, MdOutlineGroupAdd, MdPrivacyTip } from "react-icons/md";
import { IoIosInformationCircle } from "react-icons/io";
import { VscDebugBreakpointConditional } from "react-icons/vsc";

export const authenticationLinks = [
  {
    label: "about",
    url: "/about",
    icon: IoIosInformationCircle,
  },
  {
    label: "contact",
    url: "/contact",
    icon: IoCall,
  },
  {
    label: "blog",
    url: "/blog",
    icon: FaBlog,
  },
  {
    label: "help",
    url: "/help",
    icon: IoHelpCircle,
  },
  {
    label: "privacy",
    url: "/privacy",
    icon: MdPrivacyTip,
  },
  {
    label: "terms",
    url: "/terms",
    icon: VscDebugBreakpointConditional,
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
    url: "/users",
    icon: IoSearchOutline,
    activeIcon: IoSearchSharp,
  },
  {
    label: "groups",
    url: "/groups",
    icon: MdOutlineGroupAdd,
    activeIcon: MdGroup,
  },
  {
    label: "friends",
    url: "/friends",
    icon: IoPeopleOutline,
    activeIcon: IoPeopleSharp,
  },
];

export const navigateButtonLinks = [
  {
    label: "home",
    url: "/",
    icon: IoHome,
  },
  {
    label: "search",
    url: "/users",
    icon: IoSearchSharp,
  },
  {
    label: "groups",
    url: "/groups",
    icon: MdOutlineGroupAdd,
  },

  {
    label: "friends",
    url: "/friends",
    icon: IoPeopleSharp,
  },
];
