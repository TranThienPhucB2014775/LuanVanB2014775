import React from 'react';
import {Button, Table} from "react-bootstrap";
import {Eye, Lock, Unlock} from "react-feather";

function RentalPostTable({
                             rentalPosts,
                             handleViewDetails,
                             handleDisableRentalPost,
                             handleEnableRentalPost
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
                    <th>Diện tích (m²)</th>
                    <th>Giá (VND)</th>
                    <th>Trạng thái</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {rentalPosts.map((rental) => (
                    <tr key={rental.rentalPostId}>
                        <td>{rental.title}</td>
                        <td>{rental.city}</td>
                        <td>{rental.district}</td>
                        <td>{rental.address}</td>
                        <td>{rental.ward}</td>
                        <td>{rental.area}</td>
                        <td>{rental.price.toLocaleString()}</td>
                        <td>{rental.isAvailable ? 'Yes' : 'No'}</td>
                        <td>
                            <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                                <Button
                                    variant="info"
                                    onClick={() => handleViewDetails(rental.rentalPostId)}
                                >
                                    <Eye size={16}/>
                                </Button>
                                <Button
                                    variant={rental.isAvailable ? "warning" : "success"}
                                    onClick={() => rental.isAvailable ? handleDisableRentalPost(rental) : handleEnableRentalPost(rental)}
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

export default RentalPostTable;