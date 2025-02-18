import React from 'react';
import {Button, Spinner, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

function TableApartment({loader, data}) {
    function handledClick(id) {
        // navigate(`/dashboard/apartment/${id}`);
    }

    return (
        <>
            <Table className="text-nowrap">
                <thead>
                <tr>
                    <th scope="col">Tên</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Loại khu trọ</th>
                    <th scope="col">Trạng thái</th>
                    {/*<th scope="col">Hành động</th>*/}
                </tr>
                </thead>
                <tbody>
                {loader ? (
                    <tr>
                        <td colSpan="4" className="text-center py-4">
                            <Spinner animation="border"/>
                        </td>
                    </tr>
                ) : data && data.length > 0 ? (
                    data.map((apartment) => (
                        <tr key={apartment.id}>
                            <td
                                onClick={() => handledClick(apartment.id)}
                                style={{cursor: "pointer"}}
                            >
                                <Link to={"/dashboard/room-type-list/" + apartment.apartmentId}>
                                    {apartment.name}
                                </Link>
                            </td>
                            <td>{apartment.address}</td>
                            <td>{apartment.apartmentType}</td>
                            <td style={{textTransform: "none"}}>
                                {apartment.isAvailable ? "Bình thường" : "Bị khóa"}
                            </td>
                            {/*<td>*/}
                            {/*    <Button*/}
                            {/*        variant="outline-success"*/}
                            {/*        className="me-1"*/}
                            {/*        // onClick={}*/}
                            {/*    >*/}
                            {/*        Thông tin*/}
                            {/*    </Button>*/}
                            {/*</td>*/}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center py-4">
                            <h5>Không có dữ liệu để hiển thị.</h5>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </>
    );
}

export default TableApartment;
