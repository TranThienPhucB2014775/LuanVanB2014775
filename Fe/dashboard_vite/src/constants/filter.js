export const statusOptions = [
    {
        name: "Bình thường",
        param: "true",
    },
    {
        name: "Bị khóa",
        param: "false",
    },
    {
        name: "Tất cả",
        param: "",
    },
];

export const sortOptions = [
    {name: "Mới nhất", param: "createdAt", order: "desc"},
    {name: "Cũ nhất", param: "updatedAt", order: "asc"},
    {name: "Tên từ A-Z", param: "email", order: "asc"},
    {name: "Tên từ Z-A", param: "email", order: "desc"},
    {name: "Cập nhật mới nhất", param: "updatedAt", order: "desc"},
    {name: "Cập nhật cũ nhất", param: "updatedAt", order: "asc"},
];