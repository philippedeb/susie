// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript

export {}

interface GitBranch {
  name: string,
    commit: {
      sha: string,
      url: string
    },
    protected: boolean,
    protection?: {
      required_status_checks: {
        enforcement_level: string,
        contexts: []
      }
    }
    protection_url: string
}

interface GitCommit {
  url: string,
  sha: string,
  node_id: string,
  html_url: string,
  comments_url: string,
  commit: {
    url: string,
    author: {
      name: string,
      email: string,
      date: string
    },
    committer: {
      name: string,
      email: string,
      date: string
    },
    message: string,
    tree: {
      url: string,
      sha: string
    },
    comment_count: number,
    verification: {
      verified: boolean,
      reason: string,
      signature?: string,
      payload?: string
    }
  },
  author: {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    site_admin: boolean
  },
  committer: {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    site_admin: boolean
  },
  parents?: [
    {
      url: string,
      sha: string
    }
  ]
}

const inclusiveLanguageChecks = [
  { word: "man hours", replacements: ["labor hours", "work hours"]},
  { word: "manpower", replacements: ["labor", "workforce"]},
  { word: "guys", replacements: ["folks", "people"]},
  { word: "girl", replacements: ["woman"]},
  { word: "girls", replacements: ["women"]},
  { word: "middleman", replacements: ["middle person", "mediator", "liaison"]},
  { word: "he", replacements: ["they"]},
  { word: "she", replacements: ["they"]},
  { word: "him", replacements: ["them"]},
  { word: "her", replacements: ["them"]},
  { word: "his", replacements: ["theirs"]},
  { word: "hers", replacements: ["theirs"]},
  { word: "crazy", replacements: ["unpredictable", "unexpected"]},
  { word: "insane", replacements: ["unpredictable", "unexpected"]},
  { word: "normal", replacements: ["typical"]},
  { word: " abnormal", replacements: ["atypical"]},
  { word: " grandfather", replacements: ["flagship", "established", "rollover", "carryover"]},
  { word: "grandfathering", replacements: ["flagship", "established", "rollover", "carryover"]},
  { word: "legacy", replacements: ["flagship", "established", "rollover", "carryover"]},
  { word: "crushing it", replacements: ["elevating", "exceeding expectations", "excelling"]},
  { word: "killing it", replacements: ["elevating", "exceeding expectations", "excelling"]}
]

async function getBranches(): Promise<string[]> {
  try {
    const response = await fetch('https://api.github.com/repos/streamlit/streamlit/branches');
    const data: GitBranch[] = await response.json();
    const branchNames = data.map((item) => item.name.toLowerCase());
    console.log("Branches Found");
    return branchNames
  } catch (error) {
    console.error(error);
    return ["No Branches Found"];
  }
}

async function getCommits(): Promise<string[]> {
  try {
    const response = await fetch('https://api.github.com/repos/streamlit/streamlit/commits');
    const data: GitCommit[] = await response.json();
    const commitNames = data.map((item) => item.commit.message.toLowerCase());
    console.log("Commits Found");
    return commitNames
  } catch (error) {
    console.error(error);
    return ["No Commits Found"];
  }
}

async function checkLanguage(func: Promise<string[] | undefined>): Promise<void> {
  const data = await func ?? [];
  for (const item of data) {
    for (const check of inclusiveLanguageChecks) {
      const checkRegex = new RegExp('\\b${check.word}\\b');
      if (checkRegex.test(item)) {
        console.log("Name:", item, "Bad Word:", check.word);
      }
    }
  }
}

checkLanguage(getBranches())
checkLanguage(getCommits())
