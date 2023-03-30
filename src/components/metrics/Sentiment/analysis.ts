import Sentiment from 'sentiment';

var sentiment = new Sentiment();
var result = sentiment.analyze('Cats are stupid.');
console.dir(result);
