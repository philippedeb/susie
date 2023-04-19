import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../../../css/Guide.css";
import { useEffect, useState } from "react";

type GuideProps = {
  guideTitle: string;
  description: string;
  guideKey: string;
};

function Guide(props: GuideProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 800);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card className="guide">
      <Link to={`/guide?name=${props.guideKey}`}>
        <Card.Body>
          <Card.Title className="card-title" key={props.guideKey}>
            {props.guideTitle}
          </Card.Title>
          <Card.Text
            className="card-description"
            style={{ fontSize: isMobile ? "1rem" : "1.15rem" }}
          >
            {props.description}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default Guide;
