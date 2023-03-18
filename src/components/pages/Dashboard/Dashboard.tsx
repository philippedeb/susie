import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData, getSlash } from "../../../logic/fetcher";
import Inclusive from "../../metrics/Inclusivity/Inclusive";
import Sidebar from "../../structure/Sidebar";
import Section from "../../structure/Section";
import "../../../css/Dashboard.css";
import DashboardInfo from "./DashboardInfo";
import LanguagePiechart from "../../metrics/Language/LanguagePiechart";
import LanguageAdvise from "../../metrics/Language/LanguageAdvise";

function Dashboard() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search") || "";

  const [branches, setBranches] = useState<string[]>([]);
  const [pullRequests, setPullRequests] = useState<string[]>([]);
  const [commits, setCommits] = useState<string[]>([]);
  const [languages, setLanguages] = useState<{ [key: string]: number }>({});

  const [inclusiveData, setInclusiveData] = useState<string[]>([]);

  const [hasReadme, setHasReadme] = useState(false);
  const [hasLicense, setHasLicense] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(searchValue);
      setBranches(data.branches);
      setPullRequests(data.pull_requests);
      setCommits(data.commits);
      setLanguages(data.languages);

      const hasReadme = await getSlash(searchValue, "readme");
      const hasLicense = await getSlash(searchValue, "license");
      setHasReadme(hasReadme);
      setHasLicense(hasLicense);

      // ! Must be last in fetchData to ensure all data is fetched before setting isLoading to false
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
    {
      title: "Programming Languages",
      content: (
        <>
          <LanguagePiechart languages={languages} />
          <LanguageAdvise languages={languages} threshold={20.0} />
        </>
      ),
    },
    {
      title: "Governance",
      content: (
        <ul>
          <li>
            <strong>Readme:</strong> {hasReadme ? "✅" : "⛔"}
          </li>
          <li>
            <strong>License:</strong> {hasLicense ? "✅" : "⛔"}
          </li>
        </ul>
      ),
    },
  ];

  return (
    <>
      <DashboardInfo repoLink={searchValue} />
      <div>
        <Container>
          <Row>
            <Col sm={4}>
              <Sidebar sections={sections} />
            </Col>
            <Col sm={{ span: 8, offset: 2 }} className="sections-col">
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
