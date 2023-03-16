import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "/susie.svg";

function Header() {
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Link to="/susie/">
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
