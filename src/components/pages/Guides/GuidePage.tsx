import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../../css/GuidePage.css";

type GuidePageProps = {
  title: string;
  children: React.ReactNode;
};

function GuidePage(props: GuidePageProps) {
  return (
    <div className="guide-page">
      <h1 className="guide-page-title">{props.title}</h1>
      <Container className="guide-page-container">
        <Row>
          <Col>{props.children}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default GuidePage;
