import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData, getSlash } from "../../../logic/fetcher";
import Inclusive from "../../metrics/Inclusivity/Inclusive";
import "../../../css/Dashboard.css";
import DashboardInfo from "./DashboardInfo";
import LanguagePiechart from "../../metrics/Language/LanguagePiechart";
import LanguageAdvise from "../../metrics/Language/LanguageAdvise";
import Info from "../../metrics/General/Info";
import Governance from "../../metrics/Governance/Governance";
import DashboardComponents from "./DashboardComponents";

function Dashboard() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search") || "";

  const [branches, setBranches] = useState<string[]>([]);
  const [pullRequests, setPullRequests] = useState<string[]>([]);
  const [commits, setCommits] = useState<string[]>([]);
  const [languages, setLanguages] = useState<{ [key: string]: number }>({});
  const [issues, setIssues] = useState<string[]>([]);

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
      setIssues(data.issues);

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
    const inclusiveArray = [
      ...branches,
      ...pullRequests,
      ...commits,
      ...issues,
    ];
    setInclusiveData(inclusiveArray);
  }, [branches, pullRequests, commits]);

  const sections = [
    {
      title: "Info",
      content: (
        <Info
          commits={commits.length}
          pullRequests={pullRequests.length}
          branches={branches.length}
          issues={issues.length}
        />
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
      content: <Governance hasReadme={hasReadme} hasLicense={hasLicense} />,
    },
  ];

  return (
    <>
      <DashboardInfo repoLink={searchValue} />
      <DashboardComponents sections={sections} isLoading={isLoading} />
    </>
  );
}

export default Dashboard;
