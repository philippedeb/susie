import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "/susie.svg";
import "../../css/Header.css";

function Header() {
  return (
    <Navbar bg="dark" expand="lg" className="header">
      <Container>
        <Link to="/susie/" style={{ textDecoration: "none" }}>
          <Navbar.Brand
            className="shake"
            style={{ color: "#fff", fontWeight: "bold" }}
          >
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
      </Container>
    </Navbar>
  );
}

export default Header;
