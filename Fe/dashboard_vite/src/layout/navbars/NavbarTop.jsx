// import node module libraries
import { Menu } from "react-feather";
import { Link } from "react-router-dom";

import { Nav, Navbar } from "react-bootstrap";

// import sub components
import QuickMenu from "../QuickMenu";

const NavbarTop = (props) => {
  return (
    <Navbar expanded="lg" className="navbar-classic navbar navbar-expand-lg">
      <div className="d-flex justify-content-between w-100">
        <div className="d-flex align-items-center">
          <Link
            href="#"
            id="nav-toggle"
            className="nav-icon me-2 icon-xs"
            // eslint-disable-next-line react/prop-types
            onClick={() => props.data.SidebarToggleMenu(!props.data.showMenu)}
          >
            <Menu size="18px" />
          </Link>
        </div>
        {/* Quick Menu */}
        <Nav className="navbar-right-wrap ms-2 d-flex nav-top-wrap">
          <QuickMenu />
        </Nav>
      </div>
    </Navbar>
  );
};

export default NavbarTop;
