import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import "../../../css/GuidePage.css";

function EnergyConsumptionGuide() {
    return (
        <Container className="guide-page-container">
            <Row>
                <Col>
                    <h3>Energy Efficient Software Development</h3>
                    <h5>Workflow runs</h5>
                    <p>Having many failing builds in your repo is not very energy efficient. Running the workflows locally before executing them remotely is beneficial for saving on energy usage.
                        Running locally is more efficient than running gloablly, as executing workflows remotely involves utilizing resources such as servers and data centers that require a significant amount of energy.
                        In conclusion, always test your workflows builds locally before executing them remotely on GitHub.</p>

                    <h5>Programming Languages</h5>
                    <p>Programming languages can vary significantly in terms of their energy consumption. As such, understanding the energy consumption of programming languages is crucial to reduce the carbon footprint and promote sustainable practices in software development.
                        In this table, we provide the energy consumption scores for different programming languages relative to each others. The scores in this table are used to give you advice on your programming language usage.
                        You might be able to consult it for further projects that focus on energy efficiency.</p>
                    <Table className='table-dark table-bordered table-striped'>
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
                    <h4>Sources</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">https://greenlab.di.uminho.pt/wp-content/uploads/2017/10/sleFinal.pdf.</li>
                        <li className="list-group-item">Here will be a link to a source for workflow runs.</li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default EnergyConsumptionGuide;