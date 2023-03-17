import { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { checkLanguage, Recommendation } from "../../logic/social_metrics";

interface Props {
  data: string[];
}

function Inclusive(props: Props) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const data = await checkLanguage(props.data);
      setRecommendations(data);
      setShowAlert(data.length === 0);
      setIsLoading(false);
    }
    fetchData();
  }, [props.data]);

  return (
    <div>
      {isLoading ? ( // Loading symbol while fetching data
        <div className="d-flex justify-content-center my-4">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : recommendations.length > 0 ? (
        <div>
          <h2>Inclusive Language Recommendations</h2>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>
                <p>{rec.name}:</p>
                <ul>
                  {rec.replacements.map((rep, index) => (
                    <li key={index}>{rep}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Alert show={showAlert} variant="primary">
          Based on our analysis, your repository is inclusive!
        </Alert>
      )}
    </div>
  );
}

export default Inclusive;
