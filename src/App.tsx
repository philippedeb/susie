import { Container, Navbar, Form, FormControl, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { getData } from './Fetcher';
import './App.css';
import logo from '/susie.svg';

function App() {
  const [searchValue, setSearchValue] = useState('');

  function handleSearch() {
    console.log(`Searching for ${searchValue}...`);
    getData(searchValue);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

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
        <p className="text-center font-weight-bold mb-4" style={{ fontSize: '18px'}}>
          How sustainable is your GitHub repository? 🦖📟
        </p>
        <div className="d-flex align-items-center">
          <Form className="d-flex">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Enter a GitHub repository URL to analyze sustainability</Tooltip>}
            >
              <FormControl type="text" placeholder="Paste GitHub URL here"
                className="rounded-pill bg-white text-dark border-0 shadow-sm w-100 mr-2"
                style={{ maxWidth: '90%', minWidth: '400px', borderColor: '#757167', borderWidth: 'medium' }}
                onChange={handleChange}
                onKeyDown={event => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleSearch();
                    }
                  }
                }
                
                />
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Analyze</Tooltip>}
            >
              <Button onClick={handleSearch} variant="secondary" className="rounded-pill" style={{ backgroundColor: '#757167', marginLeft: '10px' }}>
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
