import { ReactNode, useEffect, useState } from "react";
import "../../css/Section.css";

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section(props: SectionProps) {
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
    <div
      id={props.title.toLowerCase().replace(" ", "-")}
      className="section mb-3"
    >
      {isMobile ? <h4>{props.title}</h4> : <h3>{props.title}</h3>}
      <hr />
      <div className="section-content">{props.children}</div>
    </div>
  );
}

export default Section;
