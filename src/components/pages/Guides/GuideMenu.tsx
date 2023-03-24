import React from "react";
import { Container } from "react-bootstrap";
import Guide from "./GuideMenuItem";
import "../../../css/Guides.css";
import "../../../css/Guide.css";

function Guides() {
  return (
    <Container>
      <div className="title-container fade-in-down">
        <h2 className="main-title">Guides</h2>
        <h4 className="sub-title">
          Explore more about sustainability here.. 🗂️
        </h4>
      </div>
      <div className="guides-container fade-in-after">
        <Guide
          guideTitle="Inclusive Language"
          description="Change your lingo! 💬"
          guideKey={"inclusive-language"}
        />
        <Guide
          guideTitle="Energy efficiency in Software Development"
          description="How efficient are your programming languages and workflow builds? 📈"
          guideKey={"software-efficiency"}
        />
      </div>
    </Container>
  );
}

export default Guides;
