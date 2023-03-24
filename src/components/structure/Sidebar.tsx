import { ReactNode } from "react";
import { ListGroup } from "react-bootstrap";
import "../../css/Sidebar.css";

interface SidebarProps {
  sections: { title: string; content: ReactNode }[];
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

  return (
    <div className="sidebar">
      <ListGroup>
        {props.sections.map((section, index) => (
          <ListGroup.Item
            onClick={() => handleClick(section.title)}
            key={index}
          >
            {section.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Sidebar;
