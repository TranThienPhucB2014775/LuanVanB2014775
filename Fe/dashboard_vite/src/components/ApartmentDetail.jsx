import React, { useEffect } from 'react';
import { ListGroup, Image, Card } from "react-bootstrap";
import useHttp from "../hooks/useHttp.js";
import { getApartment } from "../api/apartment.api.js";
import { ProgressSpinner } from "primereact/progressspinner";
import { getUser } from "../api/user.api.js";
import { useNavigate } from "react-router-dom";

function ApartmentDetail({ id }) {
    const navigate = useNavigate();
    const { data, isLoading, sendRequest } = useHttp(getApartment, null);
    const { data: user, isLoading: userIsLoading, sendRequest: fetchUser } = useHttp(getUser, null);

    useEffect(() => {
        if (data) {
            fetchUser({ id: data.userId });
        }
    }, [data]);

    useEffect(() => {
        sendRequest({ roomTypeId: id });
    }, []);

    if (isLoading) {
        return <ProgressSpinner />;
    }

    function handleUserClick() {
        navigate(`/dashboard/user/${user?.id}`);
    }

    const base_url = import.meta.env.VITE_API_URL;

    return (
        <Card className="py-3">
            <Card.Body>
                <Card.Title className="mb-4">Apartment Details</Card.Title>
                <ListGroup>
                    {[
                        { label: "Tên", value: data?.name },
                        { label: "Mô tả", value: data?.description },
                        { label: "Thành phố", value: data?.city },
                        { label: "Địa chỉ", value: data?.address },
                        { label: "Loại khu trọ", value: data?.apartmentType },
                        { label: "Quy tắc", value: data?.rule },
                        { label: "Trạng thái", value: data?.isAvailable ? "Đang hoạt động" : "Đang ngừng hoạt động" },
                    ].map((item, index) => (
                        <ListGroup.Item key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <strong style={{ width: '120px', flexShrink: 0 }}>{item.label}</strong>
                            <span style={{ wordBreak: 'break-word', flexGrow: 1 }}>{item.value}</span>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', cursor: "pointer" }} onClick={handleUserClick}>
                        <strong style={{ width: '120px', flexShrink: 0 }}>Thuộc về</strong>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Image
                                src={`${base_url}/media/getImg/${user?.imgAvatar}`}
                                alt=""
                                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                            />
                            <div>
                                <h5 style={{ margin: '0' }}>{user?.username}</h5>
                                <p style={{ margin: '0', color: 'gray' }}>{user?.email}</p>
                            </div>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

export default ApartmentDetail;
