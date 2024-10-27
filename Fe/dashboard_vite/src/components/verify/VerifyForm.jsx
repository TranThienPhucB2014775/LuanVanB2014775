// MessageForm.js
import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {verifyIdentity} from "../../api/verification.api.js";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyForm = ({show, handleClose, id, fetchUsers}) => {
    const [message, setMessage] = useState('');
    const [isSuccessful, setIsSuccessful] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Message:", message);
        console.log("Is Successful:", isSuccessful);
        const res = await verifyIdentity({
            id: id,
            status: isSuccessful,
            message: message,
        });
        console.log("Response:", res);
        if (res.code === 0) {
            toast.success("Xét duyệt thành công!",);
        } else {
            toast.error("Xét duyệt không thành công!");
        }
        handleClose();
        fetchUsers()
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xét duyệt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formMessage">
                            <Form.Label>Nội dung</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập nội dung"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formIsSuccessful">
                            <Form.Label>Kết quả</Form.Label>
                            <div className="d-flex flex-column">
                                <Form.Check
                                    type="radio"
                                    id="successRadio"
                                    label="Thành công"
                                    checked={isSuccessful}
                                    onChange={() => setIsSuccessful(true)}
                                    className="mb-2"
                                />
                                <Form.Check
                                    type="radio"
                                    id="failureRadio"
                                    label="Không thành công"
                                    checked={!isSuccessful}
                                    onChange={() => setIsSuccessful(false)}
                                />
                            </div>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Gửi
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            {/*<ToastContainer />*/}
        </>
    );
};

export default VerifyForm;
