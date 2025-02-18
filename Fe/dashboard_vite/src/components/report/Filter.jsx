import React, {useEffect, useState} from 'react';
import {Dropdown, Nav, Navbar} from "react-bootstrap";

export const sortOptions = [
    {name: "Mới nhất", param: "createdAt", order: "desc"},
    {name: "Cũ nhất", param: "updatedAt", order: "asc"},
    {name: "Cập nhật mới nhất", param: "updatedAt", order: "desc"},
    {name: "Cập nhật cũ nhất", param: "updatedAt", order: "asc"},
];

const statusOptions = [
    {
        name: "Chưa xử lý",
        param: "false",
    },
    {
        name: "Đã xử lý",
        param: "true",
    },
    {
        name: "Tất cả",
        param: "",
    },
];

const reportTypes = [
    {
        name: "Tất cả",
        param: "",
    },
    {
        name: "Báo cáo người dùng",
        param: "USER",
    },
    {
        name: "Báo cáo bài viết",
        param: "RENTAL_POST",
    },
    {
        name: "Báo cáo bình luận",
        param: "RENTAL_COMMENT",
    },
    {
        name: "Báo cáo tin nhắn",
        param: "MESSAGE",
    },
    {
        name: "Báo cáo khu trọ",
        param: "APARTMENT",
    },
];

function Filter({setParams}) {

    const [isHandled, setIsHandled] = useState(statusOptions[0]);
    const [sortBy, setSortBy] = useState(sortOptions[0])
    const [reportType, setReportType] = useState(reportTypes[0])



    useEffect(() => {

        const params = new URLSearchParams();
        if (isHandled.param) {
            params.append("isHandled", isHandled.param);
        }
        if (sortBy.param) {
            params.append("sortBy", sortBy.param);
            params.append("order", sortBy.order);
        }
        if ((reportType.param)) {
            params.append("reportType", reportType.param);
        }
        setParams(params.toString());
    }, [isHandled, sortBy, reportType]);

    return (
        <Navbar
            expand="lg"
            className="navbar-classic navbar navbar-expand-lg"
        >
            <Nav className="navbar-right-wrap ms-2 d-flex nav-top-wrap px-2">
                <Dropdown className="px-2">
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {reportType?.name || "Tất cả"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {reportTypes.map((option) => (
                            <Dropdown.Item
                                key={option.name}
                                onClick={() => {
                                    setReportType(option);
                                }}
                            >
                                {option.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="px-2">
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {isHandled?.name || "Tất cả"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {statusOptions.map((option) => (
                            <Dropdown.Item
                                key={option.name}
                                onClick={() => {
                                    setIsHandled(option);
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
        </Navbar>
    );
}

export default Filter;