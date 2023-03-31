export { getSentiment, calcAverageSentiment, getNegativeSentiment, getPositiveSentiment, type SentenceSentiments };

import Sentiment from 'sentiment';

const sentiment = new Sentiment();

interface SentenceSentiments {
    sentiments: { [sentence: string]: Sentiment.AnalysisResult };
}

function getSentiment(data: string[]): SentenceSentiments {
    const sentiments: SentenceSentiments = {
        sentiments: {},
    };
    for (const item of data) {
        sentiments.sentiments[item] = sentiment.analyze(item);
    }
    return sentiments;
}

function calcAverageSentiment(sentiments: SentenceSentiments): number {
    let total = 0;
    let count = 0;
    for (const item of Object.values(sentiments.sentiments)) {
        total += item.score;
        count += 1;
    }
    return total / count;
}

function getPositiveSentiment(sentiments: SentenceSentiments, n_sentiments: number = 3): SentenceSentiments {
    const positiveSentiments: SentenceSentiments = {
        sentiments: {},
    };
    // Filter the sentiments to only include them if the length of calculation is greater than 0
    const filteredSentiments = Object.entries(sentiments.sentiments).filter((item) => item[1].calculation.length > 0&& item[1].score > 0).sort((a, b) => b[1].score - a[1].score);
    
    // Check if legnth of filtered sentiments is less than n_sentiments
    if (filteredSentiments.length < n_sentiments) {
        n_sentiments = filteredSentiments.length;
    }

    for (let i = 0; i < n_sentiments; i++) {
        positiveSentiments.sentiments[filteredSentiments[i][0]] = filteredSentiments[i][1];
    }
    return positiveSentiments;
}

function getNegativeSentiment(sentiments: SentenceSentiments, n_sentiments: number = 3): SentenceSentiments {
    const negativeSentiments: SentenceSentiments = {
        sentiments: {},
    };
    // Filter the sentiments to only include them if the length of calculation is greater than 0
    const filteredSentiments = Object.entries(sentiments.sentiments).filter((item) => item[1].calculation.length > 0 && item[1].score < 0).sort((a, b) => a[1].score - b[1].score);
        
    // Check if legnth of filtered sentiments is less than n_sentiments
    if (filteredSentiments.length < n_sentiments) {
        n_sentiments = filteredSentiments.length;
    }

    for (let i = 0; i < n_sentiments; i++) {
        negativeSentiments.sentiments[filteredSentiments[i][0]] = filteredSentiments[i][1];
    }
    return negativeSentiments;
}
