import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "/susie.svg";
import "../../css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <Navbar bg="dark" expand="lg" className="header">
      <Container>
        <Link className="shake" to="/susie/" style={{ textDecoration: "none" }}>
          <Navbar.Brand style={{ color: "#fff", fontWeight: "bold" }}>
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Susie Logo"
            />
            {" Susie"}
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <FontAwesomeIcon icon={faBars} className="navbar-toggle" />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-center">
            <Link to="/susie/" style={{ textDecoration: "none" }}>
              <div className="nav-link-style header-button">
                Analyse Repository
              </div>
            </Link>
            <Link to="/susie/guides/" style={{ textDecoration: "none" }}>
              <div className="nav-link-style header-button">Guides</div>
            </Link>
            <Link
              to="https://github.com/philippedeb/susie/blob/main/CONTRIBUTING.md"
              style={{ textDecoration: "none" }}
            >
              <div className="nav-link-style header-button">Contribute</div>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
