import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../../../css/Guide.css";

type GuideProps = {
  guideTitle: string;
  description: string;
  guideKey: string;
};

function Guide(props: GuideProps) {
  return (
    <Card className="guide">
      <Link to={`/susie/guide?name=${props.guideKey}`}>
        <Card.Body>
          <Card.Title className="card-title" key={props.guideKey}>
            {props.guideTitle}
          </Card.Title>
          <Card.Text className="card-description">
            {props.description}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default Guide;
