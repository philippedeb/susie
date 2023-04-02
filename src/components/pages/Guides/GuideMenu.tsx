import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Guide from "./GuideMenuItem";
import "../../../css/Guides.css";
import "../../../css/Guide.css";

function Guides() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container>
      <div className="title-container fade-in-down">
        <h2 className="main-title">Guides</h2>
        <h4
          className="sub-title"
          style={{ fontSize: isMobile ? "1.35rem" : "1.5rem" }}
        >
          {isMobile
            ? "Explore more about sustainability"
            : "Explore more about sustainability here.. 🗂️"}
        </h4>
      </div>
      <div className="guides-container fade-in-after">
        <Guide
          guideTitle="Sustainability Types"
          description="No, it's not all environmental.. 🌱"
          guideKey={"types-of-sustainability"}
        />
        <Guide
          guideTitle="Inclusive Language"
          description="Change your lingo! 💬"
          guideKey={"inclusive-language"}
        />
        <Guide
          guideTitle="Programming Languages"
          description="How energy efficient are they? 🔬"
          guideKey={"programming-languages"}
        />
      </div>
    </Container>
  );
}

export default Guides;
