import {v4 as uuid} from "uuid";

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
        title: "Yêu cầu xác minh",
        icon: "shield",
        link: "./verify",
    },
    {
        id: uuid(),
        title: "Báo cáo của người dùng",
        icon: "file-text",
        link: "./report",
    },
    {
        id: uuid(),
        title: "Danh sách bài đăng thuê trọ",
        icon: "clipboard",
        link: "./rental-post-list",
    },
    {
        id: uuid(),
        title: "Danh sách khu trọ",
        icon: "home",
        link: "./apartment-list",
    },
    {
        id: uuid(),
        title: "Danh sách loại phòng",
        icon: "layout",
        link: "./room-type-list",
    },
    {
        id: uuid(),
        title: "Danh sách phòng",
        icon: "inbox",
        link: "./room-list",
    },
    {
        id: uuid(),
        title: "Components",
        icon: "monitor",
        children: [
            {id: uuid(), link: "/components/accordions", name: "Accordions"},
        ],
    },
];
export default DashboardMenu;