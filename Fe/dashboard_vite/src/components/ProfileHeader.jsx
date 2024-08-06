import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import background from "../assets/image/profile-cover.jpg";

const profilenav = [
  {
    id: 1,
    title: "Giới thiệu",
    link: ".",
  },
  {
    id: 2,
    title: "Hoạt động",
    link: "./activity",
  },
];

const ProfileHeader = ({ user }) => {
  return (
    <Row className="align-items-center">
      <Col xl={12} lg={12} md={12} xs={12}>
        {/* Background */}
        <div
          className="pt-20 rounded-top"
          style={{
            background: `url(${background}) no-repeat`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="bg-white rounded-bottom smooth-shadow-sm">
          <div className="d-flex align-items-center justify-content-between pt-4 pb-6 px-4">
            <div className="d-flex align-items-center">
              {/* Avatar */}
              <div className="avatar-xxl avatar-indicators avatar-online me-2 position-relative d-flex justify-content-end align-items-end mt-n10">
                <img
                  src="http://localhost:8082/api/v1/media/default_Avatar.png"
                  className="avatar-xxl rounded-circle border border-4 border-white-color-40"
                  alt=""
                />
                <NavLink
                  to="#!"
                  className="position-absolute top-0 right-0 me-2"
                  data-bs-toggle="tooltip"
                  data-placement="top"
                  title="Verified"
                >
                  <img
                    src="/images/svg/checked-mark.svg"
                    alt=""
                    height="30"
                    width="30"
                  />
                </NavLink>
              </div>
              {/* Text */}
              <div className="lh-1">
                <h2 className="mb-0">
                  {user.username}
                  <NavLink
                    to="#!"
                    className="text-decoration-none"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title="Beginner"
                  ></NavLink>
                </h2>
                <p className="mb-0 d-block">{
                  user.role === "LANDLORD" ? "Chủ nhà" : "Người thuê"
                }</p>
              </div>
            </div>
            <div>
              {user.enable ? (
                <div className="btn btn-outline-danger d-none d-md-block">
                  Khoá
                </div>
              ) : (
                <div className="btn btn-outline-primary d-none d-md-block">
                  Mở khoá
                </div>
              )}
            </div>
          </div>
          {/* Nav */}
          <ul className="nav nav-lt-tab px-4" id="pills-tab" role="tablist">
            {profilenav.map((item) => (
              <li className="nav-item" key={item.id}>
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  end={item.link === "."}
                  to={item.link}
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </Col>
    </Row>
  );
};

export default ProfileHeader;
