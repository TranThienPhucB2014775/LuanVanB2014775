import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import {useOutletContext} from "react-router-dom";

const Overview = () => {
  const { user } = useOutletContext();
  console.log(user);
  return (
    <Col xl={6} lg={12} md={12} xs={12} className="mb-6">
      {/* card */}
      <Card>
        {/* card body */}
        <Card.Body>
          {/* card title */}
          <Card.Title as="h4">About</Card.Title>
          <span className="text-uppercase fw-medium text-dark fs-5 ls-2">
            Giới thiệu
          </span>
          <p className="mt-2 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspen
            disse var ius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat.
          </p>
          <Row>
            <Col xs={12} className="mb-5">
              <h6 className="text-uppercase fs-5 ls-2">Position</h6>
              <p className="mb-0">Theme designer at Bootstrap.</p>
            </Col>
            <Col xs={6} className="mb-5">
              <h6 className="text-uppercase fs-5 ls-2">Số điện thoại</h6>
              <p className="mb-0">{user.phoneNumber}</p>
            </Col>
            <Col xs={6} className="mb-5">
              <h6 className="text-uppercase fs-5 ls-2">Ngày tạo</h6>
              <p className="mb-0">{user.createdDate}</p>
            </Col>
            <Col xs={6}>
              <h6 className="text-uppercase fs-5 ls-2">Email </h6>
              <p className="mb-0">{user.email}</p>
            </Col>
            <Col xs={6}>
              <h6 className="text-uppercase fs-5 ls-2">Địa chỉ</h6>
              <p className="mb-0">{user.address}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Overview;
