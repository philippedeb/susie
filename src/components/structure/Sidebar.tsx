import { ReactNode } from "react";
import { ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import "../../css/Sidebar.css";

interface SidebarProps {
  sections: { title: string; content: ReactNode }[];
  experimentalSections: { title: string; content: ReactNode }[];
  experimentalMode: boolean;
}

function Sidebar(props: SidebarProps) {
  const handleClick = (title: string) => {
    const element = document.getElementById(
      title.toLowerCase().replace(" ", "-")
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const tooltip = <Tooltip id="sidebar-tooltip">Click any section 🛸 </Tooltip>;

  return (
    <div className="sidebar d-none d-xl-block">
      <div className="sidebar-title">
        <OverlayTrigger placement="top" overlay={tooltip}>
          <h6>Sections</h6>
        </OverlayTrigger>
      </div>
      <ListGroup>
        {props.sections.map((section, index) => (
          <ListGroup.Item
            onClick={() => handleClick(section.title)}
            key={index}
          >
            {section.title}
          </ListGroup.Item>
        ))}
        {props.experimentalMode ? (
          props.experimentalSections.map((section, index) => (
            <ListGroup.Item
              onClick={() => handleClick(section.title)}
              key={props.sections.length + index}
            >
              {section.title}
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item
            onClick={() => handleClick("Experimental metrics")}
            key={props.sections.length + props.experimentalSections.length}
          >
            {" "}
            Experimental metrics{" "}
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
}

export default Sidebar;
