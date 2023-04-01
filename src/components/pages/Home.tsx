import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import SearchBar from "../structure/SearchBar";
import "../../css/fade-in.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 800);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleSubmit = (value: string) => {
    navigate(`./dashboard?search=${value}`);
  };

  return (
    <div
      className={isMobile ? "mt-3" : "mt-5"}
      style={{
        marginTop: "50px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <Container
        className={
          "d-flex flex-column justify-content-center align-items-center " +
          isMobile
            ? "mb-4"
            : "mb-5"
        }
      >
        <h1
          className="text-center"
          style={{
            fontSize: isMobile ? "50px" : "60px",
            fontFamily: "Playfair Display, serif",
            fontWeight: 900,
          }}
        >
          Susie.
        </h1>
        <h2
          className="text-center"
          style={{
            fontSize: isMobile ? "28px" : "40px",
            fontFamily: "Playfair Display, serif",
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
            fontSize: isMobile ? "16px" : "18px",
          }}
        >
          {isMobile
            ? "How sustainable is your repository?"
            : "How sustainable is your GitHub repository?"}
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
          className={`text-center font-weight-bold ${
            isMobile ? "mb-3" : "mb-4"
          }`}
          style={{
            fontSize: isMobile ? "16px" : "18px",
          }}
        >
          {isMobile
            ? "Learn more about sustainability!"
            : "Perhaps you want to learn more about sustainability? Look no further!"}
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
