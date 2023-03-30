export { getSentiment, calcAverageSentiment, getNegativeSentiment, getPositiveSentiment, type SentenceSentiments };

import Sentiment from 'sentiment';

const sentiment = new Sentiment();

interface SentenceSentiments {
    sentiments: { [sentence: string]: Sentiment.AnalysisResult };
}

// interface Calculations {
//     calculations: { [word: string]: number };
// }

function getSentiment(data: string[]): SentenceSentiments {
    const sentiments: SentenceSentiments = {
        sentiments: {},
    };
    for (const item of data) {
        sentiments.sentiments[item] = sentiment.analyze(item);
    }
    return sentiments;
}

// This function returns the calculations for each sentence and filters it based on the direction variable where True is positive and False is negative
// function getCalculations(sentiments: SentenceSentiment[], direction: boolean = true): Calculations[] {
//     const calculations: { [word: string]: number }[][] = [];
//     for (const item of sentiments) {
//         const calculation: { [word: string]: number }[] = [];
//         for (const word of item.result.calculation) {
//             if (word.score > 0 && direction) {
//                 calculation.push({ [word.token]: word.score });
//             } else if (word.score < 0 && !direction) {
//                 calculation.push({ [word.token]: word.score });
//             }
//         }
//         calculations.push(calculation);
//     }
//     return calculations;
// }

function calcAverageSentiment(sentiments: SentenceSentiments): number {
    let total = 0;
    let count = 0;
    for (const item of Object.values(sentiments.sentiments)) {
        total += item.score;
        count += 1;
    }
    return total / count;
}

function getPositiveSentiment(sentiments: SentenceSentiments, n_sentiments: number = 5): SentenceSentiments {
    const positiveSentiments: SentenceSentiments = {
        sentiments: {},
    };
    const sortedSentiments = Object.entries(sentiments.sentiments).sort((a, b) => b[1].score - a[1].score);
    for (let i = 0; i < n_sentiments; i++) {
        positiveSentiments.sentiments[sortedSentiments[i][0]] = sortedSentiments[i][1];
    }
    return positiveSentiments;
}

function getNegativeSentiment(sentiments: SentenceSentiments, n_sentiments: number = 5): SentenceSentiments {
    const negativeSentiments: SentenceSentiments = {
        sentiments: {},
    };
    const sortedSentiments = Object.entries(sentiments.sentiments).sort((a, b) => a[1].score - b[1].score);
    for (let i = 0; i < n_sentiments; i++) {
        negativeSentiments.sentiments[sortedSentiments[i][0]] = sortedSentiments[i][1];
    }
    return negativeSentiments;
}
