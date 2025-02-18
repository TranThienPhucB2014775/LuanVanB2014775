import React, { useState, useMemo, useEffect } from "react";
import { advancedTable } from "../../../constant/table-data.js";
import Card from "@/components/ui/Card.jsx";
import Icon from "@/components/ui/Icon.jsx";
import Dropdown from "@/components/ui/Dropdown.jsx";

import { useNavigate } from "react-router-dom";
import { useListUserMutation } from "@/store/api/user/userApiSlice.js";
import { useSelector } from "react-redux";

import UserItem from "./userItem.jsx";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          type="checkbox"
          ref={resolvedRef}
          {...rest}
          className="table-checkbox"
        />
      </>
    );
  }
);

const UsersPage = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [listUser, { isLoading, isError, error, isSuccess }] =
    useListUserMutation();

  const [users, setUsers] = useState({
    data: {
      result: [
        {
          id: null,
          email: null,
          username: null,
          dob: null,
          city: null,
          address: null,
          createdDate: null,
          enable: null,
          urlImgAvatar: null,
        },
      ],
    },
  });

  async function fetchUsers(page = 1, limit = 10) {
    const res = await listUser(token);
    setUsers(res);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(users);

  return (
    <>
      <div className=" space-y-5">
        <div className="card">
          <header className=" card-header noborder">
            <h4 className="card-title">Advanced Table</h4>
          </header>
          <div className="card-body px-6 pb-6">
            <div className="overflow-x-auto -mx-6 dashcode-data-table">
              <span className=" col-span-8  hidden"></span>
              <span className="  col-span-4 hidden"></span>
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden ">
                  <table
                    className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                    id="data-table">
                    <thead className=" border-t border-slate-100 dark:border-slate-800">
                      <tr>
                        <th scope="col" className=" table-th ">
                          STT
                        </th>

                        <th scope="col" className=" table-th ">
                          Tên
                        </th>

                        <th scope="col" className=" table-th ">
                          Email
                        </th>

                        <th scope="col" className=" table-th ">
                          ngày tạo
                        </th>

                        <th scope="col" className=" table-th ">
                          Bài cho thuê trọ
                        </th>

                        <th scope="col" className=" table-th ">
                          Bài tìm trọ
                        </th>

                        <th scope="col" className=" table-th ">
                          trạng thái
                        </th>

                        <th scope="col" className=" table-th ">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                      {users.data.result.map((user, i) => (
                        <UserItem key={i} user={user} i={i} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersPage;

const COLUMNS = [
  {
    Header: "Tên",
    accessor: "username",
    Cell: (row) => {
      if (row?.cell?.value === null) return null;
      return (
        <div>
          <span className="inline-flex items-center">
            <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
              <img
                src={customer1}
                alt=""
                className="object-cover w-full h-full rounded-full"
              />
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {row?.cell?.value}
            </span>
          </span>
        </div>
      );
    },
  },
  {
    Header: "ngày tạo",
    accessor: "createdDate",
    Cell: (row) => {
      if (row?.cell?.value === null) return null;
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Bài cho thuê trọ",
    accessor: "address",
    Cell: (row) => {
      if (row?.cell?.value === null) return null;
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Bài tìm trọ",
    accessor: "city",
    Cell: (row) => {
      if (row?.cell?.value === null) return null;
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "trạng thái",
    accessor: "enable",
    Cell: (row) => {
      if (row?.cell?.value === null) return null;
      return (
        <span className="block w-full">
          <span
            className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 
                          ${
                            row?.cell?.value
                              ? "text-success-500 bg-success-500"
                              : ""
                          } 
                          ${
                            !row?.cell?.value
                              ? "text-warning-500 bg-warning-500"
                              : ""
                          }
                         `}>
            {row?.cell?.value ? "Đang hoạt động" : "Đã khóa"}
          </span>
        </span>
      );
    },
  },
  {
    Header: "action",
    Cell: (row) => {
      // console.log(row.row.original.id)
      if (row?.row.original?.email === null) return null;
      return (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {actions.map((item, i) => {
            return (
              <div
                key={i}
                onClick={() => item.doit(row.row.original)}
                className={`bg-success-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white
                                                   hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-50
                                                  w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                                                   first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse 
                                                   `}>
                <span className="text-base">
                  <Icon icon={item.icon} />
                </span>
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      );
    },
  },
];
