export { extractGitHubOwnerAndRepo, getData, getSlash };

async function getData(searchValue: string): Promise<{
  branches: string[];
  commits: string[];
  pull_requests: string[];
  languages: { [key: string]: number };
  runs: string[];
}> {
  try {
    const repo = extractGitHubRepoPath(searchValue);
    const branches = await getBranches(repo);
    const commits = await getCommits(repo);
    const pull_requests = await getPullRequests(repo);
    const languages = await getLanguages(repo);
    const runs = await getRuns(repo);
    return { branches, commits, pull_requests, languages, runs };
  } catch (error) {
    console.error(error);
    return { branches: [], commits: [], pull_requests: [], languages: {}, runs: [] };
  }
}

interface GitBranch {
  name: string;
}

interface GitCommit {
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
}

interface GitPull {
  title: string;
}

interface WorkflowRuns {
  workflow_runs: {
    conclusion: string;
  };
}

async function getBranches(repo: string): Promise<string[]> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/" + repo + "/branches"
    );
    const data: GitBranch[] = await response.json();
    const branchNames = data.map((item) => item.name.toLowerCase());
    console.log("Branches Found");
    return branchNames;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getPullRequests(repo: string): Promise<string[]> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/" + repo + "/pulls"
    );
    const data: GitPull[] = await response.json();
    const pullNames = data.map((item) => item.title.toLowerCase());
    console.log("Pull Requests Found");
    return pullNames;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getCommits(repo: string): Promise<string[]> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/" + repo + "/commits"
    );
    const data: GitCommit[] = await response.json();
    const commitNames = data.map((item) => item.commit.message.toLowerCase());
    console.log("Commits Found");
    return commitNames;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getLanguages(repo: string): Promise<{ [key: string]: number }> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/" + repo + "/languages"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

/*
 * Use param "readme" to check for a README file
 * Use param "license" to check for a LICENSE file
 */
async function getSlash(url: string, param: string): Promise<boolean> {
  const [owner, repo] = extractGitHubOwnerAndRepo(url);
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/${param}`
    );
    const data = await response.json();
    if (data.message && data.message === "Not Found") {
      return false;
    } else if (data.path) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getRuns(repo: string): Promise<string[]> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/" + repo + "/actions/runs?per_page=100"
    );
    const data: WorkflowRuns[] = await response.json();
    const statusses = data.map((item) => item.workflow_runs.conclusion);
    console.log("Runs Found");
    return statusses;
  } catch (error) {
    console.error(error);
    return [];
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
