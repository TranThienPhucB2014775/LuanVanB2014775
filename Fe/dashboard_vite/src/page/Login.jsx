import { useEffect, useRef } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../store/reducers/authReducer";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const { loader, errorMessage, token } = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const data = {
      email,
      password,
    };
    await dispatch(adminLogin(data));
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  useEffect(() => {
    if (errorMessage) {
      console.log(errorMessage);
      toast.error("Lỗi đăng nhập");
    }
  }, [errorMessage]);

  return (
    <>
      {/* <ToastContainer /> */}
      <Container className="d-flex flex-column">
        <Row className="align-items-center justify-content-center g-0 min-vh-100">
          <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
            {/* Card */}
            <Card className="smooth-shadow-md">
              {/* Card body */}
              <Card.Body className="p-6">
                <div className="mb-4">
                  {/* <image src="/images/brand/logo/logo-primary.svg" className="mb-2" alt="" /> */}
                  <p className="mb-6">Please enter your user information.</p>
                </div>
                {/* Form */}

                <Form onSubmit={handleSubmit}>
                  {/* Username */}
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username or email</Form.Label>
                    <Form.Control
                      type="email"
                      name="username"
                      placeholder="Enter address here"
                      ref={emailRef}
                    />
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="**************"
                      ref={passwordRef}
                    />
                  </Form.Group>

                  {/* Checkbox */}
                  <div className="d-lg-flex justify-content-between align-items-center mb-4">
                    <Form.Check type="checkbox" id="rememberme">
                      <Form.Check.Input type="checkbox" />
                      <Form.Check.Label>Remember me</Form.Check.Label>
                    </Form.Check>
                  </div>
                  <div>
                    {/* Button */}
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        {loader ? "Loading..." : "Login"}
                      </Button>
                    </div>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
