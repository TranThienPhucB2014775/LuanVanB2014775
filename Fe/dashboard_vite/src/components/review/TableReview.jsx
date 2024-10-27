import React, {useState} from 'react';
import {Button, Card, Col, Modal, Row, Spinner, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {baseUrlImg} from "../../constants/baseUrl.js";
import {deleteReview} from "../../api/review.api.js";
import {ToastContainer, toast} from 'react-toastify';

const FeedbackCard = ({feedback}) => {

    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const onDisable = async (id) => {
        await deleteReview(id);
        toast.error("Vô hiệu hóa phản hồi thành công!");

    }

    return (
        <Card className="mb-3">
            <Card.Body>
                <Row>
                    <Col xs={3}>
                        <Card.Img variant="top" src={`${baseUrlImg}/getImg/${feedback.imgAvatar}`} alt="Avatar"/>
                    </Col>
                    <Col xs={9}>
                        <Card.Title>{feedback.userName}</Card.Title>
                        <Card.Text>
                            <strong>Đánh giá:</strong> {feedback.rating} <br/>
                            <strong>Loại đánh giá:</strong> {feedback.feedBackType} <br/>
                            <strong>Trạng thái:</strong> {feedback.isAvailable ? 'Bình thường' : 'Bị khóa'} <br/>
                            {feedback.feedBack && (
                                <>
                                    <strong>Feedback:</strong> {feedback.feedBack} <br/>
                                </>
                            )}
                        </Card.Text>
                        {feedback.isAvailable && (
                            <>
                                <Button variant="danger" onClick={handleShow}>
                                    Vô hiệu hóa
                                </Button>

                                <Modal show={showModal} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Xác nhận</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Bạn có chắc chắn muốn vô hiệu hóa phản hồi này?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Hủy
                                        </Button>
                                        <Button variant="danger" onClick={() => {
                                            onDisable(feedback.id);
                                            handleClose();
                                        }}>
                                            Vô hiệu hóa
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                        )}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

function TableReview({loader, data,}) {
    return (
        <div className="container mt-5">
            <h1>User Feedback</h1>
            {data !== undefined && data.map(feedback => (
                <FeedbackCard key={feedback.id} feedback={feedback}/>
            ))}
            <div>
                <h5>Total Feedbacks: {data.totalElement}</h5>
                <h5>Average Rating: {data.averageRating}</h5>
            </div>
        </div>
    );
}

export default TableReview;