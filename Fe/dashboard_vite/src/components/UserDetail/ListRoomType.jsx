import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router-dom";
import useHttp from "../../hooks/useHttp.js";
import {getALlApartment} from "../../api/apartment.api.js";
import PageHeadin from "../PageHeading.jsx";
import {Card, Dropdown, Form, Nav, Navbar, Pagination, Row} from "react-bootstrap";
import {statusOptions} from "../../constants/filter.js";
import TableApartment from "./TableApartment.jsx";
import ReactPaginate from "react-paginate";
import * as apartmentTypeOptions from "react-bootstrap/ElementChildren";
import TableRoomType from "./TableRoomType.jsx";
import {getALlRoomType} from "../../api/roomType.api.js";
import RoomTypeDetail from "../ApartmentDetail.jsx";
import ApartmentDetail from "../ApartmentDetail.jsx";

const sortOptions = [
    {
        name: "Mới nhất",
        param: "createdAt",
        order: "desc",
    },
    {
        name: "Cũ nhất",
        param: "updatedAt",
        order: "asc",
    },
    {
        name: "Tên từ A-Z",
        param: "name",
        order: "asc",
    },
    {
        name: "Tên từ Z-A",
        param: "name",
        order: "desc",
    },
    {
        name: "Cập nhật mới nhất",
        param: "updatedAt",
        order: "desc",
    },
    {
        name: "Cập nhật cũ nhất",
        param: "updatedAt",
        order: "asc",
    },
];

function ListRoomType() {

    const {apartmentId} = useParams();

    const {id} = useParams();

    const [page, setPage] = useState({
        pageNum: 0,
        totalPage: 1,
    })
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState({
        name: "Sắp xếp",
        param: "",
        order: "",
    });
    const [isEnable, setIsEnable] = useState({
        name: "Trạng thái",
        param: "",
    });

    const {data, isLoading, sendRequest} = useHttp(getALlRoomType, {
        data: [],
        totalElements: 0,
        totalPage: 0,
    });

    const params = useMemo(() => {
        const queryParams = new URLSearchParams();
        apartmentId && queryParams.append("apartmentId", apartmentId);
        id && queryParams.append("userId", id);
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
        })
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const searchValue = form[0].value;
        setSearch(searchValue);
    };

    const handleSort = (option) => {
        setSortBy(option);
    }

    const handleStatus = (option) => {
        setIsEnable(option);
    }

    useEffect(() => {
        async function fetchUsers() {
            await sendRequest({pageNum: page.pageNum, params});
        }

        setPage(prevState => {
            return {
                ...prevState,
                totalPage: data.totalPage
            }
        })
        fetchUsers();
    }, [page.pageNum, params]);

    useEffect(() => {
        if (data) {
            setPage(prevState => {
                return {
                    ...prevState,
                    totalPage: data.totalPage
                }
            })
        }
    }, [data]);

    return (
        <>
            <PageHeadin heading={apartmentId ? "Thông tin Khu trọ": "Loại phòng trọ"}/>
            {apartmentId && <ApartmentDetail id={apartmentId}/>}
            <Row className="px-2">
                <Card>
                    <Card.Header className="bg-white py-4">
                        <h4 className="mb-0">{`Danh sách loại phòng trọ${apartmentId ? " của khu trọ này" : ""}`}</h4>
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
                    <TableRoomType data={data.data} loader={isLoading}/>
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

export default ListRoomType;