import { Container, Row, Col, Spinner } from "react-bootstrap";
import Section from "../../structure/Section";
import Sidebar from "../../structure/Sidebar";

interface Props {
  sections: { title: string; content: JSX.Element }[];
  isLoading: boolean;
}

function DashboardComponents(props: Props) {
  return (
    <div>
      <Container>
        <Row>
          <Col sm={4}>
            <Sidebar sections={props.sections} />
          </Col>
          <Col sm={{ span: 8, offset: 2 }} className="sections-col">
            {props.isLoading ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" />
              </div>
            ) : (
              props.sections.map((section, index) => (
                <Section guideKey={index} title={section.title}>
                  {section.content}
                </Section>
              ))
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DashboardComponents;
