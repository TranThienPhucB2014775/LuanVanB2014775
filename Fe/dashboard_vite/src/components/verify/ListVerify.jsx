import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router-dom";
import useHttp from "../../hooks/useHttp.js";
import {getAllVerifications} from "../../api/verification.api.js";
import PageHeadin from "../PageHeading.jsx";
import {Card, Container, Pagination, Row, Spinner} from "react-bootstrap";
import VerifyHeader from "./verifyHeader.jsx";
import {UserCard} from "./UserCard.jsx";
import ReactPaginate from "react-paginate";

function ListVerify() {
    const [page, setPage] = useState({
        pageNum: 0,
        totalPage: 1,
        totalElements: 0,
    });
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState({
        name: "Sắp xếp",
        param: "",
        order: "",
    });
    const [isEnable, setIsEnable] = useState({
        name: "Trạng thái",
        param: "",
    });
    const [isChecked, setIsChecked] = useState({
        name: "Chưa kiêm tra",
        param: "false",
    });
    const [isSuccessful, setIsSuccessful] = useState({
        name: "Trạng thái",
        param: "",
    });

    const {data, isLoading, sendRequest} = useHttp(getAllVerifications, {
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
        if (isChecked.param) queryParams.append("isChecked", isChecked.param);
        if (isSuccessful.param) queryParams.append("isSuccessful", isSuccessful.param);
        queryParams.append("pageSize", 1);
        return `?${queryParams.toString()}`;
    }, [sortBy, search, isEnable, isChecked, isSuccessful]);

    const handleChangePage = useCallback((data) => {
        setPage(prevState => ({
            ...prevState,
            pageNum: data.selected
        }));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const searchValue = form[0].value;
        setSearch(searchValue);
    };

    const handleSort = (option) => {
        setSortBy(option);
    };

    const handleStatus = (option) => {
        setIsEnable(option);
    };

    const handleIsChecked = (option) => {
        setIsChecked(option);
    };

    const handleIsSuccessful = (option) => {
        setIsSuccessful(option);
    };

    async function fetchUsers() {
        await sendRequest({pageNum: page.pageNum, params});
    }

    useEffect(() => {
        fetchUsers();
    }, [page.pageNum, params]);

    useEffect(() => {
        if (data) {
            setPage(prevState => ({
                ...prevState,
                totalPage: data.totalPage,
                totalElements: data.totalElement
            }));
        }
    }, [data]);

    return (
        <>
            <PageHeadin heading={"Khu trọ"}/>
            <Row>
                <Card>
                    <Card.Header className="bg-white py-4">
                        <h4 className="mb-0">Danh sách yêu cầu xác thực</h4>
                    </Card.Header>
                    <VerifyHeader
                        handleSearch={handleSearch}
                        handleSort={handleSort}
                        handleStatus={handleStatus}
                        handleIsSuccessful={handleIsSuccessful}
                        handleIsChecked={handleIsChecked}
                        sortBy={sortBy}
                        isEnable={isEnable}
                        isSuccessful={isSuccessful}
                        isChecked={isChecked}
                    />
                    {isLoading ? (
                        <div className="text-center py-4">
                            <Spinner animation="border"/>
                        </div>
                    ) : data.data.length === 0 ? (
                        <div className="text-center py-4">
                            <h5>Không có dữ liệu để hiển thị.</h5>
                        </div>

                    ) : (
                        data.data.map((item, index) => {
                            return <UserCard card={item} key={index} fetchUsers={fetchUsers}/>;
                        })
                    )}
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

export default ListVerify;
