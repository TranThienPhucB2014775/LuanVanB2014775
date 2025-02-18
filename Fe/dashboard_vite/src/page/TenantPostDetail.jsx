// src/RentalPostDetail.js
import React, {useEffect, useState} from 'react';
import {Container, Card, Button, Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {disableRentalPost, enableRentalPost, getRentalPostById} from "../api/rentalPost.api.js";
import {Link, useParams} from "react-router-dom";
import {baseUrlImg} from "../constants/baseUrl.js";
import {toast} from "react-toastify";
import PageHeadin from "../components/PageHeading.jsx";
import {disableTenantPost, enableTenantPost, getTenantPostById} from "../api/tenantPost.api.js";

const TenantPostDetail = () => {
    const [rentalData, setRentalData] = useState(undefined);
    const {tenantPostId} = useParams();

    useEffect(() => {
        async function fetchData() {
            const response = await getTenantPostById({tenantPostId});s
            if (response.code === 0) {
                setRentalData(response.result);
            } else {
                toast.error("Bài đăng không tồn tại");
                setRentalData(null);
            }
        }

        fetchData();
    }, [tenantPostId]);

    if (rentalData === undefined) {
        return <Container className="mt-5">Loading...</Container>;
    }
    if (rentalData === null) {
        return <Container className="mt-5">Bài đăng không tồn tại</Container>;
    }

    async function handleLock() {
        const response = await disableTenantPost({id: tenantPostId});
        if (response.code === 0) {
            setRentalData({...rentalData, isAvailable: false});
            toast.success('Khóa bài đăng thành công');
        } else {
            toast.error('Khóa bài đăng thất bại');
        }
    }

    async function handleUnlock() {
        const response = await enableTenantPost({id: tenantPostId});
        if (response.code === 0) {
            setRentalData({...rentalData, isAvailable: true});
            toast.success('Mở khóa bài đăng thành công');
        } else {
            toast.error('Mở khóa bài đăng thất bại');
        }
    }

    return (
        <div>
            <PageHeadin heading={"Thông tin tin tìm phòng"}/>
            <Card className="shadow-lg">
                <Card.Body>
                    <Card.Title>
                        <h2 className="text-primary">{rentalData.title}</h2>
                    </Card.Title>
                    <Card.Text>
                        <strong>Địa
                            chỉ:</strong> {rentalData.address}, {rentalData.ward}, {rentalData.district}, {rentalData.city}<br/>
                        <strong>Diện tích:</strong> {rentalData.area} m²<br/>
                        <strong>Giá:</strong> {rentalData.price.toLocaleString()} VNĐ<br/>
                        <strong>Loại hình cho thuê:</strong> {rentalData.rentalType}<br/>
                        <strong>Loại người thuê:</strong> {rentalData.tenantType}<br/>
                        <strong>Mô tả:</strong> {rentalData.description}<br/>
                        <strong>Tiện nghi:</strong> {rentalData.amenities}<br/>
                        <strong>Trạng thái:</strong> {rentalData.isAvailable ? 'Bình thương' : 'Đang khóa'}
                    </Card.Text>
                    <div className="d-flex justify-content-between mt-3">
                        <div>
                            {
                                rentalData.isAvailable
                                    ? <Button variant="danger" onClick={handleLock} className="me-2">
                                        Khóa
                                    </Button>
                                    : <Button variant="success" onClick={handleUnlock} className="me-2">
                                        Mở khóa
                                    </Button>
                            }
                            <Link to={`/dashboard/user/${rentalData.userId}`}>
                                <Button variant="info">
                                    Thông tin người đăng
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <style jsx>{`
                .carousel-control-prev-icon,
                .carousel-control-next-icon {
                    background-color: gray; /* Màu của biểu tượng mũi tên */
                }
            `}</style>
        </div>
    );
};

export default TenantPostDetail;
