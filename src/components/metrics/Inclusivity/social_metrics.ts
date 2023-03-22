export { checkLanguage, type Recommendation };

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

async function checkLanguage(data: string[]): Promise<Recommendation[]> {
  let recommendations: Recommendation[] = []
  for (const item of data) {
    for (const check of inclusiveLanguageChecks) {
      const checkRegex = new RegExp('\\b' + check.word + '\\b');
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