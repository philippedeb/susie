import { branchList } from "./Fetcher";
import { commitList } from "./Fetcher";
import { pullRequestList } from "./Fetcher";

const inclusiveLanguageChecks = [
  { word: "man hours", replacements: ["labor hours", "work hours", "person hours", "engineer hours"]},
  { word: "manpower", replacements: ["labor", "workforce"]},
  { word: "guys", replacements: ["folks", "people", "you all"]},
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
  { word: "abnormal", replacements: ["atypical"]},
  { word: "grandfather", replacements: ["flagship", "established", "rollover", "carryover"]},
  { word: "grandfathering", replacements: ["flagship", "established", "rollover", "carryover"]},
  { word: "legacy", replacements: ["flagship", "established", "rollover", "carryover"]},
  { word: "crushing it", replacements: ["elevating", "exceeding expectations", "excelling"]},
  { word: "killing it", replacements: ["elevating", "exceeding expectations", "excelling"]},
  { word: "master", replacements: ["main", "leader", "primary"]},
  { word: "whitelist", replacements: ["allowlist"]},
  { word: "blacklist", replacements: ["denylist"]},
  { word: "slave", replacements: ["follower", "replica", "standby"]},
  { word: "sanity check", replacements: ["quick check", "confidence check", "coherence check"]},
  { word: "dummy value", replacements: ["placeholder value", "sample value"]}
]

interface Recommendation {
  name: string,
  target_word: string,
  replacements: string[]
}

interface ComponentRecommendations {
  component: string
  recommendations: Recommendation[]
}

function checkLanguage(componentNames: string[]): Recommendation[] {
  let recommendations: Recommendation[] = []
  for (const item of componentNames) {
    for (const check of inclusiveLanguageChecks) {
      const checkRegex = new RegExp('\\b' + check.word + '\\b');
      if (checkRegex.test(item)) {
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

export function getLanguageRecommendations(): ComponentRecommendations[] {
  let languageRecommendations: ComponentRecommendations[] = [
    { component: "Commits", recommendations: checkLanguage(commitList)},
    { component: "Branches", recommendations: checkLanguage(branchList)},
    { component: "Pull Requests", recommendations: checkLanguage(pullRequestList)}
  ]
  console.log("Here are some Language Recommendations")
  console.log(languageRecommendations)
  return languageRecommendations
}