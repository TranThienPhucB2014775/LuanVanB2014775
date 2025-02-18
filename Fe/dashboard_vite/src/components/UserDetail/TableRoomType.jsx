import React from 'react';
import { Button, Spinner, Table } from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

function TableRoomType({ loader, data }) {
    const navigate = useNavigate();

    function handledClick(id) {
        navigate(`/dashboard/room-list/${id}`);
    }

    return (
        <>
            <Table className="text-nowrap">
                <thead>
                <tr>
                    <th scope="col">Tên</th>
                    <th scope="col">Thông tin</th>
                    <th scope="col">Trạng thái</th>
                    {/*<th scope="col">Hành động</th>*/}
                </tr>
                </thead>
                <tbody>
                {loader ? (
                    <tr>
                        <td colSpan="4" className="text-center py-4">
                            <Spinner animation="border" />
                        </td>
                    </tr>
                ) : data && data.length > 0 ? (
                    data.map((item) => (
                        <tr key={item.id}>
                            <td
                                // onClick={() => handledClick(item.roomTypeId)}
                                style={{ cursor: "pointer" }}
                            ><Link to={`/dashboard/room-list/${item.id}`}>
                                {item.name}
                            </Link>
                                
                            </td>
                            <td>{item.info}</td>
                            <td style={{ textTransform: "none" }}>
                                {item.isAvailable ? "Bình thường" : "Bị khóa"}
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

export default TableRoomType;
