import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router-dom";
import PageHeadin from "../PageHeading.jsx";
import {Alert, Card, Dropdown, Form, Nav, Navbar, Pagination, Row} from "react-bootstrap";
import TableListUser from "../user/TableListUser.jsx";
import ReactPaginate from "react-paginate";
import useHttp from "../../hooks/useHttp.js";
import {getALlUsers} from "../../api/user.api.js";
import {getALlApartment} from "../../api/apartment.api.js";
import TableApartment from "../UserDetail/TableApartment.jsx";
import {sortOptions, statusOptions} from "../../constants/filter.js";
import {Paginator} from 'primereact/paginator';
import debounce from 'lodash.debounce';
import {getALlReviewByItemId} from "../../api/review.api.js";
import TableReview from "./TableReview.jsx";
import ListReviewHeader from "./ListReviewHeader.jsx";

function ListReview() {
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

    const {data, isLoading, sendRequest} = useHttp(getALlReviewByItemId, {
        data: [],
        totalElements: 0,
        totalPage: 0,
    });

    const params = useMemo(() => {
        const queryParams = new URLSearchParams();

        if (isEnable.param) queryParams.append("isAvailable", isEnable.param);
        if (sortBy.param) queryParams.append("sortBy", sortBy.param);
        if (sortBy.order) queryParams.append("order", sortBy.order);
        if (search) queryParams.append("search", search);
        queryParams.append("pageSize", 1);
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
            await sendRequest({pageNum: page.pageNum, params, itemId: id});
        }

        // setPage(prevState => {
        //     return {
        //         ...prevState,
        //         totalPage: data.totalPage
        //     }
        // })
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

    console.log(data);

    return (
        <>
            <PageHeadin heading={"Khu trọ"}/>
            <Row>
                <Card>
                    <Card.Header className="bg-white py-4">
                        <h4 className="mb-0">Danh sách đánh giá</h4>
                    </Card.Header>
                    < ListReviewHeader
                        handleSearch={handleSearch}
                        handleSort={handleSort}
                        handleStatus={handleStatus}
                        sortBy={sortBy}
                        isEnable={isEnable}
                    />
                    <TableReview data={data.data} loader={isLoading}/>
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
            </Row>
        </>
    );
}

export default ListReview;