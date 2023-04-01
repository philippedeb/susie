export { checkLanguage, type Recommendations, type TermRecommendation };

import Filter from "bad-words";
const filter = new Filter();

const inclusiveLanguageChecks = [
  { word: "master", replacements: ["main", "leader", "primary"] },
  { word: "slave", replacements: ["follower", "replica", "secondary"] },
  {
    word: "whitelist",
    replacements: ["allow list", "inclusion list", "safe list"],
  },
  {
    word: "blacklist",
    replacements: ["deny list", "exclusion list", "block list", "banned list"],
  },
  {
    word: "man hours",
    replacements: [
      "labor hours",
      "work hours",
      "person hours",
      "engineer hours",
    ],
  },
  { word: "manpower", replacements: ["labor", "workforce"] },
  { word: "guys", replacements: ["folks", "people", "you all"] },
  { word: "girl", replacements: ["woman"] },
  { word: "girls", replacements: ["women"] },
  { word: "middleman", replacements: ["middle person", "mediator", "liaison"] },
  { word: "he", replacements: ["they"] },
  { word: "she", replacements: ["they"] },
  { word: "him", replacements: ["them"] },
  { word: "her", replacements: ["them"] },
  { word: "his", replacements: ["theirs"] },
  { word: "hers", replacements: ["theirs"] },
  { word: "crazy", replacements: ["unpredictable", "unexpected"] },
  { word: "insane", replacements: ["unpredictable", "unexpected"] },
  { word: "normal", replacements: ["typical"] },
  { word: "abnormal", replacements: ["atypical"] },
  {
    word: "grandfather",
    replacements: ["flagship", "established", "rollover", "carryover"],
  },
  {
    word: "grandfathering",
    replacements: ["flagship", "established", "rollover", "carryover"],
  },
  {
    word: "legacy",
    replacements: ["flagship", "established", "rollover", "carryover"],
  },
  {
    word: "crushing it",
    replacements: ["elevating", "exceeding expectations", "excelling"],
  },
  {
    word: "killing it",
    replacements: ["elevating", "exceeding expectations", "excelling"],
  },
  { word: "owner", replacements: ["lead", "manager", "expert"] },
  {
    word: "sanity check",
    replacements: ["quick check", "confidence check", "coherence check"],
  },
  { word: "dummy value", replacements: ["placeholder value", "sample value"] },
  {
    word: "native feature",
    replacements: ["core feature", "built-in feature"],
  },
  { word: "culture fit", replacements: ["values fit"] },
  { word: "housekeeping", replacements: ["cleanup", "maintenance"] },
  { word: "sanity", replacements: ["confidence", "coherence"] },
  { word: "dummy", replacements: ["placeholder", "sample"] },
  // https://www.aihr.com/blog/lgbtq-inclusive-language-in-the-workplace/
  { word: "chairman", replacements: ["chair", "chairperson"] },
  { word: "mailman", replacements: ["mail carrier", "mail clerk"] },
  { word: "salesman", replacements: ["salesperson"] },
  { word: "salesmen", replacements: ["salespeople"] },
  { word: "saleswoman", replacements: ["salesperson"] },
  { word: "saleswomen", replacements: ["salespeople"] },
  { word: "spokesman", replacements: ["spokesperson"] },
  { word: "spokesmen", replacements: ["spokespeople"] },
  { word: "spokeswoman", replacements: ["spokesperson"] },
  { word: "spokeswomen", replacements: ["spokespeople"] },
  { word: "stewardess", replacements: ["flight attendant"] },
  { word: "stewardesses", replacements: ["flight attendants"] },
  { word: "policeman", replacements: ["police officer"] },
  { word: "policemen", replacements: ["police officers"] },
  { word: "policewoman", replacements: ["police officer"] },
  { word: "policewomen", replacements: ["police officers"] },
  { word: "fireman", replacements: ["firefighter"] },
  { word: "firemen", replacements: ["firefighters"] },
  { word: "firewoman", replacements: ["firefighter"] },
  { word: "firewomen", replacements: ["firefighters"] },
];

interface Recommendations {
  terms: { [key: string]: TermRecommendation };
  profanity_locations: string[];
}

interface TermRecommendation {
  replacements: string[];
  locations: string[];
}

function checkLanguage(data: string[]): Recommendations {
  const recommendations: Recommendations = {
    terms: {},
    profanity_locations: [],
  };

  for (const item of data) {
    // Check if the item contains any of the target words
    for (const check of inclusiveLanguageChecks) {
      const checkRegex = new RegExp("\\b" + check.word + "\\b");
      if (checkRegex.test(item)) {
        console.log("Name:", item, "Target Word:", check.word);

        if (recommendations.terms[check.word]) {
          recommendations.terms[check.word].locations.push(item);
        } else {
          recommendations.terms[check.word] = {
            replacements: check.replacements,
            locations: [item],
          };
        }
      }
    }
    // Check if the item contains any profanity
    if (filter.isProfane(item)) {
      recommendations.profanity_locations.push(item);
    }
  }
  return recommendations;
}
