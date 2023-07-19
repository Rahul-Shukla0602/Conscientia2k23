import { ACCOUNT_TYPE } from "../utils/constant";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/Organizer",
    type: ACCOUNT_TYPE.ORGANIZER,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Events",
    path: "/dashboard/my-event",
    type: ACCOUNT_TYPE.ORGANIZER,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-event",
    type: ACCOUNT_TYPE.ORGANIZER,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Registered Event",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.PARTICIPANT,
    icon: "VscMortarBoard",
  },
  {
    id: 6,
    name: "Purchase History",
    path: "/dashboard/purchase-history",
    type: ACCOUNT_TYPE.PARTICIPANT,
    icon: "VscHistory",
  },
  {
    id: 7,
    name: "Your Cart",
    path: "/dashboard/cart",
    type: ACCOUNT_TYPE.PARTICIPANT,
    icon: "VscHistory",
  },
];
