import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../structure/SearchBar";
import "../../css/fade-in.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleSubmit = (value: string) => {
    navigate(`./dashboard?search=${value}`);
  };

  return (
    <div className="mt-5" style={{ marginTop: "50px" }}>
      <Container
        className={`d-flex flex-column justify-content-center align-items-center${
          loaded ? " fade-in-down" : ""
        }`}
      >
        <p
          className="text-center font-weight-bold mb-4"
          style={{ fontSize: "18px" }}
        >
          How sustainable is your GitHub repository? 🦖📟
        </p>
        <SearchBar onSearch={handleSubmit} />
      </Container>
    </div>
  );
}

export default Home;
