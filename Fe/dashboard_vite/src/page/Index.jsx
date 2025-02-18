import React, {useEffect, useState} from 'react';
import {
    Briefcase,
    ListTask,
    People,
    Bullseye
} from 'react-bootstrap-icons';
import {Container, Col, Row, Card} from 'react-bootstrap';
import {FaBed, FaBuilding, FaClipboardList, FaUser, FaUsers} from "react-icons/fa";
import {getProperty, getTotalPost, getUser} from "../api/summary.api.js";
import PageHeadin from "../components/PageHeading.jsx";
import MonthlyPostChart from "../components/dashboard/MonthlyPostChart.jsx";

function Index() {
    const [summary, setSummary] = useState({
        totalRentalPost: 0,
        totalTenantPost: 0,
        totalLandlord: 0,
        totalTenant: 0,
        totalApartment: 0,
        totalRoom: 0,
        monthlyRentalPostData: [],
        monthlyTenantPostData: []
    });

    useEffect(() => {
        async function fetchData() {
            const totalPost = await getTotalPost();
            const user = await getUser();
            const property = await getProperty();

            setSummary({
                totalRentalPost: totalPost.result.totalRentalPost,
                totalTenantPost: totalPost.result.totalTenantPost,
                totalLandlord: user.result.totalLandlord,
                totalTenant: user.result.totalTenant,
                totalApartment: property.result.totalApartments,
                totalRoom: property.result.totalRooms,
                monthlyRentalPostData: totalPost.result.monthlyRentalPostData,
                monthlyTenantPostData: totalPost.result.monthlyTenantPostData
            });
        }

        fetchData();
    }, []);

    return (
        <div className="pb-10">
            <PageHeadin heading={"Trang chủ"}/>
            <Row>
                <Col md={4}>
                    <Card className="mb-4 px-4" style={{backgroundColor: '#e7f1ff', borderColor: '#007bff'}}>
                        <Card.Body>
                            <Card.Title>
                                <FaClipboardList size={40} color="#007bff"/>
                                Tổng số tin cho thuê
                            </Card.Title>
                            <Card.Text style={{
                                fontSize: '2rem',
                                fontWeight: 'bold'
                            }}>{summary.totalRentalPost}</Card.Text> {/* Kích thước chữ lớn hơn */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4 px-4" style={{backgroundColor: '#e8f5e9', borderColor: '#28a745'}}>
                        <Card.Body>
                            <Card.Title>
                                <FaClipboardList size={40} color="#28a745"/>
                                Tổng số tin tìm phòng
                            </Card.Title>
                            <Card.Text style={{
                                fontSize: '2rem',
                                fontWeight: 'bold'
                            }}>{summary.totalTenantPost}</Card.Text> {/* Kích thước chữ lớn hơn */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4 px-4" style={{backgroundColor: '#ffebee', borderColor: '#dc3545'}}>
                        <Card.Body>
                            <Card.Title>
                                <FaUser size={40} color="#dc3545"/>
                                Tổng số chủ nhà
                            </Card.Title>
                            <Card.Text style={{
                                fontSize: '2rem',
                                fontWeight: 'bold'
                            }}>{summary.totalLandlord}</Card.Text> {/* Kích thước chữ lớn hơn */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Card className="mb-4 px-4" style={{backgroundColor: '#fff3e0', borderColor: '#ffc107'}}>
                        <Card.Body>
                            <Card.Title>
                                <FaUsers size={40} color="#ffc107"/>
                                Tổng số người thuê
                            </Card.Title>
                            <Card.Text style={{
                                fontSize: '2rem',
                                fontWeight: 'bold'
                            }}>{summary.totalTenant}</Card.Text> {/* Kích thước chữ lớn hơn */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4 px-4" style={{backgroundColor: '#e0f7fa', borderColor: '#17a2b8'}}>
                        <Card.Body>
                            <Card.Title>
                                <FaBuilding size={40} color="#17a2b8"/>
                                Tổng số căn hộ
                            </Card.Title>
                            <Card.Text style={{
                                fontSize: '2rem',
                                fontWeight: 'bold'
                            }}>{summary.totalApartment}</Card.Text> {/* Kích thước chữ lớn hơn */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4 px-4" style={{backgroundColor: '#e0f7fa', borderColor: '#17a2b8'}}>
                        <Card.Body>
                            <Card.Title>
                                <FaBed size={40} color="#17a2b8"/> {/* Thay đổi biểu tượng ở đây */}
                                Tổng số phòng
                            </Card.Title>
                            <Card.Text style={{
                                fontSize: '2rem',
                                fontWeight: 'bold'
                            }}>{summary.totalRoom}</Card.Text> {/* Kích thước chữ lớn hơn */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <MonthlyPostChart
                    monthlyRentalPostData={summary.monthlyRentalPostData}
                    monthlyTenantPostData={summary.monthlyTenantPostData}
            />
        </div>
    );
}

export default Index;
