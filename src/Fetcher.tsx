import React from "react";

export {}

export async function getData(searchValue: string): Promise<void> {
    try {
        const repo = extractGitHubRepoPath(searchValue)
        // getBranches(repo);
        // getCommits(repo);
        // getPullRequests(repo);
        getDates(repo);
    } catch (error) {
        console.error(error);
    }
  }

interface GitBranch {
  name: string
}

interface GitCommit {
  commit: {
    message: string
    author: {
      name: string,
      date: string
    }
    date: string
  }
}

interface GitPull {
  title: string
}

async function getBranches(repo: string): Promise<string[]> {
  try {
    const response = await fetch('https://api.github.com/repos/' + repo + '/branches');
    const data: GitBranch[] = await response.json();
    const branchNames = data.map((item) => item.name.toLowerCase());
    // console.log("Branches Found");
    return branchNames
  } catch (error) {
    console.error(error);
    return ["No Branches Found"];
  }
}

async function getPullRequests(repo: string): Promise<string[]> {
  try {
    const response = await fetch('https://api.github.com/repos/' + repo + '/pulls');
    const data: GitPull[] = await response.json();
    const pullNames = data.map((item) => item.title.toLowerCase());
    // console.log("Pull Requests Found");
    return pullNames
  } catch (error) {
    console.error(error);
    return ["No Pull Requests Found"];
  }
}

async function getCommits(repo: string): Promise<string[]> {
  try {
    const response = await fetch('https://api.github.com/repos/' + repo + '/commits?page=1&per_page=100');
    const data: GitCommit[] = await response.json();
    const commitNames = data.map((item) => item.commit.message.toLowerCase());
    const commitDates = data.map((item) => item.commit.author.date);
    console.log("Commits Found");
    console.log(commitDates);
    return commitNames
  } catch (error) {
    console.error(error);
    return ["No Commits Found"];
  }
}

async function getDates(repo: string): Promise<string[]> {
  let n: number = 1;
  let dateList: string[] = []
  while (n < 5) {
    try {
      const link: string = 'https://api.github.com/repos/' + repo + '/commits?page=' + n.toString();
      console.log(link)
      const response = await fetch(link)
      const data: GitCommit[] = await response.json();
      const commitDates = data.map((item) => item.commit.author.date);
      dateList = dateList.concat(commitDates)
      if (commitDates.length < 30) {
        break;
      }
      n++
    } catch (error) {
      console.error(error);
      return ["No Dates Found"];
    }
  }
  return dateList;
}

/**
 * https://www.seancdavis.com/posts/extract-github-repo-name-from-url-using-javascript/
 */
function extractGitHubRepoPath(url: string): string {
  if (!url) return "URL not found";
  const match = url.match(
    /(^https?:\/\/(www\.)?)?github.com\/(?<owner>[\w.-]+)\/(?<name>[\w.-]+)/
  );
  if (!match || !(match.groups?.owner && match.groups?.name)) return "URL not found";
  return `${match.groups.owner}/${match.groups.name}`;
}
