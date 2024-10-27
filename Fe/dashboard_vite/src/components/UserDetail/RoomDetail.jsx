import React, {useEffect} from 'react';
import {Col, ListGroup, Row} from "react-bootstrap";
import useHttp from "../../hooks/useHttp.js";
import {getALlApartment, getApartment} from "../../api/apartment.api.js";
import {getRoomType} from "../../api/roomType.api.js";
import {ProgressSpinner} from "primereact/progressspinner";

function RoomTypeDetail({id}) {

    const {data, isLoading, sendRequest} = useHttp(getApartment, {
        data: [],
    });

    useEffect(() => {
        async function fetchRoomType() {
            sendRequest({roomTypeId: id});
        }

        fetchRoomType()
    }, []);

    if (isLoading) {
        return <ProgressSpinner/>
    }

    return (
        <div className="py-2">
            <ListGroup>
                <ListGroup horizontal>
                    <ListGroup.Item className="w-25">Tên</ListGroup.Item>
                    <ListGroup.Item className="flex-fill ">{data.name}</ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                    <ListGroup.Item className="w-25">Mô tả</ListGroup.Item>
                    <ListGroup.Item className="flex-fill">{data.description}</ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                    <ListGroup.Item className="w-25">Thành phố</ListGroup.Item>
                    <ListGroup.Item className="flex-fill">{data.city}</ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                    <ListGroup.Item className="w-25">Thành phố</ListGroup.Item>
                    <ListGroup.Item className="flex-fill">{data.address}</ListGroup.Item>
                </ListGroup>

                <ListGroup horizontal>
                    <ListGroup.Item className="w-25">Loại khu trọ</ListGroup.Item>
                    <ListGroup.Item className="flex-fill">{data.apartmentType}</ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                    <ListGroup.Item className="w-25">Quy tắc</ListGroup.Item>
                    <ListGroup.Item className="flex-fill">{data.rule}</ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                    <ListGroup.Item className="w-25">Trạng thái</ListGroup.Item>
                    <ListGroup.Item
                        className="flex-fill">{data.isAvailable ? "Đang hoạt động" : "Đang ngừng hoạt động"}</ListGroup.Item>
                </ListGroup>
            </ListGroup>
        </div>
    );
}

export default RoomTypeDetail;