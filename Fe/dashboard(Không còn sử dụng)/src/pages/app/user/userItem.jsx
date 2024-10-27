import React from "react";

import UserAction from "./userAction";

function UserItem({ user, i }) {
  return (
    <tr key={user.email}>
      <td className="table-td">{i + 1}</td>
      <td className="table-td">
        <span className="flex">
          <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none">
            <img
              src="https://img.freepik.com/free-photo/abstract-digital-grid-black-background_53876-97647.jpg"
              alt="50"
              className="object-cover w-full h-full rounded-full"
            />
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
            {user.username}
          </span>
        </span>
      </td>
      <td className="table-td ">{user.email}</td>

      <td className="table-td ">{user.createdDate}</td>
      <td className="table-td ">
        <div>0</div>
      </td>
      <td className="table-td ">
        <div>0</div>
      </td>
      <td className="table-td ">
        <span className="block w-full">
          <span
            className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 
            ${user.enable ? "text-success-500 bg-success-500" : ""} 
            ${!user.enable ? "text-warning-500 bg-warning-500" : ""}
        `}>
            {user.enable ? "Đang hoạt động" : "Đã khóa"}
          </span>
        </span>
      </td>
      <UserAction user={user} />
    </tr>
  );
}

export default UserItem;
