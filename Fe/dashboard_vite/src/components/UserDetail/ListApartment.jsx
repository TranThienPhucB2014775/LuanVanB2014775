import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router-dom";
import PageHeadin from "../PageHeading.jsx";
import {Alert, Card, Dropdown, Form, Nav, Navbar, Pagination, Row} from "react-bootstrap";
import TableListUser from "../user/TableListUser.jsx";
import ReactPaginate from "react-paginate";
import useHttp from "../../hooks/useHttp.js";
import {getALlUsers} from "../../api/user.api.js";
import {getALlApartment} from "../../api/apartment.api.js";
import TableApartment from "./TableApartment.jsx";
import {statusOptions} from "../../constants/filter.js";

import {Paginator} from 'primereact/paginator';

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
        param: "email",
        order: "asc",
    },
    {
        name: "Tên từ Z-A",
        param: "email",
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

const apartmentTypeOptions = [
    {
        value: "APARTMENT",
        name: "Căn hộ"
    },
    {
        value: "HOUSE",
        name: "Nhà riêng"
    },
    {
        value: "STUDIO",
        name: "Studio"
    },
    {
        value: "DORMITORY",
        name: "Ký túc xá"
    },
    {
        value: "ROOM",
        name: "Phòng trọ"
    },
    {
        value: "",
        name: "Tất cả"
    }
]

function ListApartment() {

    const {id} = useParams();

    const [page, setPage] = useState({
        pageNum: 0,
        totalPage: 1,
        totalElements: 0,
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

    const [apartmentType, setApartmentType] = useState({
        name: "Loại khu trọ",
        value: ""
    })

    const {data, isLoading, sendRequest} = useHttp(getALlApartment, {
        data: [],
        totalElements: 0,
        totalPage: 0,
    });

    const params = useMemo(() => {
        const queryParams = new URLSearchParams();
        id && queryParams.append("userId", id);
        if (isEnable.param) queryParams.append("isAvailable", isEnable.param);
        if (sortBy.param) queryParams.append("sortBy", sortBy.param);
        if (sortBy.order) queryParams.append("order", sortBy.order);
        if (apartmentType.value) queryParams.append("apartmentType", apartmentType.value);
        if (search) queryParams.append("search", search);
        return `?${queryParams.toString()}`;
    }, [sortBy, search, isEnable, apartmentType]);

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

    const handleApartmentType = (option) => {
        setApartmentType(option);
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
                    totalPage: data.totalPage,
                    totalElements: data.totalElement
                }
            })
        }
    }, [data]);

    return (
        <>
            <PageHeadin heading={"Khu trọ"}/>
            <Row>
                <Card>
                    <Card.Header className="bg-white py-4">
                        <h4 className="mb-0">Danh sách khu trọ</h4>
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
                                        {apartmentType.name}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {apartmentTypeOptions.map((option) => (
                                            <Dropdown.Item
                                                key={option.name}
                                                onClick={() => {
                                                    handleApartmentType(option);
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
                    <TableApartment data={data.data} loader={isLoading}/>
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
                            activeClassName={"active"}
                        />
                    </Pagination>
                </Card>
                {/* </Col> */}
            </Row>
        </>
    );
}

export default ListApartment;