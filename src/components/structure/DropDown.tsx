import { useState } from "react";
import { Collapse } from "react-bootstrap";
import "../../css/Recommendation.css";

interface Props {
  header: string;
  collapsed: boolean;
  children: React.ReactNode;
}

function DropDown(props: Props) {
  const [isOpen, setIsOpen] = useState(!props.collapsed);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="recommendation-container">
      <div className="recommendation-header" onClick={toggleDropdown}>
        <h6>{props.header}</h6>
      </div>
      {props.children && (
        <Collapse in={isOpen}>
          <div className="recommendation-body mb-3">{props.children}</div>
        </Collapse>
      )}
    </div>
  );
}

export default DropDown;
