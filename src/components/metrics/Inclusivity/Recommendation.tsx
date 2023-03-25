import { useState } from "react";
import { Collapse } from "react-bootstrap";
import "../../../css/Recommendation.css";

interface Props {
  title: string;
  replacements: string[];
  locations: string[];
}

function Recommendation(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="recommendation-container">
      <div className="recommendation-header" onClick={toggleDropdown}>
        <h6>
          {props.title} {" → " + props.replacements.join(", ")}
        </h6>
      </div>
      <Collapse in={isOpen}>
        <div className="recommendation-body">
          <p>
            The term <b>{props.title}</b> was found in the following branches,
            issues, commits or pull requests:
            <ul>
              {props.locations.map((location) => (
                <li key={location} className="mt-2">
                  {location}
                </li>
              ))}
            </ul>
          </p>
        </div>
      </Collapse>
    </div>
  );
}

export default Recommendation;
