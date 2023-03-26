import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import Section from "../../structure/Section";
import Sidebar from "../../structure/Sidebar";

interface Props {
  sections: { title: string; content: JSX.Element }[];
  isLoading: boolean;
  successLoading: boolean;
}

function DashboardComponents(props: Props) {
  const sections = props.sections.map((section, index) => (
    <Section key={index} title={section.title}>
      {section.content}
    </Section>
  ));

  const listOfSections: JSX.Element = <> {sections} </>;

  const couldNotLoad: JSX.Element = (
    <>
      <Alert variant="danger">Could not load data.. 😭</Alert>
      <Alert variant="warning">
        💡 You might have searched for a non-existing repository.{" "}
      </Alert>
      <Alert variant="warning">
        💡 You might have been rate limited by the API for exceeding the number
        of requests allowed per hour per IP.{" "}
      </Alert>
    </>
  );

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
            ) : props.successLoading ? (
              listOfSections
            ) : (
              couldNotLoad
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DashboardComponents;
