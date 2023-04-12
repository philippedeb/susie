import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import DropDown from "../../structure/DropDown";
import Section from "../../structure/Section";
import Sidebar from "../../structure/Sidebar";

interface Props {
  sections: { title: string; content: JSX.Element }[];
  experimentalSections: { title: string; content: JSX.Element }[];
  isLoading: boolean;
  errorMsg: string;
}

function DashboardComponents(props: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [experimentalMode, setExperimentalMode] = useState(false);

  const checkIfMobile = function () {
    let check = false;
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    check = mediaQuery.matches;
    if (check) return check;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || (window as any).opera);
    return check;
  };

  useEffect(() => {
    setIsMobile(checkIfMobile());
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const sections = props.sections.map((section, index) => (
    <Section key={index} title={section.title}>
      {section.content}
    </Section>
  ));

  const experimentalSections = props.experimentalSections.map(
    (section, index) => (
      <Section key={props.sections.length + index} title={section.title}>
        {section.content}
      </Section>
    )
  );

  function toggleExperimentalMode() {
    setExperimentalMode(!experimentalMode);
  }

  const experimentalButton = (
    <Container
      id="experimental-metrics"
      className="d-flex flex-column align-items-center justify-content-center mb-3"
    >
      <DropDown header={"See experimental metrics 🛸"} collapsed={true}>
        <Alert variant="light" id="experimental-info" className="mt-3">
          <Alert.Heading>Important Note ⚠️</Alert.Heading>
          <p>
            Some of the ongoing developments for Susie's dashboard have
            suboptimal accuracy or a non-evident purpose. Therefore, to keep
            Susie credible, these are omitted by default.
            <br /> <br />
            However, who are we to stop you from exploring them? 🤷‍♂️ If you are
            cautious yet curious, you can enable them by clicking the button
            below. Just know, there is no way back.. until the next analysis.{" "}
            <br /> <br />
            Please consider contributing to our{" "}
            <a
              className="susie-link"
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repository
            </a>{" "}
            to help us improve and expand Susie. Together, we can make a
            difference! 🤝
          </p>
        </Alert>
        <Row>
          <Col>
            <Button
              variant="secondary"
              onClick={toggleExperimentalMode}
              className="experimental-button"
            >
              {" "}
              Enter experimental space 👽{" "}
            </Button>
          </Col>
        </Row>
      </DropDown>
    </Container>
  );

  const listOfSections: JSX.Element = (
    <>
      {sections}
      {experimentalMode ? experimentalSections : experimentalButton}
    </>
  );

  const rateLimited: JSX.Element = (
    <>
      <Alert variant="danger">
        You have been rate-limited by the API for exceeding the number of
        requests allowed per hour per IP.. 😭
      </Alert>
      <Alert variant="warning">
        Why does this happen? Learn more{" "}
        <a
          href="https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
          target="_blank"
          rel="noopener noreferrer"
        >
          about GitHub rate-limiting here
        </a>
        .{" "}
      </Alert>
      <Alert variant="success">
        Fix it by switching IPs or contact the developers for a (paid) secret
        key.. 🔑{" "}
      </Alert>
    </>
  );

  const getErrorDisplay = (errorMessage: string) => {
    if (errorMessage.includes("API rate limit")) {
      console.log("Rate limited! (403)");
      return rateLimited as JSX.Element;
    }
    if (errorMessage.includes("ERROR in fetching data")) {
      console.log("Uh oh, could not load all data (404)..");
      return listOfSections;
    }
    console.log("*unknown error appeared* 💀");
    return (
      <Alert variant="danger">
        <b>ERROR 💀</b> <br></br>
        {"Details: " + errorMessage}
      </Alert>
    ) as JSX.Element;
  };

  return (
    <div>
      <Container>
        <Row>
          {window.innerWidth > 800 && !isMobile && (
            <Col sm={4}>
              <Sidebar
                sections={props.sections}
                experimentalSections={props.experimentalSections}
                experimentalMode={experimentalMode}
              />
            </Col>
          )}
          <Col sm={{ span: 8, offset: 2 }} className="sections-col">
            {props.isLoading ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" />
              </div>
            ) : props.errorMsg !== "" ? (
              getErrorDisplay(props.errorMsg)
            ) : (
              listOfSections
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DashboardComponents;
