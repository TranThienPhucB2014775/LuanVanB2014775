import React, {useEffect} from 'react';
import {Button, Modal, Spinner} from "react-bootstrap";
import useHttp from "../../hooks/useHttp.js";
import {getReport} from "../../api/comment.api.js";
import {baseUrlImg} from "../../constants/baseUrl.js";
import {Link} from "react-router-dom";

function DialogCommentInfo({isOpen, setIsOpen, reportID}) {
    const {data, isLoading, sendRequest} = useHttp(getReport, {});

    async function fetchData() {
        await sendRequest({
            reportId: reportID
        });
    }

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    return (
        <Modal show={isOpen} onHide={handleCloseModal} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Thông tin bình luận</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? (
                    <Spinner animation="border"/>
                ) : (
                    data && (
                        <div>
                            <Link to={`/dashboard/user/${data.userId}`}>
                                <div className="d-flex align-items-center mb-3">
                                    <img
                                        src={`${baseUrlImg}/${data.imgAvatar}`}
                                        alt={data.userName}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            marginRight: '10px'
                                        }}
                                    />
                                    <div>
                                        <h5>{data.userName}</h5>
                                        <p>{data.userEmail}</p>
                                    </div>
                                </div>
                            </Link>
                            <p><strong>Nội dung:</strong> {data.content}</p>
                            <p><strong>Trạng thái:</strong> {data.isAvailable ? 'Có sẵn' : 'Đã xóa'}</p>
                            <p><strong>Ngày tạo:</strong> {new Date(data.createdAt).toLocaleString()}</p>
                        </div>
                    )
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Đóng</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DialogCommentInfo;
