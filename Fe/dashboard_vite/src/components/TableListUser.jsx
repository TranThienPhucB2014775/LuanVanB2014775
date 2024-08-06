import React from "react";
import { Alert, Button, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function TableListUser({
  loader,
  users,
  handleDisableUser,
  handleEnableUser,
}) {
  // console.log(users.data.length === 0);

  function hanldedClick(id) {
    console.log(id);
    navigate(`/dashboard/user/${id}`);
  }

  const navigate = useNavigate();

  return (
    <>
      <Table className="text-nowrap">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Email</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Vai trò</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {loader ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : users.data ? (
          users.data.map((user, index) => (
            <thead key={user.id}>
              <tr>
                <th scope="col">{index}</th>
                <th
                  scope="col"
                  onClick={() => hanldedClick(user.id)}
                  style={{ cursor: "pointer" }}
                >
                  {user.email}
                </th>
                <th scope="col" style={{ textTransform: "none" }}>
                  {user.enable ? "Bình thường" : "Bị khóa"}
                </th>
                <th scope="col">{user.role}</th>
                <th scope="col">{user.createdDate}</th>
                <th scope="col">
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
                </th>
              </tr>
            </thead>
          ))
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Table>
    </>
  );
}
