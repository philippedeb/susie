import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData } from "../logic/fetcher";
import Inclusive from "./Inclusive";

interface DashboardProps {
  repoLink: string;
}

function Dashboard(props: DashboardProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search") || "";

  const [branches, setBranches] = useState<string[]>([]);
  const [pullRequests, setPullRequests] = useState<string[]>([]);
  const [commits, setCommits] = useState<string[]>([]);

  const [inclusiveData, setInclusiveData] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(searchValue);
      setBranches(data.branches);
      setPullRequests(data.pull_requests);
      setCommits(data.commits);
    };
    fetchData();
  }, [searchValue]);

  useEffect(() => {
    const inclusiveArray = [...branches, ...pullRequests, ...commits];
    setInclusiveData(inclusiveArray);
  }, [branches, pullRequests, commits]);

  return (
    <div>
      <Container>
        <p>Dashboard for {searchValue}</p>
        <Inclusive data={inclusiveData} />
        <h3>Branches:</h3>
        <ul>
          {branches.map((branch, index) => (
            <li key={index}>{branch}</li>
          ))}
        </ul>
        <h3>Pull Requests:</h3>
        <ul>
          {pullRequests.map((pullRequest, index) => (
            <li key={index}>{pullRequest}</li>
          ))}
        </ul>
        <h3>Commits:</h3>
        <ul>
          {commits.map((commit, index) => (
            <li key={index}>{commit}</li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

export default Dashboard;
