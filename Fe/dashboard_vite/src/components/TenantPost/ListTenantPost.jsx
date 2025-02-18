import {useCallback, useEffect, useMemo, useState} from "react";
import useHttp from "../../hooks/useHttp.js";
import {disableTenantPost, enableTenantPost, getAllTenantPost} from "../../api/tenantPost.api.js";
import {useNavigate, useParams} from "react-router-dom";
import {Card, Dropdown, Form, Nav, Navbar, Pagination, Row} from "react-bootstrap";
import TenantPostTable from "./TenantPostTable.jsx";
import ReactPaginate from "react-paginate";
import PageHeadin from "../../components/PageHeading.jsx";
import {toast} from "react-toastify";

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
        name: "Title từ A-Z",
        param: "email",
        order: "asc",
    },
    {
        name: "Title từ Z-A",
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
        name: "Bị ẩn",
        param: "false",
    },
    {
        name: "Tất cả",
        param: "",
    },
];

function ListTenantPost() {

    const {id: userId} = useParams();

    const [page, setPage] = useState({
        pageNum: 0,
        totalPage: 1,
    })
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

    const [TenantPosts, setTenantPosts] = useState({
        data: [],
        totalElements: 0,
        totalPage: 0,
    });

    const {data, isLoading, sendRequest} = useHttp(getAllTenantPost, {
        data: [],
        totalElements: 0,
        totalPage: 0,
    });

    const {
        data: disableData,
        isLoading: disableLoading,
        sendRequest: sendDisableRequest,
    } = useHttp(disableTenantPost, {
        data: [],
    });

    const {
        data: enableData,
        isLoading: enableLoading,
        sendRequest: sendEnableRequest,
    } = useHttp(enableTenantPost, {
        data: [],
    });

    const params = useMemo(() => {
        const queryParams = new URLSearchParams();
        if (userId) queryParams.append("userId", userId);
        if (isEnable.param) queryParams.append("isAvailable", isEnable.param);
        if (sortBy.param) queryParams.append("sortBy", sortBy.param);
        if (sortBy.order) queryParams.append("order", sortBy.order);
        if (search) queryParams.append("search", search);
        return `?${queryParams.toString()}`;
    }, [sortBy, search, isEnable]);

    const handleChangePage = useCallback((data) => {
        setPage(prevState => {
            return {
                ...prevState,
                pageNum: data.selected
            }
        });
    }, []);

    useEffect(() => {
        const fetchTenantPosts = async () => {
            await sendRequest({pageNum: page.pageNum, params});
        };
        fetchTenantPosts();
    }, [page.pageNum, params]);

    useEffect(() => {
        if (data) {
            setTenantPosts(data);
            setPage((pre) => {
                return {
                    ...pre,
                    totalPage: data.totalPage,
                }
            })
        }
    }, [data]);

    useEffect(() => {
        setTenantPosts((pre) => {
            return {
                ...pre,
                data: pre.data.map((item) => {
                    if (item.email === disableData) {
                        return {...item, enable: false};
                    }
                    return item;
                }),
            };
        });
    }, [disableData]);

    useEffect(() => {
        setTenantPosts((pre) => {
            return {
                ...pre,
                data: pre.data.map((item) => {
                    if (item.email === enableData) {
                        return {...item, enable: true};
                    }
                    return item;
                }),
            };
        });
    }, [enableData]);

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const searchValue = form[0].value;
        setSearch(searchValue);
    };

    const handleDisableTenantPost = (TenantPost) => {

        sendDisableRequest({id: TenantPost.tenantPostId});
        toast.success("Đã ẩn bài đăng thành công");
        setTenantPosts((pre) => {
            return {
                ...pre,
                data: pre.data.map((item) => {
                    if (item.tenantPostId === TenantPost.tenantPostId) {
                        return {...item, isAvailable: false};
                    }
                    return item;
                }),
            };
        })


    };

    const handleEnableTenantPost = (TenantPost) => {
        sendEnableRequest({id: TenantPost.tenantPostId});
        toast.success("Đã hiện bài đăng thành công");
        setTenantPosts((pre) => {
            return {
                ...pre,
                data: pre.data.map((item) => {
                    if (item.tenantPostId === TenantPost.tenantPostId) {
                        return {...item, isAvailable: true};
                    }
                    return item;
                }),
            };
        })
    };

    const handleViewDetails = (tenantPostId) => {
        navigate(`/dashboard/tenant-post-list/${tenantPostId}`);
    }

    const handleSort = (option) => {
        setSortBy(option);
    }

    const handleStatus = (option) => {
        setIsEnable(option);
    }

    return (
        <>
            <PageHeadin heading={"Bài đăng tìm phòng"}/>
            <Row className="px-2">
                <Card>
                    <Card.Header className="bg-white py-4">
                        <h4 className="mb-0">{`Danh sách loại bài đăng thuê trọ`}</h4>
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
                                            placeholder="Tìm kiếm..."
                                        />
                                    </Form>
                                </div>
                            </div>
                            <Nav className="navbar-right-wrap ms-2 d-flex nav-top-wrap px-2">
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        {sortBy.name}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {sortOptions.map((option) => (
                                            <Dropdown.Item
                                                key={option.name}
                                                onClick={() => {
                                                    handleSort(option);
                                                }}
                                            >
                                                {option.name}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown className="px-2">
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        {isEnable.name}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {statusOptions.map((option) => (
                                            <Dropdown.Item
                                                key={option.name}
                                                onClick={() => {
                                                    handleStatus(option);
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
                    < TenantPostTable
                        TenantPosts={TenantPosts.data}
                        handleViewDetails={handleViewDetails}
                        handleDisableTenantPost={handleDisableTenantPost}
                        handleEnableTenantPost={handleEnableTenantPost}
                    />
                    <Pagination className="justify-content-center">
                        <ReactPaginate
                            previousLabel={"«"}
                            nextLabel={"»"}
                            breakLabel={"..."}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            pageCount={page.totalPage}
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
                            activeClassName={"active"} // Change this line
                        />
                    </Pagination>
                </Card>
                {/* </Col> */}
            </Row>
        </>
    );
}

export default ListTenantPost;