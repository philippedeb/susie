import { Container, Navbar, Form, FormControl, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import logo from './susie.svg';

function App() {
  return (
    <div className="App" style={{ background: '#292a2d', color: '#fff', minHeight: '100vh' }}>
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#" className="shake" style={{ color: '#fff', fontWeight: 'bold' }}>
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Susie Logo"
            />
            {' Susie'}
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="d-flex flex-column justify-content-center align-items-center my-5">
        <p className="text-center font-weight-bold mb-4" style={{ fontSize: '20px'}}>
          Analyze the sustainability of a repository 🌍💞
        </p>
        <div className="d-flex align-items-center">
          <Form className="d-flex">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Enter a GitHub repository URL to analyze sustainability</Tooltip>}
            >
              <FormControl type="text" placeholder="Paste GitHub URL here" className="rounded-pill bg-white text-dark border-0 shadow-sm w-100 mr-2" style={{ maxWidth: '800px', minWidth: '400px' }} />
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Analyze</Tooltip>}
            >
              <Button variant="primary" className="rounded-pill" style={{ backgroundColor: '#007bff', marginLeft: '10px' }}>
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </OverlayTrigger>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default App;
