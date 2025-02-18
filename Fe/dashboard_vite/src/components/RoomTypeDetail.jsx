import React, {useEffect} from 'react';
import {Button, Col, ListGroup, Row, Image} from "react-bootstrap";
import useHttp from "../hooks/useHttp.js";
import {getALlApartment, getApartment} from "../api/apartment.api.js";
import {getRoomType} from "../api/roomType.api.js";
import {ProgressSpinner} from "primereact/progressspinner";
import {getUser} from "../api/user.api.js";
import {Link, useNavigate} from "react-router-dom";

function RoomTypeDetail({id}) {
    const navigate = useNavigate();

    const {data, isLoading, sendRequest} = useHttp(getRoomType(), null);

    const {data: user, isLoading: userIsLoading, sendRequest: fetchUser} = useHttp(getUser, null);

    useEffect(() => {
        async function fetchUserDetail() {
            if (data === null) return;
            fetchUser({id: data.userId});
        }

        fetchUserDetail()
    }, [data])

    useEffect(() => {
        async function fetchRoomType() {
            sendRequest({roomTypeId: id});
        }

        fetchRoomType()
    }, []);

    if (isLoading) {
        return <ProgressSpinner/>
    }

    function handleUserClick() {
        navigate(`/dashboard/user/${user?.id}`);
    }

    const base_url = import.meta.env.VITE_API_URL

    return (
        <div className="py-2">
            <ListGroup>
                <ListGroup horizontal>
                    <ListGroup.Item className="w-25">Tên</ListGroup.Item>
                    <ListGroup.Item className="flex-fill ">{data?.name}</ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                    <ListGroup.Item className="w-25">Mô tả</ListGroup.Item>
                    <ListGroup.Item className="flex-fill">{data?.description}</ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                    <ListGroup.Item className="w-25">Trạng thái</ListGroup.Item>
                    <ListGroup.Item
                        className="flex-fill">{data?.isAvailable ? "Đang hoạt động" : "Đang ngừng hoạt động"}</ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                    <ListGroup.Item className="w-25 ">Thuộc về</ListGroup.Item>
                    <ListGroup.Item
                        className="flex-fill"
                        onClick={handleUserClick}
                        style={{cursor: "pointer"}}
                    >
                        {/*<Button className="outline-success">*/}
                        {/*    {user !== null && user?.username}*/}
                        {/*</Button>*/}
                        <div className="align-middle">
                            <div className="d-flex align-items-center">
                                <div>
                                    <Image
                                        src={`${base_url}/media/getImg/${user?.imgAvatar}`}
                                        alt=""
                                        className="avatar-md avatar rounded-circle"
                                    />
                                </div>
                                <div className="ms-3 lh-1">
                                    <h5 className=" mb-1">{user?.username}</h5>
                                    <p className="mb-0">{user?.email}</p>
                                </div>
                            </div>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </ListGroup>
        </div>
    );
}

export default ApartmentDetail;