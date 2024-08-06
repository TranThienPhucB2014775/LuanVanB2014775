import { Fragment, useState } from "react";

import NavbarTop from "../layout/navbars/NavbarTop";
import NavbarVertical from "../layout/navbars/NavbarVertical";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

export default function DashBoard() {
  const [showMenu, setShowMenu] = useState(true);
  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };

  const { token } = useSelector((state) => state.auth);
  // console.log(token);

  if (!token) {
    window.location.href = "/";
  }

  return (
    <div id="db-wrapper" className={`${showMenu ? "" : "toggled"}`}>
      <div className="navbar-vertical navbar">
        <NavbarVertical
          showMenu={showMenu}
          onClick={(value) => setShowMenu(value)}
        />
      </div>
      <div id="page-content">
        <div className="header">
          <NavbarTop
            data={{
              showMenu: showMenu,
              SidebarToggleMenu: ToggleMenu,
            }}
          />
        </div>
        <Fragment>
          <div className="pt-8 pb-21"></div>
          <Container fluid className="mt-n22 px-6">
            <Outlet />
          </Container>
        </Fragment>
      </div>
    </div>
  );
}
