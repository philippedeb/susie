export { analyseSentiment };

import Sentiment from 'sentiment';

var sentiment = new Sentiment();
var result = sentiment.analyze('Cats are stupid.');
console.dir(result);

function analyseSentiment(data: string[]): void {
    console.log("Analyse Sentiment");
}