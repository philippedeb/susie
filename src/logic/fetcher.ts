export { extractGitHubOwnerAndRepo, getData, getSlash };

async function getData(searchValue: string): Promise<
  | {
      // branches: string[] | Error;
      // commitMessages: string[] | Error;
      // pull_requests: string[] | Error;
      languages: { [key: string]: number } | Error;
      // issues: string[] | Error;
      commitAuthorDates: [string, string][] | Error;
      // runs: string[] | Error;
      // readme: string | Error;
      // license: string | Error;
      // changelog: string | Error;
      // codeOfConduct: string | Error;
      // contributingGuidelines: string | Error;
      // issueTemplate: string | Error;
      // prTemplate: string | Error;
    }
  | Error
> {
  try {
    const repo = extractGitHubRepoPath(searchValue);
    // const branches = await getBranches(repo);
    // const commitMessages = await getCommitMessages(repo);
    // const pull_requests = await getPullRequests(repo);
    const languages = await getLanguages(repo);
    // const issues = await getIssues(repo);
    const commitAuthorDates = await getCommitAuthorDates(repo);
    // const runs = await getRuns(repo);
    // const readme = await getFileContent(repo, "README.md");
    // const license = await getFileContent(repo, "LICENSE");
    // const changelog = await getFileContent(repo, "CHANGELOG.md");
    // const codeOfConduct = await getCodeOfConduct(repo);
    // const contributingGuidelines = await getContributingGuidelines(repo);
    // const issueTemplate = await getIssueTemplate(repo);
    // const prTemplate = await getPrTemplate(repo);
    return {
      // branches,
      // commitMessages,
      // pull_requests,
      languages,
      // issues,
      commitAuthorDates,
      // runs,
      // readme,
      // license,
      // changelog,
      // codeOfConduct,
      // contributingGuidelines,
      // issueTemplate,
      // prTemplate,
    };
  } catch (error) {
    return new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

interface GitBranch {
  name: string;
}

interface GitCommit {
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
    date: string;
  };
}

interface GitPull {
  title: string;
}

interface GitIssue {
  title: string;
}

interface WorkflowRuns {
  workflow_runs: [{ conclusion: string }];
}

async function getCodeOfConduct(repo: string): Promise<string | Error> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/community/code_of_conduct`
    );
    if (response.status === 403) {
      return new Error("API rate limit exceeded");
    }
    if (response.status === 404) {
      return new Error("ERROR in fetching data");
    }
    const data = await response.json();
    if (data.code_of_conduct) {
      return atob(data.code_of_conduct.body);
    } else {
      return "";
    }
  } catch (error) {
    return new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

async function getContributingGuidelines(
  repo: string
): Promise<string | Error> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/contents/CONTRIBUTING.md`
    );
    if (response.status === 403) {
      return new Error("API rate limit exceeded");
    }
    if (response.status === 404) {
      return new Error("ERROR in fetching data");
    }
    const data = await response.json();
    if (data.content) {
      return atob(data.content);
    } else {
      return "";
    }
  } catch (error) {
    return new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

async function getIssueTemplate(repo: string): Promise<string | Error> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/contents/.github/ISSUE_TEMPLATE.md`
    );
    if (response.status === 403) {
      return new Error("API rate limit exceeded");
    }
    if (response.status === 404) {
      return new Error("ERROR in fetching data");
    }
    const data = await response.json();
    if (data.content) {
      return atob(data.content);
    } else {
      return "";
    }
  } catch (error) {
    return new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

async function getPrTemplate(repo: string): Promise<string | Error> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/contents/.github/PULL_REQUEST_TEMPLATE.md`
    );
    if (response.status === 403) {
      return new Error("API rate limit exceeded");
    }
    if (response.status === 404) {
      return new Error("ERROR in fetching data");
    }
    const data = await response.json();
    if (data.content) {
      return atob(data.content);
    } else {
      return "";
    }
  } catch (error) {
    return new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

async function getBranches(repo: string): Promise<string[] | Error> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/" + repo + "/branches?per_page=100"
    );
    if (response.status === 403) {
      return new Error("API rate limit exceeded");
    }
    if (response.status === 404) {
      return new Error("ERROR in fetching data");
    }
    const data: GitBranch[] = await response.json();
    const branchNames = data.map((item) => item.name.toLowerCase());
    return branchNames;
  } catch (error) {
    return new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

async function getPullRequests(repo: string): Promise<string[] | Error> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/" + repo + "/pulls?per_page=100&state=all"
    );
    if (response.status === 403) {
      return new Error("API rate limit exceeded");
    }
    if (response.status === 404) {
      return new Error("ERROR in fetching data");
    }
    const data: GitPull[] = await response.json();
    const pullNames = data.map((item) => item.title.toLowerCase());
    return pullNames;
  } catch (error) {
    return new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

async function getCommitMessages(
  repo: string,
  since: string = "2008-02-08T12:00:00Z"
): Promise<string[] | Error> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/" +
        repo +
        "/commits?per_page=100&since=" +
        since
    );
    if (response.status === 403) {
      return new Error("API rate limit exceeded");
    }
    if (response.status === 404) {
      return new Error("ERROR in fetching data");
    }
    const data: GitCommit[] = await response.json();
    const commitNames = data.map((item) => item.commit.message.toLowerCase());
    return commitNames;
  } catch (error) {
    return new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

async function getLanguages(
  repo: string
): Promise<{ [key: string]: number } | Error> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/" + repo + "/languages"
    );
    if (response.status === 403) {
      return new Error("API rate limit exceeded");
    }
    if (response.status === 404) {
      return new Error("ERROR in fetching data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

async function getIssues(
  repo: string,
  since: string = "2008-02-08T12:00:00Z"
): Promise<string[] | Error> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/" +
        repo +
        "/issues?per_page=100&since=" +
        since
    );
    if (response.status === 403) {
      return new Error("API rate limit exceeded");
    }
    if (response.status === 404) {
      return new Error("ERROR in fetching data");
    }
    const data: GitIssue[] = await response.json();
    const issueNames = data.map((item) => item.title.toLowerCase());
    return issueNames;
  } catch (error) {
    return new Error(error instanceof Error ? error.message : "Unknown error");
  }
}


async function getCommitAuthorDates(
  repo: string,
  since: string = "2008-02-08T12:00:00Z"
  ): Promise<[string, string][] | Error> {
  let n: number = 1;
  let dateList: [string, string][] = []
  while (n < 5) {
    try {
      const response = await fetch(
        "https://api.github.com/repos/" + 
          repo +
          "/commits?per_page=100&page=" +
          n.toString() +
          "/since=" + since
      );
      if (response.status === 403) {
        return new Error("API rate limit exceeded");
      }
      if (response.status === 404) {
        return new Error("ERROR in fetching data");
      }
      const data: GitCommit[] = await response.json();
      
      const commitDates: [string, string][] = data.map(item => [item.commit.author.name, item.commit.author.date]);
      dateList = dateList.concat(commitDates);
      if (commitDates.length < 30) {
        break;
      }
      n++
    } catch (error) {
      return new Error(error instanceof Error ? error.message : "Unknown error");
    }
  }
  return dateList;
}

/*
 * Use param "readme" to check for a README file
 * Use param "license" to check for a LICENSE file
 */
async function getSlash(url: string, param: string): Promise<boolean | Error> {
  const [owner, repo] = extractGitHubOwnerAndRepo(url);
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/${param}`
    );
    if (response.status === 403) {
      return new Error("API rate limit exceeded");
    }
    if (response.status === 404) {
      return new Error("ERROR in fetching data");
    }
    const data = await response.json();
    if (data.message && data.message === "Not Found") {
      return false;
    } else if (data.path) {
      return true;
    }
    return false;
  } catch (error) {
    return new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

async function getRuns(repo: string): Promise<string[] | Error> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/" + repo + "/actions/runs?per_page=100"
    );
    if (response.status === 403) {
      return new Error("API rate limit exceeded");
    }
    if (response.status === 404) {
      return new Error("ERROR in fetching data");
    }
    const data: WorkflowRuns = await response.json();
    const statusses = data.workflow_runs.map((item) =>
      item.conclusion.toLowerCase()
    );
    return statusses;
  } catch (error) {
    return new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

/**
 * https://www.seancdavis.com/posts/extract-github-repo-name-from-url-using-javascript/
 */
function extractGitHubRepoPath(url: string): string {
  if (!url) return "URL not found";
  const match = url.match(
    /(^https?:\/\/(www\.)?)?github.com\/(?<owner>[\w.-]+)\/(?<name>[\w.-]+)/
  );
  if (!match || !(match.groups?.owner && match.groups?.name))
    return "URL not found";
  return `${match.groups.owner}/${match.groups.name}`;
}

function extractGitHubOwnerAndRepo(url: string): [string, string] {
  if (!url) return ["URL not found", ""];
  const match = url.match(
    /(^https?:\/\/(www\.)?)?github.com\/(?<owner>[\w.-]+)\/(?<name>[\w.-]+)/
  );
  if (!match || !(match.groups?.owner && match.groups?.name))
    return ["URL not found", ""];
  return [match.groups.owner, match.groups.name];
}

async function getFileContent(
  repo: string,
  filename: string
): Promise<string | Error> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filename}`
    );
    if (response.status === 403) {
      return new Error("API rate limit exceeded");
    }
    if (response.status === 404) {
      return new Error("ERROR in fetching data");
    }
    const data = await response.json();
    if (data.content) {
      return atob(data.content);
    } else {
      return "";
    }
  } catch (error) {
    return new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
