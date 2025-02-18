import React from 'react';
import {Button, Table} from "react-bootstrap";
import {Eye, Lock, Unlock} from "react-feather";

const tenantPostType = [
    {
        name: "Tìm phòng",
        value: "LOOKING_FOR_ROOM_TO_RENT"
    },
    {
        name: "Tìm bạn ở ghép",
        value: "LOOKING_FOR_ROOMMATE"
    },
    {
        name: "Nhượng lại phòng",
        value: "ROOM_SUBLET"
    }
];

function TenantPostTable({
                             TenantPosts,
                             handleViewDetails,
                             handleDisableTenantPost,
                             handleEnableTenantPost
                         }) {
    return (
        <div className="">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Tiêu đề</th>
                    <th>Tỉnh/Thành phố</th>
                    <th>Quận/Huyện</th>
                    <th>Địa chỉ</th>
                    <th>Phường/Xã</th>
                    <th>Giá (VND)</th>
                    <th>Trạng thái</th>
                    <th>Loại</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {TenantPosts.map((rental) => (
                    <tr key={rental.tenantPostId}>
                        <td>{rental.title}</td>
                        <td>{rental.city}</td>
                        <td>{rental.district}</td>
                        <td>{rental.address}</td>
                        <td>{rental.ward}</td>
                        <td>{rental.price.toLocaleString()}</td>
                        <td>{rental.isAvailable ? 'Bình thường' : 'Đang ẩn'}</td>
                        <td>
                            {tenantPostType.find(item => item.value === rental.tenantPostType).name}
                        </td>
                        <td>
                            <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                                <Button
                                    variant="info"
                                    onClick={() => handleViewDetails(rental.tenantPostId)}
                                >
                                    <Eye size={16}/>
                                </Button>
                                <Button
                                    variant={rental.isAvailable ? "warning" : "success"}
                                    onClick={() => rental.isAvailable ? handleDisableTenantPost(rental) : handleEnableTenantPost(rental)}
                                    className="ml-2"
                                >
                                    {rental.isAvailable ? <Lock size={16}/> : <Unlock size={16}/>}
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TenantPostTable;