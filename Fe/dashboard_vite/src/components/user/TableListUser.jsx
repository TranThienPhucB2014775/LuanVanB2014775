import React from "react";
import {Alert, Button, Spinner, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function TableListUser({
                                          loader,
                                          users,
                                          handleDisableUser,
                                          handleEnableUser,
                                      }) {
    const navigate = useNavigate();

    function handleClick(id) {
        navigate(`/dashboard/user/${id}`);
    }

    return (
        <>
            <Table className="text-nowrap">
                <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Email</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Vai trò</th>
                    <th scope="col">Đã xác thực</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {loader ? (
                    <tr>
                        <td colSpan="6" className="text-center py-4">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </td>
                    </tr>
                ) : users && users.data && users.data.length > 0 ? (
                    users.data.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td
                                onClick={() => handleClick(user.id)}
                                style={{cursor: "pointer"}}
                            >
                                {user.email}
                            </td>
                            <td>
                                    <span
                                        className={`badge ${
                                            user.enable ? "bg-success" : "bg-danger"
                                        }`}
                                    >
                                        {user.enable ? "Bình thường" : "Bị khóa"}
                                    </span>
                            </td>
                            <td>{user.role}</td>
                            <td>
                                    <span
                                        className={`badge ${
                                            user.isVerified ? "bg-success" : "bg-danger"
                                        }`}
                                    >
                                        {user.isVerified ? "Đã xác thực" : "Chưa xác thực"}
                                    </span>
                            </td>
                            <td>
                                {user.enable ? (
                                    <Button
                                        variant="outline-warning"
                                        className="me-1"
                                        onClick={() => handleDisableUser(user)}
                                    >
                                        Khoá
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outline-success"
                                        className="me-1"
                                        onClick={() => handleEnableUser(user)}
                                    >
                                        Mở khoá
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center py-4">
                            <Alert variant="info">Không có dữ liệu để hiển thị.</Alert>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </>
    );
}
