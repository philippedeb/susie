import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import SearchBar from "./SearchBar";
import "../css/fade-in.css";
import { useNavigate } from "react-router-dom";

interface Props {
  onChange: (value: string) => void;
}

function Home(props: Props) {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleSubmit = (value: string) => {
    props.onChange(value);
    navigate(`./dashboard?search=${value}`);
  };

  return (
    <Container
      className={`d-flex flex-column justify-content-center align-items-center my-5${
        loaded ? " fade-in-down" : ""
      }`}
    >
      <p
        className="text-center font-weight-bold mb-4"
        style={{ fontSize: "18px" }}
      >
        How sustainable is your GitHub repository? 🦖📟
      </p>
      <SearchBar onSearch={handleSubmit} onChange={props.onChange} />
    </Container>
  );
}

export default Home;
