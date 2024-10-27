import React from 'react';
import {Button, Spinner, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {roomStatus} from "../../constants/roomStatus.js";

function TableRoom({loader, data}) {
    const navigate = useNavigate();

    function handledClick(id) {
        navigate(`/dashboard/room-detail/${id}`);
    }

    return (
        <>
            <Table className="text-nowrap">
                <thead>
                <tr>
                    <th scope="col">Tên</th>
                    <th scope="col">Trạng thái thuê</th>
                    <th scope="col">Trạng thái hoạt động</th>
                    {/*<th scope="col">Hành động</th>*/}
                </tr>
                </thead>
                <tbody>
                {loader ? (
                    <tr>
                        <td colSpan="3" className="text-center py-4">
                            <Spinner animation="border"/>
                        </td>
                    </tr>
                ) : data && data.length > 0 ? (
                    data.map((item) => (
                        <tr key={item.id}>
                            <td
                                onClick={() => handledClick(item.id)}
                                style={{cursor: "pointer"}}
                            >
                                {item.name}
                            </td>
                            <td>
                                {roomStatus.map((status) => {
                                    if (status.value === item.rentStatus) {
                                        return status.name;
                                    }
                                    return null; // Return null if no match found
                                })}
                            </td>
                            <td style={{textTransform: "none"}}>
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
                        <td colSpan="3" className="text-center py-4">
                            <h5>Không có dữ liệu để hiển thị.</h5>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </>
    );
}

export default TableRoom;
