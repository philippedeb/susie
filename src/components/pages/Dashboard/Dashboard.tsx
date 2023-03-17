import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData } from "../../../logic/fetcher";
import Inclusive from "../../metrics/Inclusive";
import Sidebar from "../../structure/Sidebar";
import Section from "../../structure/Section";
import "../../../css/Dashboard.css";
import DashboardInfo from "./DashboardInfo";

function Dashboard() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search") || "";

  const [branches, setBranches] = useState<string[]>([]);
  const [pullRequests, setPullRequests] = useState<string[]>([]);
  const [commits, setCommits] = useState<string[]>([]);

  const [inclusiveData, setInclusiveData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(searchValue);
      setBranches(data.branches);
      setPullRequests(data.pull_requests);
      setCommits(data.commits);
      setIsLoading(false);
    };
    fetchData();
  }, [searchValue]);

  useEffect(() => {
    const inclusiveArray = [...branches, ...pullRequests, ...commits];
    setInclusiveData(inclusiveArray);
  }, [branches, pullRequests, commits]);

  const sections = [
    {
      title: "Info",
      content: (
        <ul>
          <li>
            <strong>Commits:</strong> {commits.length}
          </li>
          <li>
            <strong>Pull Requests:</strong> {pullRequests.length}
          </li>
          <li>
            <strong>Branches:</strong> {branches.length}
          </li>
        </ul>
      ),
    },
    {
      title: "Inclusive Language",
      content: <Inclusive data={inclusiveData} />,
    },
  ];

  return (
    <>
      <DashboardInfo repoLink={searchValue} />
      <div>
        <Container>
          <Row>
            <Col>
              <Sidebar sections={sections} />
            </Col>
            <Col sm={{ span: 12 }} className="sections-col">
              {isLoading ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" />
                </div>
              ) : (
                sections.map((section, index) => (
                  <Section key={index} title={section.title}>
                    {section.content}
                  </Section>
                ))
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Dashboard;
