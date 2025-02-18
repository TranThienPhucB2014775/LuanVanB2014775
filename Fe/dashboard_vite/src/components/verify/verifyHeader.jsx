import React from 'react';
import {Card, Dropdown, Form, Nav, Navbar} from "react-bootstrap";
import {sortOptions, statusOptions} from "../../constants/filter.js";

const isSuccessfulOptions = [
    {name: "Tất cả", param: ""},
    {name: "Đã duyệt", param: "true"},
    {name: "Không được duyệt", param: "false"},
]

const isCheckedOptions = [
    {name: "Tất cả", param: ""},
    {name: "Đã kiểm tra", param: "true"},
    {name: "Chưa kiểm tra", param: "false"},
]


function VerifyHeader({
                          handleSearch,
                          handleSort,
                          handleStatus,
                          handleIsSuccessful,
                          handleIsChecked,
                          sortBy,
                          isEnable,
                          isSuccessful,
                          isChecked
                      }) {
    return (
        <>
            <Navbar expand="lg" className="navbar-classic navbar navbar-expand-lg">
                <div className="d-flex justify-content-between w-100">
                    <div className="d-flex align-items-center">
                        <div className="ms-lg-3 d-none d-md-none d-lg-block">
                            <Form className="d-flex align-items-center" onSubmit={handleSearch}>
                                <Form.Control type="search" placeholder="Tìm kiếm theo email"/>
                            </Form>
                        </div>
                    </div>
                    <Nav className="navbar-right-wrap ms-2 d-flex nav-top-wrap px-2 gap-2">
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                {sortBy.name}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {sortOptions.map((option) => (
                                    <Dropdown.Item key={option.name} onClick={() => handleSort(option)}>
                                        {option.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {isChecked.name}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {isCheckedOptions.map((option) => (
                                    <Dropdown.Item key={option.name} onClick={() => handleIsChecked(option)}>
                                        {option.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {isSuccessful.name}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {isSuccessfulOptions.map((option) => (
                                    <Dropdown.Item key={option.name} onClick={() => handleIsSuccessful(option)}>
                                        {option.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </div>
            </Navbar>
        </>
    );
}

export default VerifyHeader;