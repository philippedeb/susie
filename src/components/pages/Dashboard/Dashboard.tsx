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
import Contributors from "../../metrics/Contributors/Contributors";
import IssuesSentiment from "../../metrics/Sentiment/IssuesSentiment";

function Dashboard() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search") || "";

  const [branches, setBranches] = useState<string[]>([]);
  const [pullRequests, setPullRequests] = useState<string[]>([]);
  const [commitMessages, setCommitMessages] = useState<string[]>([]);
  const [languages, setLanguages] = useState<{ [key: string]: number }>({});
  const [issues, setIssues] = useState<string[]>([]);
  const [workflows, setWorkflows] = useState<string[]>([]);

  const [contributorData, setContributorData] = useState<[string, string][]>(
    []
  );

  const [readme, setReadMe] = useState<string>(""); // README.md
  const [license, setLicense] = useState<string>(""); // LICENSE.md
  const [changeLog, setChangeLog] = useState<string>(""); // CHANGELOG.md
  const [codeOfConduct, setCodeOfConduct] = useState<string>(""); // CODE_OF_CONDUCT.md
  const [contributing, setContributing] = useState<string>(""); // CONTRIBUTING.md
  const [issueTemplate, setIssueTemplate] = useState<string>(""); // ISSUE_TEMPLATE.md
  const [pullRequestTemplate, setPullRequestTemplate] = useState<string>(""); // PULL_REQUEST_TEMPLATE.md

  const [inclusiveData, setInclusiveData] = useState<string[]>([]);

  const [errorMsg, setErrorMsg] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleErrorMsg = (error: Error) => {
      if (!errorMsg.includes("API rate limit")) {
        setErrorMsg(error.message);
      }
    };

    const fetchData = async () => {
      try {
        const data = await getData(searchValue);

        if (data instanceof Error) {
          throw data;
        }

        var inclusiveArray = [];

        var dataIsError: boolean = false;
        if (!(data.branches instanceof Error)) {
          setBranches(data.branches as string[]);
          inclusiveArray.push(...data.branches);
        } else {
          dataIsError = true;
          handleErrorMsg(data.branches);
        }
        if (!(data.pull_requests instanceof Error)) {
          setPullRequests(data.pull_requests as string[]);
          inclusiveArray.push(...data.pull_requests);
        } else {
          dataIsError = true;
          handleErrorMsg(data.pull_requests);
        }
        if (!(data.commitMessages instanceof Error)) {
          setCommitMessages(data.commitMessages as string[]);
          inclusiveArray.push(...data.commitMessages);
        } else {
          dataIsError = true;
          handleErrorMsg(data.commitMessages);
        }
        if (!(data.languages instanceof Error)) {
          setLanguages(data.languages as { [key: string]: number });
        } else {
          dataIsError = true;
          handleErrorMsg(data.languages);
        }
        if (!(data.issues instanceof Error)) {
          setIssues(data.issues as string[]);
          inclusiveArray.push(...data.issues);
        } else {
          dataIsError = true;
          handleErrorMsg(data.issues);
        }
        if (!(data.commitAuthorDates instanceof Error)) {
          setContributorData(data.commitAuthorDates as [string, string][]);
        } else {
          dataIsError = true;
          handleErrorMsg(data.commitAuthorDates);
        }
        if (!(data.runs instanceof Error)) {
          setWorkflows(data.runs as string[]);
          inclusiveArray.push(...data.runs);
        } else {
          dataIsError = true;
          handleErrorMsg(data.runs);
        }

        if (!(data.readme instanceof Error)) {
          setReadMe(data.readme as string);
          inclusiveArray.push(data.readme);
        } else {
          dataIsError = true;
          handleErrorMsg(data.readme);
        }
        if (!(data.license instanceof Error)) {
          setLicense(data.license as string);
        } else {
          dataIsError = true;
          handleErrorMsg(data.license);
        }
        if (!(data.changelog instanceof Error)) {
          setChangeLog(data.changelog as string);
          inclusiveArray.push(data.changelog);
        } else {
          dataIsError = true;
          handleErrorMsg(data.changelog);
        }
        if (!(data.codeOfConduct instanceof Error)) {
          setCodeOfConduct(data.codeOfConduct as string);
          inclusiveArray.push(data.codeOfConduct);
        } else {
          dataIsError = true;
          handleErrorMsg(data.codeOfConduct);
        }
        if (!(data.contributingGuidelines instanceof Error)) {
          setContributing(data.contributingGuidelines as string);
          inclusiveArray.push(data.contributingGuidelines);
        } else {
          dataIsError = true;
          handleErrorMsg(data.contributingGuidelines);
        }
        if (!(data.issueTemplate instanceof Error)) {
          setIssueTemplate(data.issueTemplate as string);
          inclusiveArray.push(data.issueTemplate);
        } else {
          dataIsError = true;
          handleErrorMsg(data.issueTemplate);
        }
        if (!(data.prTemplate instanceof Error)) {
          setPullRequestTemplate(data.prTemplate as string);
          inclusiveArray.push(data.prTemplate);
        } else {
          dataIsError = true;
          handleErrorMsg(data.prTemplate);
        }

        setInclusiveData(inclusiveArray);
      } catch (error) {
        setErrorMsg(error instanceof Error ? error.message : "Unknown error");
      }

      // ! Must be last in fetchData to ensure all data is fetched before setting isLoading to false (loading icon) and successLoading to true (no error message)
      setIsLoading(false);
    };
    fetchData();
  }, [searchValue]); // only run when searchValue changes

  const sections = [
    {
      title: "Info",
      content: (
        <Info
          commits={commitMessages.length}
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
      title: "Contributors",
      content: <Contributors commitAuthorDates={contributorData} />,
    },
    {
      title: "Workflow",
      content: <WorkflowAnalysis statusses={workflows} />,
    },
    {
      title: "Governance",
      content: (
        <Governance
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
    {
      title: "Issue Sentiment",
      content: <IssuesSentiment data={issues} />,
    },
  ];

  return (
    <>
      <DashboardInfo repoLink={searchValue} />
      <DashboardComponents
        sections={sections}
        isLoading={isLoading}
        errorMsg={errorMsg}
      />
    </>
  );
}

export default Dashboard;
