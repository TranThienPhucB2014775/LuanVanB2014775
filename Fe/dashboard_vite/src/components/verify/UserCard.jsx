import {Container, Card, Row, Col, Modal, Button} from 'react-bootstrap';
import {useEffect, useState} from "react";
import {getUser} from "../../api/user.api.js";
import useHttp from "../../hooks/useHttp.js";
import {getImageCardId} from "../../api/image.api.js";
import VerifyForm from "./VerifyForm.jsx";
import {FaCheckCircle, FaTimesCircle} from 'react-icons/fa';


export const UserCard = ({card, fetchUsers}) => {
    const {data: user, isLoading, sendRequest} = useHttp(getUser, {
        "id": "",
        "email": "",
        "username": "",
        "city": "",
        "address": "",
        "createdDate": "",
        "imgAvatar": "",
        "facebook": null,
        "phoneNumber": null,
        "role": "",
        "aboutMe": null,
        "isVerified": false,
        "enable": true
    });

    const [imageSrc, setImageSrc] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchImage = async () => {
            const response = await getImageCardId({id: card.urlCardId});
            if (response instanceof Blob) {
                const imageUrl = URL.createObjectURL(response);
                setImageSrc(imageUrl);
            } else {
                console.error("Response is not a Blob");
            }
            fetchUser();
        };

        const fetchUser = async () => {
            const response = await sendRequest({id: card.userId});
        };
        fetchImage();
    }, [card]);

    const handleImageClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowForm = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <>
            <Card className="m-3">
                <Card.Body>
                    <Row>
                        <Col md={4}>
                            <Card.Img
                                variant="top"
                                src={imageSrc}
                                alt={`Card ID: ${card.cardId}`}
                                onClick={handleImageClick}
                                style={{cursor: 'pointer', borderRadius: "0"}}
                            />
                        </Col>
                        <Col md={8}>
                            <Card.Title>{user.userName}</Card.Title>
                            <Card.Text>
                                <strong>Email:</strong> {user.email}<br/>
                                <strong>City:</strong> {user.city}<br/>
                                <strong>Address:</strong> {user.address}<br/>
                                <strong>Ngày tạo:</strong> {card.createdAt}<br/>
                                <strong>Đã kiểm tra:</strong>
                                {card.isChecked ? (
                                    <span className="text-success ms-2">
                                        <FaCheckCircle/>
                                    </span>
                                ) : (
                                    <span className="text-danger ms-2">
                                        <FaTimesCircle/>
                                    </span>
                                )}
                                <br/>
                                {card.isChecked && <><strong>Thành công:</strong>
                                    {card.isSuccessful ? (
                                        <span className="text-success ms-2">
                                    <FaCheckCircle/>
                                    </span>
                                    ) : (
                                        <span className="text-danger ms-2">
                                    <FaTimesCircle/>
                                    </span>
                                    )}
                                </>}
                            </Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-center">
                    <Button variant="primary" onClick={handleShowForm}>
                        Xét duyệt
                    </Button>
                </Card.Footer>
            </Card>
            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                <Modal.Body>
                    <img src={imageSrc} alt={`Card ID: ${card.cardId}`} style={{width: '100%', height: 'auto'}}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Đóng</Button>
                </Modal.Footer>
            </Modal>
            <VerifyForm show={showForm} handleClose={handleCloseForm} id={card.id} fetchUsers={fetchUsers}/>
        </>
    );
}