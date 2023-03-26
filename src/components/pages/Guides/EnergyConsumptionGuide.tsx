import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import "../../../css/GuidePage.css";

function EnergyConsumptionGuide() {
  return (
    <Container className="guide-page-container">
      <Row>
        <Col>
          <h3>Energy Efficient Software Development</h3>
          <p>
            Programming languages can vary significantly in terms of their
            energy consumption. As such, understanding the energy consumption of
            programming languages is crucial to reduce the carbon footprint and
            promote sustainable practices in software development. In this
            table, an overview of the energy consumption scores for different
            programming languages is provided.
            <br /> <br />
            Susie uses these scores to give advice on the programming language
            usage in a repository. Hopefully, you can also learn something from
            it and create energy efficient projects in the future! 🔮
            <br />
          </p>
          <Table className="table-dark table-bordered table-striped">
            <thead>
              <tr>
                <th>Programming Language</th>
                <th>Energy Consumption Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>C</td>
                <td>1.00</td>
              </tr>
              <tr>
                <td>Rust</td>
                <td>1.03</td>
              </tr>
              <tr>
                <td>C++</td>
                <td>1.34</td>
              </tr>
              <tr>
                <td>Ada</td>
                <td>1.70</td>
              </tr>
              <tr>
                <td>Java</td>
                <td>1.98</td>
              </tr>
              <tr>
                <td>Pascal</td>
                <td>2.14</td>
              </tr>
              <tr>
                <td>Chapel</td>
                <td>2.18</td>
              </tr>
              <tr>
                <td>Lisp</td>
                <td>2.27</td>
              </tr>
              <tr>
                <td>Ocaml</td>
                <td>2.40</td>
              </tr>
              <tr>
                <td>Fortran</td>
                <td>2.52</td>
              </tr>
              <tr>
                <td>Swift</td>
                <td>2.79</td>
              </tr>
              <tr>
                <td>Haskell</td>
                <td>3.10</td>
              </tr>
              <tr>
                <td>C#</td>
                <td>3.14</td>
              </tr>
              <tr>
                <td>Go</td>
                <td>3.23</td>
              </tr>
              <tr>
                <td>Dart</td>
                <td>3.83</td>
              </tr>
              <tr>
                <td>F#</td>
                <td>4.13</td>
              </tr>
              <tr>
                <td>JavaScript</td>
                <td>4.45</td>
              </tr>
              <tr>
                <td>Racket</td>
                <td>7.91</td>
              </tr>
              <tr>
                <td>TypeScript</td>
                <td>21.50</td>
              </tr>
              <tr>
                <td>Hack</td>
                <td>24.02</td>
              </tr>
              <tr>
                <td>PHP</td>
                <td>29.30</td>
              </tr>
              <tr>
                <td>Erlang</td>
                <td>42.23</td>
              </tr>
              <tr>
                <td>Lua</td>
                <td>45.98</td>
              </tr>
              <tr>
                <td>Jruby</td>
                <td>46.54</td>
              </tr>
              <tr>
                <td>Ruby</td>
                <td>69.91</td>
              </tr>
              <tr>
                <td>Python</td>
                <td>75.88</td>
              </tr>
              <tr>
                <td>Perl</td>
                <td>79.58</td>
              </tr>
            </tbody>
          </Table>
          <p>
            <b> Source: </b>
            <a
              href="https://greenlab.di.uminho.pt/wp-content/uploads/2017/10/sleFinal.pdf."
              className="susie-link-light"
            >
              {" "}
              https://greenlab.di.uminho.pt/wp-content/uploads/2017/10/sleFinal.pdf.{" "}
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default EnergyConsumptionGuide;
