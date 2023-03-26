import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData, getSlash } from "../../../logic/fetcher";
import Inclusive from "../../metrics/Inclusivity/Inclusive";
import "../../../css/Dashboard.css";
import DashboardInfo from "./DashboardInfo";
import WorkflowAnalysis from "../../metrics/Workflows/WorkflowAnalysis";
import Info from "../../metrics/General/Info";
import Governance from "../../metrics/Governance/Governance";
import DashboardComponents from "./DashboardComponents";
import "../../../css/Link.css";
import ProgrammingLanguage from "../../metrics/Language/ProgrammingLanguage";

function Dashboard() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search") || "";

  const [branches, setBranches] = useState<string[]>([]);
  const [pullRequests, setPullRequests] = useState<string[]>([]);
  const [commits, setCommits] = useState<string[]>([]);
  const [languages, setLanguages] = useState<{ [key: string]: number }>({});
  const [issues, setIssues] = useState<string[]>([]);
  const [workflows, setWorkflows] = useState<string[]>([]);

  const [readme, setReadMe] = useState<string>(""); // README.md
  const [license, setLicense] = useState<string>(""); // LICENSE.md
  const [changeLog, setChangeLog] = useState<string>(""); // CHANGELOG.md
  const [codeOfConduct, setCodeOfConduct] = useState<string>(""); // CODE_OF_CONDUCT.md
  const [contributing, setContributing] = useState<string>(""); // CONTRIBUTING.md
  const [issueTemplate, setIssueTemplate] = useState<string>(""); // ISSUE_TEMPLATE.md
  const [pullRequestTemplate, setPullRequestTemplate] = useState<string>(""); // PULL_REQUEST_TEMPLATE.md

  const [inclusiveData, setInclusiveData] = useState<string[]>([]);

  const [hasReadme, setHasReadme] = useState(false);
  const [hasLicense, setHasLicense] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [successLoading, setSuccessLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(searchValue);
      setBranches(data.branches);
      setPullRequests(data.pull_requests);
      setCommits(data.commits);
      setLanguages(data.languages);
      setIssues(data.issues);
      setWorkflows(data.runs);

      setReadMe(data.readme);
      setLicense(data.license);
      setChangeLog(data.changelog);
      setCodeOfConduct(data.codeOfConduct);
      setContributing(data.contributingGuidelines);
      setIssueTemplate(data.issueTemplate);
      setPullRequestTemplate(data.prTemplate);

      const hasReadme = await getSlash(searchValue, "readme");
      const hasLicense = await getSlash(searchValue, "license");
      setHasReadme(hasReadme);
      setHasLicense(hasLicense);

      // ! Must be last in fetchData to ensure all data is fetched before setting isLoading to false (loading icon) and successLoading to true (no error message)
      setSuccessLoading(branches.length > 0);
      setIsLoading(false);
    };
    fetchData();
  }, [searchValue]); // only run when searchValue changes

  useEffect(() => {
    const inclusiveArray = [
      ...branches,
      ...pullRequests,
      ...commits,
      ...issues,
      ...workflows,
      readme,
      // license,
      changeLog,
      codeOfConduct,
      contributing,
      issueTemplate,
      pullRequestTemplate,
    ];
    setInclusiveData(inclusiveArray);
  }, [
    branches,
    pullRequests,
    commits,
    issues,
    workflows,
    readme,
    license,
    changeLog,
    codeOfConduct,
    contributing,
    issueTemplate,
    pullRequestTemplate,
  ]); // only run when any of the inclusive data changes (license is not excluded as it makes sense to mention "owner" from legal perspective)

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
      title: "Workflow",
      content: <WorkflowAnalysis statusses={workflows} />,
    },
    {
      title: "Governance",
      content: (
        <Governance
          hasReadme={hasReadme}
          hasLicense={hasLicense}
          readme={readme}
          license={license}
          changeLog={changeLog}
          codeOfConduct={codeOfConduct}
          contributing={contributing}
          issueTemplate={issueTemplate}
          pullRequestTemplate={pullRequestTemplate}
        />
      ),
    },
    {
      title: "Sustainable Programming Languages",
      content: <ProgrammingLanguage languages={languages} />,
    },
  ];

  return (
    <>
      <DashboardInfo repoLink={searchValue} />
      <DashboardComponents
        sections={sections}
        isLoading={isLoading}
        successLoading={successLoading}
      />
    </>
  );
}

export default Dashboard;
