import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Alert,
  Card,
  Col,
  Dropdown,
  Form,
  Nav,
  Navbar,
  Pagination,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import PageHeadin from "../components/PageHeading";
import TableListUser from "../components/TableListUser.jsx";
import { getALlUsers, disableUser, enableUser } from "../api/user.api.js";
import useHttp from "../hooks/useHttp.js";

const sortOptions = [
  {
    name: "Ngày tạo mới nhất",
    param: "createdAt",
    order: "desc",
  },
  {
    name: "Ngày tạo cũ nhất",
    param: "updatedAt",
    order: "asc",
  },
  {
    name: "Email từ A-Z",
    param: "email",
    order: "asc",
  },
  {
    name: "Email từ Z-A",
    param: "email",
    order: "desc",
  },
  {
    name: "Ngày cập nhật mới nhất",
    param: "updatedAt",
    order: "desc",
  },
  {
    name: "Ngày cập nhật cũ nhất",
    param: "updatedAt",
    order: "asc",
  },
];
const statusOptions = [
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

export default function ListUser() {
  const [pageNum, setPageNum] = useState(0);
  const [totalPage, setTotalPage] = useState(4);
  const [sortBy, setSortBy] = useState({
    name: "Sắp xếp",
    param: "",
    order: "",
  });
  const [search, setSearch] = useState("");
  const [isEnable, setIsEnable] = useState({
    name: "Trạng thái",
    param: "",
  });
  const [users, setUsers] = useState({
    data: [],
    totalElements: 0,
    totalPage: 0,
  });

  const { data, isLoading, sendRequest } = useHttp(getALlUsers, {
    data: [],
    totalElements: 0,
    totalPage: 0,
  });

  const {
    data: disableData,
    isLoading: disableLoading,
    sendRequest: sendDisableRequest,
  } = useHttp(disableUser, {
    data: [],
  });

  const {
    data: enableData,
    isLoading: enableLoading,
    sendRequest: sendEnableRequest,
  } = useHttp(enableUser, {
    data: [],
  });

  const params = useMemo(() => {
    const queryParams = new URLSearchParams();
    if (isEnable.param) queryParams.append("isEnable", isEnable.param);
    if (sortBy.param) queryParams.append("sortBy", sortBy.param);
    if (sortBy.order) queryParams.append("order", sortBy.order);
    if (search) queryParams.append("search", search);
    return `?${queryParams.toString()}`;
  }, [sortBy, search, isEnable]);

  const handleChangePage = useCallback((data) => {
    setPageNum(data.selected);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      await sendRequest({ pageNum, params });
    };
    fetchUsers();
  }, [pageNum, params]);

  useEffect(() => {
    if (data) {
      setUsers(data);
      setTotalPage(data.totalPage);
    }
  }, [data]);

  useEffect(() => {
    setUsers((pre) => {
      return {
        ...pre,
        data: pre.data.map((item) => {
          if (item.email === disableData) {
            return { ...item, enable: false };
          }
          return item;
        }),
      };
    });
  }, [disableData]);

  useEffect(() => {
    setUsers((pre) => {
      return {
        ...pre,
        data: pre.data.map((item) => {
          if (item.email === enableData) {
            return { ...item, enable: true };
          }
          return item;
        }),
      };
    });
  }, [enableData]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchValue = form[0].value;
    setSearch(searchValue);
  };

  const handleDisableUser = (user) => {
    sendDisableRequest({ email: user.email });
  };

  const handleEnableUser = (user) => {
    sendEnableRequest({ email: user.email });
  };

  return (
    <>
      <PageHeadin heading={"Danh sách người dùng"} />
      <Row>
        {/* <Col md={12} xs={12}> */}
        <Card>
          <Card.Header className="bg-white py-4">
            <h4 className="mb-0">Danh sách người dùng</h4>
          </Card.Header>
          <Navbar
            expand="lg"
            className="navbar-classic navbar navbar-expand-lg"
          >
            <div className="d-flex justify-content-between w-100">
              <div className="d-flex align-items-center">
                <div className="ms-lg-3 d-none d-md-none d-lg-block">
                  <Form
                    className="d-flex align-items-center"
                    onSubmit={(e) => handleSearch(e)}
                  >
                    <Form.Control
                      type="search"
                      placeholder="Tìm kiếm theo email"
                    />
                  </Form>
                </div>
              </div>
              <Nav className="navbar-right-wrap ms-2 d-flex nav-top-wrap px-2">
                <Dropdown className="px-2">
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {isEnable.name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {statusOptions.map((option) => (
                      <Dropdown.Item
                        key={option.name}
                        onClick={() => {
                          setIsEnable(option);
                        }}
                      >
                        {option.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {sortBy.name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {sortOptions.map((option) => (
                      <Dropdown.Item
                        key={option.name}
                        onClick={() => {
                          setSortBy(option);
                        }}
                      >
                        {option.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </div>
          </Navbar>
          {users.data.length === 0 && (
            <Alert variant="danger">
              Không tìm thấy người dùng nào phù hợp
            </Alert>
          )}
          <TableListUser
            loader={isLoading}
            users={users}
            handleDisableUser={handleDisableUser}
            handleEnableUser={handleEnableUser}
          />
          <Pagination className="justify-content-center">
            <ReactPaginate
              previousLabel={"«"}
              nextLabel={"»"}
              breakLabel={"..."}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              pageCount={totalPage}
              marginPagesDisplayed={3}
              pageRangeDisplayed={5}
              onPageChange={handleChangePage}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </Pagination>
        </Card>
        {/* </Col> */}
      </Row>
    </>
  );
}
