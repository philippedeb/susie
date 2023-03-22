import { LanguageScores } from "./LanguageScores"
import { LanguageTooltips } from "./LanguageTooltips"

export interface Languages {
    [key : string] : number;
}

export function analyseLanguages(data: Languages) {
    var score = 0;
    var smallest_score = 0;
    for (var name of Object.keys(data)) {
        console.log(name);
        if (LanguageScores.data[name] !== undefined) {
            score += (LanguageScores.data[name] * data[name]);
            smallest_score += data[name];
        }
        if (LanguageTooltips.data[name] !== undefined) {
            console.log(LanguageTooltips.data[name]);
        }
    }
    const percentage = smallest_score/score * 100;
    console.log("Your code could be " + percentage + "% more efficient if you only used C!");
    return percentage;
}