export interface LanguageScoreInterface {
    data: Record<string, number>;
}

// https://medium.com/codex/what-are-the-greenest-programming-languages-e738774b1957
// TODO: Fill this
export const LanguageScores: LanguageScoreInterface = {
    data: {
        "C": 1, 
        "Rust": 1.03,
        "C++": 1.34,
        "Ada": 1.70,
        "Java": 1.98,
        "Ruby": 69.91
    }
};