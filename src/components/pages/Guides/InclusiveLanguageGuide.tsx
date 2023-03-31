import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import "../../../css/GuidePage.css";
import "../../../css/Link.css";

function InclusiveLanguageGuide() {
  return (
    <Container className="guide-page-container">
      <Row>
        <Col>
          <h3>Language in GitHub repositories</h3>
          <p>
            Inclusive language is crucial in GitHub repositories because it
            helps to create a welcoming and respectful environment for all
            contributors, regardless of their background or identity. Using
            inclusive language means choosing words and phrases that do not
            exclude or marginalize certain groups of people. This includes
            avoiding the use of gendered pronouns or terms that may be offensive
            or insensitive to particular cultures or identities. By using
            inclusive language in GitHub repositories, developers can foster a
            more diverse and inclusive community that encourages participation
            from individuals of all backgrounds, ultimately leading to better
            collaboration, innovation, and success of the project. Additionally,
            using inclusive language can also help to mitigate the risk of
            misunderstandings or conflicts that may arise from insensitive
            language use.
          </p>
          <p>
            The table below can be used as a reference for conducting inclusive
            language checks in GitHub repositories. It provides examples of
            common terms and phrases that may be considered insensitive or
            exclusionary to certain groups of people. By using this table as a
            guide, individuals can be more mindful of their language choices and
            make conscious efforts to use language that is inclusive and
            respectful to all. Be aware, this table is not exhaustive (e.g.
            cursewords are missing) and there may be other terms and phrases
            that are considered insensitive or exclusionary. If you are unsure
            about the appropriateness of a particular term or phrase, it is
            recommended to consult with individuals who are part of the group
            that may be affected by the language.
          </p>
          <Table className="table-dark table-bordered table-striped">
            <thead>
              <tr>
                <th>Common Terms/Phrases</th>
                <th>Inclusive Suggestions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>master/slave</td>
                <td>main/replica, leader/follower, primary/secondary</td>
              </tr>
              <tr>
                <td>whitelist</td>
                <td>allow list, inclusion list, safe list</td>
              </tr>
              <tr>
                <td>blacklist</td>
                <td>deny list, exclusion list, block list, banned list</td>
              </tr>
              <tr>
                <td>man hours</td>
                <td>labor hours, work hours, person hours, engineer hours</td>
              </tr>
              <tr>
                <td>manpower</td>
                <td>labor, workforce</td>
              </tr>
              <tr>
                <td>guys</td>
                <td>folks, people, you all</td>
              </tr>
              <tr>
                <td>girl/girls</td>
                <td>woman/women</td>
              </tr>
              <tr>
                <td>middleman</td>
                <td>middle person, mediator, liaison</td>
              </tr>
              <tr>
                <td>he/she, him/her, his/hers</td>
                <td>they, them, theirs</td>
              </tr>
              <tr>
                <td>crazy/insane</td>
                <td>unpredictable, unexpected</td>
              </tr>
              <tr>
                <td>normal/abnormal</td>
                <td>typical/atypical</td>
              </tr>
              <tr>
                <td>grandfather</td>
                <td>flagship, established, rollover, carryover</td>
              </tr>
              <tr>
                <td>grandfathering/legacy</td>
                <td>flagship, established, rollover, carryover</td>
              </tr>
              <tr>
                <td>crushing it/killing it</td>
                <td>elevating, exceeding expectations, excelling</td>
              </tr>
              <tr>
                <td>owner</td>
                <td>lead, manager, expert</td>
              </tr>
              <tr>
                <td>sanity check</td>
                <td>quick check, confidence check, coherence check</td>
              </tr>
              <tr>
                <td>dummy value</td>
                <td>placeholder value, sample value</td>
              </tr>
              <tr>
                <td>native feature</td>
                <td>core feature, built-in feature</td>
              </tr>
              <tr>
                <td>culture fit</td>
                <td>values fit</td>
              </tr>
              <tr>
                <td>housekeeping</td>
                <td>cleanup, maintenance</td>
              </tr>
            </tbody>
          </Table>
          <p>
            <b> Source: </b>
            <a
            href="https://www.aswf.io/blog/inclusive-language/"
            className="susie-link-light"
            >
              {" "}
              https://www.aswf.io/blog/inclusive-language/{" "}
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default InclusiveLanguageGuide;
