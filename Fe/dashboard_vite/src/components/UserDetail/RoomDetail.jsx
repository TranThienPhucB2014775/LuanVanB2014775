import React, {useEffect} from 'react';
import {ListGroup} from "react-bootstrap";
import useHttp from "../../hooks/useHttp.js";
import {getRoomType} from "../../api/roomType.api.js";
import {ProgressSpinner} from "primereact/progressspinner";

function RoomTypeDetail({id}) {
    const {data, isLoading, sendRequest} = useHttp(getRoomType, {
        data: [],
    });

    useEffect(() => {
        async function fetchRoomType() {
            sendRequest({roomTypeId: id});
        }

        fetchRoomType();
    }, [id]);

    if (isLoading) {
        return <ProgressSpinner/>;
    }

    return (
        <div className="py-2">
            <ListGroup>
                <ListGroup.Item style={{display: 'flex', justifyContent: 'start'}}>
                    <strong style={{minWidth: '150px', fontSize: '14px'}}>Tên</strong>
                    <span style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                    }}>{data.name}</span>
                </ListGroup.Item>
                <ListGroup.Item style={{display: 'flex', justifyContent: 'start'}}>
                    <strong style={{minWidth: '150px', fontSize: '14px'}}>Mô tả</strong>
                    <span style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                    }}>{data.description}</span>
                </ListGroup.Item>
                <ListGroup.Item style={{display: 'flex', justifyContent: 'start'}}>
                    <strong style={{minWidth: '150px', fontSize: '14px'}}>Người</strong>
                    <span style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                    }}>{data.currentOccupancy}</span>
                </ListGroup.Item>
                <ListGroup.Item style={{display: 'flex', justifyContent: 'start'}}>
                    <strong style={{minWidth: '150px', fontSize: '14px'}}>Tối đa</strong>
                    <span style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                    }}>{data.maxOccupancy}</span>
                </ListGroup.Item>
                <ListGroup.Item style={{display: 'flex', justifyContent: 'start'}}>
                    <strong style={{minWidth: '150px', fontSize: '14px'}}>Tiện ích</strong>
                    <span style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                    }}>{data.utility}</span>
                </ListGroup.Item>
                <ListGroup.Item style={{display: 'flex', justifyContent: 'start'}}>
                    <strong style={{minWidth: '150px', fontSize: '14px'}}>Trạng thái</strong>
                    <span style={{wordBreak: 'break-word', overflowWrap: 'break-word'}}>
                        {data.isAvailable ? "Hoạt động" : "Ngừng hoạt động"}
                    </span>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default RoomTypeDetail;
