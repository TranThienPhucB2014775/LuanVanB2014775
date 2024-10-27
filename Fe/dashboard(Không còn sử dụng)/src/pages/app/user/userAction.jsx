import React from "react";
import {
  useDisableUserMutation,
  useEnableUserMutation,
  useListUserMutation,
} from "@/store/api/user/userApiSlice.js";
import { useNavigate } from "react-router-dom";

import Icon from "@/components/ui/Icon.jsx";

function UserAction({ user }) {
  const navigate = useNavigate();

  const [
    disableUser,
    {
      isLoading: isDisabling,
      isError: disableError,
      isSuccess: disableSuccess,
    },
  ] = useDisableUserMutation();
  const [
    enableUser,
    { isLoading: isEnabling, isError: enableError, isSuccess: enableSuccess },
  ] = useEnableUserMutation();

  const actions = [
    {
      name: "Thông Tin",
      icon: "heroicons-outline:eye",
      doit: (userInfo) => {
        navigate(`/profile/${userInfo.email}`);
      },
    },
    {
      name: "Disable",
      icon: "heroicons-outline:trash",
      doit: (userInfo) => {
        console.log(userInfo.email);
        disableUser({ token: token, email: userInfo.email });
        return null;
      },
    },
    {
      name: "Enable",
      icon: "heroicons-outline:arrow-right-circle",
      doit: (userInfo) => {
        console.log(userInfo.email);
        enableUser({ token: token, email: userInfo.email });
        return null;
      },
    },
  ];

  return (
    <td className="table-td ">
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {actions.map((item, i) => {
          if (item.name === "Disable" && !user.enable) {
            return <></>;
          }
          if (item.name === "Enable" && user.enable) {
            return <></>;
          }

          return (
            <div
              key={i}
              onClick={() => item.doit(user)}
              className={`bg-success-500 hover:bg-opacity-100 hover:text-white
                       hover:opacity-70 dark:hover:bg-slate-600 dark:hover:bg-opacity-50
                      w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm last:mb-0 cursor-pointer 
                       first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse 
                       ${
                         item.name === "Disable"
                           ? "bg-warning-500 hover:bg-opacity-100"
                           : "bg-opacity-30"
                       }
                       `}>
              <span className="text-base">
                <Icon icon={item.icon} />
              </span>
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
    </td>
  );
}

export default UserAction;
