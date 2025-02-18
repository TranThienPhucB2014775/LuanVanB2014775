import React from 'react';
import {Card, Dropdown, Form, Nav, Navbar} from "react-bootstrap";
import {sortOptions, statusOptions} from "../../constants/filter.js";

function ListReviewHeader({
                              handleSearch, handleSort, handleStatus, sortBy, isEnable
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
                    <Nav className="navbar-right-wrap ms-2 d-flex nav-top-wrap px-2">
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
                        <Dropdown className="px-2">
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {isEnable.name}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {statusOptions.map((option) => (
                                    <Dropdown.Item key={option.name} onClick={() => handleStatus(option)}>
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

export default ListReviewHeader;