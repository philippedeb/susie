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
          {props.title}{" "}
          {props.replacements.length > 0
            ? " → " + props.replacements.join(", ")
            : ""}
        </h6>
      </div>
      <Collapse in={isOpen}>
        <div className="recommendation-body">
          <p>
            {props.replacements.length > 0
              ? 'The term "' +
                props.title +
                '" was found in the following branches, issues, commits or pull requests:'
              : "Based on the following branches, issues, commits or pull requests:"}
          </p>
          <ul>
            {props.locations.map((location) => (
              <li key={location} className="mt-2">
                {location}
              </li>
            ))}
          </ul>
        </div>
      </Collapse>
    </div>
  );
}

export default Recommendation;
