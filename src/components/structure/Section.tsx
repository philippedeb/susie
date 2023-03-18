import { ReactNode } from "react";
import "../../css/Section.css";

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section(props: SectionProps) {
  return (
    <div
      id={props.title.toLowerCase().replace(" ", "-")}
      className="section mb-3"
    >
      <h3>{props.title}</h3>
      <div className="section-content">{props.children}</div>
    </div>
  );
}

export default Section;
