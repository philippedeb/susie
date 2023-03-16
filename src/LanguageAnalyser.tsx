import { LanguageScores } from "./LanguageScores"

export interface Languages {
    [key : string] : number
}

export function analyseLanguages(data: Languages) {
    var score = 0
    var bytes = 0
    for (var name of Object.keys(data)) {
        console.log(name)
        if (LanguageScores.data[name] !== undefined) {
            score += (LanguageScores.data[name] * data[name])
            bytes += data[name]
        }
    }
    // I don't think this message is completely correct, but it gets the gist of it
    console.log("Your code of " + bytes + " bytes has the same energy usage as C code of " + score + " bytes")
}