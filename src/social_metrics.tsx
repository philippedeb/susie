export {}

interface GitBranch {
  name: string
}

interface GitCommit {
  commit: {
    message: string
  }
}

interface GitPull {
  title: string
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
  { word: "killing it", replacements: ["elevating", "exceeding expectations", "excelling"]},
  { word: "master", replacements: ["main"]}
]

async function getBranches(): Promise<string[]> {
  try {
    const response = await fetch('https://api.github.com/repos/cogentapps/chat-with-gpt/branches');
    const data: GitBranch[] = await response.json();
    const branchNames = data.map((item) => item.name.toLowerCase());
    console.log("Branches Found");
    return branchNames
  } catch (error) {
    console.error(error);
    return ["No Branches Found"];
  }
}

async function getPullRequests(): Promise<string[]> {
  try {
    const response = await fetch('https://api.github.com/repos/cogentapps/chat-with-gpt/pulls');
    const data: GitPull[] = await response.json();
    const pullNames = data.map((item) => item.title.toLowerCase());
    console.log("Pull Requests Found");
    return pullNames
  } catch (error) {
    console.error(error);
    return ["No Pull Requests Found"];
  }
}

async function getCommits(): Promise<string[]> {
  try {
    const response = await fetch('https://api.github.com/repos/cogentapps/chat-with-gpt/commits');
    const data: GitCommit[] = await response.json();
    const commitNames = data.map((item) => item.commit.message.toLowerCase());
    console.log("Commits Found");
    return commitNames
  } catch (error) {
    console.error(error);
    return ["No Commits Found"];
  }
}

interface Recommendation {
  name: string,
  target_word: string,
  replacements: string[]
}

async function checkLanguage(func: Promise<string[]>): Promise<Recommendation[]> {
  let recommendations: Recommendation[] = []
  const data = await func;
  for (const item of data) {
    for (const check of inclusiveLanguageChecks) {
      const checkRegex = new RegExp('\\b${check.word}\\b');
      if (checkRegex.test(item)) {
        console.log("Name:", item, "Target Word:", check.word);
        const rec: Recommendation = {
          name: item,
          target_word: check.word,
          replacements: check.replacements
        }
        recommendations.push(rec)
      }
    }
  }
  return recommendations
}

checkLanguage(getBranches());
checkLanguage(getCommits());
checkLanguage(getPullRequests());
  