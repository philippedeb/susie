import { ReactElement, useEffect, useState } from 'react';
import { Alert, Badge, Spinner } from 'react-bootstrap';
import { getSentiment, calcAverageSentiment, getNegativeSentiment, getPositiveSentiment, SentenceSentiments } from './analysis';
import '../../../css/Link.css';
import Explanation from './Explanation';

interface Props {
    data: string[];
}

function IssuesSentiment(props: Props) {
  const [sentiments, setSentiments] = useState<SentenceSentiments>({sentiments: {}});
  const [negativeSentiments, setNegativeSentiments] = useState<SentenceSentiments>({sentiments: {}});
  const [positiveSentiments, setPositiveSentiments] = useState<SentenceSentiments>({sentiments: {}});
  const [averageSentiment, setAverageSentiment] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      // Get sentiments from analysis function
      const sentiments: SentenceSentiments = getSentiment(props.data);
      setSentiments(sentiments);

      // Get negative sentiments from analysis function
      const negativeSentiments: SentenceSentiments = getNegativeSentiment(sentiments);
      setNegativeSentiments(negativeSentiments);

      // Get positive sentiments from analysis function
      const positiveSentiments: SentenceSentiments = getPositiveSentiment(sentiments);
      setPositiveSentiments(positiveSentiments);
      
      // Show alert if the average sentiment is positive
      const averageSentiment = calcAverageSentiment(sentiments)
      setAverageSentiment(averageSentiment);
      setShowAlert(averageSentiment > 0);

      setIsLoading(false);
    }
    fetchData();
  }
  , [props.data]);

  return (
    <div>
      {isLoading ? (
        <div className="d-flex justify-content-center my-4">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div>
          <Alert show={showAlert} variant="success">
            Based on our analysis, the average sentiment in your issues is positive! 💚
          </Alert>
          <Alert show={!showAlert} variant='warning'>
            Based on our analysis, the average sentiment in your issues is negative. 😢
          </Alert>
          {/* Create a Badge with the amount of positive sentiments */}
          <h5>
            {"Positive Sentiments "}{" "}
            <Badge bg="success">{Object.keys(positiveSentiments.sentiments).length}</Badge>
          </h5>
          {Object.entries(positiveSentiments.sentiments).map(
            ([title, { score, comparative, calculation, tokens, words, positive, negative }]) => (
              <Explanation
                key={title}
                title={title}
                score={score}
                calculation={calculation}
                />
            )
          )}
          {/* Create a Badge with the amount of negative sentiments */}
          <h5>
            {"Negative Sentiments "}{" "}
            <Badge bg="danger">{Object.keys(negativeSentiments.sentiments).length}</Badge>
          </h5>
          {/* Here is the list of all negative sentiments */}
          {Object.entries(negativeSentiments.sentiments).map(
            ([title, { score, comparative, calculation, tokens, words, positive, negative }]) => (
              <Explanation
                key={title}
                title={title}
                score={score}
                calculation={calculation}
                />
            )
          )}
        </div>)}
    </div>
  );
}

export default IssuesSentiment;