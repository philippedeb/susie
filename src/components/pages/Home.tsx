import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
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
    <div
      className="mt-5"
      style={{
        marginTop: "50px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <Container className="d-flex flex-column justify-content-center align-items-center mb-5">
        <h1
          className="text-center"
          style={{
            fontSize: "60px",
            fontFamily: "Playfair Display, sans-serif",
            fontWeight: 900,
          }}
        >
          Susie.
        </h1>
        <h2
          className="text-center"
          style={{
            fontSize: "40px",
            fontFamily: "Playfair Display, sans-serif",
            fontWeight: "light",
          }}
        >
          Sustainable software development.
        </h2>
      </Container>
      <Container
        className={`d-flex flex-column justify-content-center align-items-center${
          loaded ? " fade-in-down" : ""
        }`}
        style={{
          backgroundColor: "#4f4d4a",
          paddingTop: "20px",
          paddingBottom: "10px",
          paddingLeft: "20px",
          paddingRight: "20px",
          borderRadius: "15px",
        }}
      >
        <h3
          className="text-center font-weight-bold mb-2"
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#ccc6be",
          }}
        >
          Analysis Tool 🔍
        </h3>
        <p
          className="text-center font-weight-bold mb-4"
          style={{
            fontSize: "18px",
          }}
        >
          How sustainable is your GitHub repository?
        </p>
        <SearchBar onSearch={handleSubmit} />
      </Container>
      <Container
        className={`d-flex flex-column justify-content-center align-items-center mt-4${
          loaded ? " fade-in-down" : ""
        }`}
        style={{
          backgroundColor: "#444a46",
          paddingTop: "20px",
          paddingBottom: "10px",
          paddingLeft: "20px",
          paddingRight: "20px",
          borderRadius: "15px",
        }}
      >
        <h3
          className="text-center font-weight-bold mb-2"
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#c4ccbe",
          }}
        >
          Guides 📰
        </h3>
        <p
          className="text-center font-weight-bold mb-4"
          style={{
            fontSize: "18px",
          }}
        >
          Perhaps you want to learn more about sustainability? Look no further!
        </p>
        <Button
          variant="outline-light"
          className="mb-3"
          onClick={() => navigate("./guides")}
        >
          View Guides
        </Button>
      </Container>
    </div>
  );
}

export default Home;
