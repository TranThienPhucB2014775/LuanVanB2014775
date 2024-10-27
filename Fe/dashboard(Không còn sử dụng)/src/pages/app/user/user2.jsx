import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";

import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";

import { useNavigate } from "react-router-dom";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "../../table/react-tables/GlobalFilter";

import {
  useListUserMutation,
  useDisableUserMutation,
  useEnableUserMutation,
} from "@/store/api/user/userApiSlice.js";

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

const InvoicePage = () => {
  const navigate = useNavigate();

  // const [
  //   disableUser,
  //   {
  //     isLoading: isDisabling,
  //     isError: disableError,
  //     isSuccess: disableSuccess,
  //   },
  // ] = useDisableUserMutation();
  //
  // const [
  //   enableUser,
  //   { isLoading: isEnabling, isError: enableError, isSuccess: enableSuccess },
  // ] = useEnableUserMutation();

  const actions = [
    {
      name: "Thông Tin",
      icon: "heroicons-outline:eye",
      doit: (userInfo) => {
        navigate(`/profile/${userInfo.email}`);
      },
    },
    // {
    //   name: "Disable",
    //   icon: "heroicons-outline:trash",
    //   doit: async (userInfo) => {
    //     console.log(userInfo.email);
    //     !isDisabling &&
    //       (await disableUser({ token: token, email: userInfo.email }));
    //     updateEnableByEmail(userInfo.email);
    //     return null;
    //   },
    // },
    // {
    //   name: "Enable",
    //   icon: "heroicons-outline:arrow-right-circle",
    //   doit: async (userInfo) => {
    //     console.log(userInfo.email);
    //     !isEnabling &&
    //       (await enableUser({ token: token, email: userInfo.email }));
    //     updateEnableByEmail(userInfo.email);
    //     return null;
    //   },
    // },
  ];

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
                  src={row?.row.original?.urlImgAvatar}
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
              //   if (item.name === "Disable" && !row?.row.original.enable) {
              //     return <></>;
              //   }
              //   if (item.name === "Enable" && row?.row.original.enable) {
              //     return <></>;
              //   }

              return (
                <div
                  key={i}
                  onClick={() => item.doit(row.row.original)}
                  className={`bg-success-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white
                                                     hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-50
                                                    w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
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
        );
      },
    },
  ];

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

  const updateEnableByEmail = (email) => {
    setUsers((prevState) => {
      const index = users.data.result.findIndex((user) => user.email === email);
      if (index !== -1) {
        const updatedResult = users;
        updatedResult.data.result[index].enable =
          !updatedResult.data.result[index].enable;
        setUsers(updatedResult);
      }
    });
  };

  async function fetchUsers(page = 1, limit = 10) {
    const res = await listUser(token);
    setUsers(res);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(users);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => users.data.result, [users]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,

    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <Card noborder>
        <div className="md:flex pb-6 items-center">
          <h6 className="flex-1 md:mb-0 mb-3">Invoice</h6>
          <div className="md:flex md:space-x-3 items-center flex-none rtl:space-x-reverse">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <Button
              icon="heroicons-outline:calendar"
              text="Select date"
              className=" btn-outline-secondary dark:border-slate-700  text-slate-600 btn-sm font-normal dark:text-slate-300 "
              iconClass="text-lg"
            />
            <Button
              icon="heroicons-outline:filter"
              text="Filter"
              className=" btn-outline-secondary text-slate-600 dark:border-slate-700 dark:text-slate-300 font-normal btn-sm "
              iconClass="text-lg"
            />
            <Button
              icon="heroicons-outline:plus-sm"
              text="Add Record"
              className=" btn-dark font-normal btn-sm "
              iconClass="text-lg"
              onClick={() => {
                navigate("/invoice-add");
              }}
            />
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}>
                <thead className=" border-t border-slate-100 dark:border-slate-800">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          scope="col"
                          className=" table-th ">
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()} className="table-td">
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <span className=" flex space-x-2  rtl:space-x-reverse items-center">
              <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                Go
              </span>
              <span>
                <input
                  type="number"
                  className=" form-control py-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  style={{ width: "50px" }}
                />
              </span>
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
          </div>
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}>
                <Icon icon="heroicons-outline:chevron-left" />
              </button>
            </li>
            {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={` ${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                  }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}>
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}>
                <Icon icon="heroicons-outline:chevron-right" />
              </button>
            </li>
          </ul>
        </div>
      </Card>
    </>
  );
};

export default InvoicePage;
