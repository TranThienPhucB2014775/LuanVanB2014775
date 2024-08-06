import { v4 as uuid } from "uuid";

export const DashboardMenu = [
  {
    id: uuid(),
    title: "Dashboard",
    icon: "home",
    link: "/dashboard",
  },
  {
    id: uuid(),
    title: "Danh sách người dùng",
    icon: "user",
    link: "./user-list",
  },
  {
    id: uuid(),
    title: "Components",
    icon: "monitor",
    children: [
      { id: uuid(), link: "/components/accordions", name: "Accordions" },
    ],
  },
];

export default DashboardMenu;
