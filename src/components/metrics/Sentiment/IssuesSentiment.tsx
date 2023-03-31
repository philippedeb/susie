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
          <p>
            We have analyzed the sentiment in your issues and have found the 
            following issues that may be considered as positive or negative. 
            Click on an issue to see the sentiment analysis. 
            (
              <a
                className="susie-link"
                href="https://www.npmjs.com/package/sentiment"
              >
              Source
              </a>
            )
          </p>
          {/* Create a Badge with the amount of positive sentiments */}
          <h5>
            {"Positive Issues "}{" "}
            <Badge bg="success">{Object.keys(positiveSentiments.sentiments).length}</Badge>
          </h5>
          <p>
            {Object.keys(positiveSentiments.sentiments).length > 0 ? "The list below shows the issues that have the highest positive sentiment." : "" }
          </p>
          {Object.entries(positiveSentiments.sentiments).map(
            ([title, { score, calculation }]) => (
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
            {"Negative Issues "}{" "}
            <Badge bg="danger">{Object.keys(negativeSentiments.sentiments).length}</Badge>
          </h5>
          <p>
            {Object.keys(negativeSentiments.sentiments).length > 0 ? "The list below shows the issues that have the lowest negative sentiment." : "" }
          </p>
          {/* Here is the list of all negative sentiments */}
          {Object.entries(negativeSentiments.sentiments).map(
            ([title, { score, calculation }]) => (
              <Explanation
                key={title}
                title={title}
                score={score}
                calculation={calculation}
                />
            )
          )}
          <Alert show={showAlert} variant="success">
            Based on our analysis, the average sentiment in your issues is positive! 💚
          </Alert>
          <Alert show={!showAlert} variant='warning'>
            Based on our analysis, the average sentiment in your issues is negative. 😢
          </Alert>
        </div>)}
    </div>
  );
}

export default IssuesSentiment;