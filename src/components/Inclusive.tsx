import { useEffect, useState } from "react";
import { checkLanguage, Recommendation } from "../logic/social_metrics";

interface Props {
  data: string[];
}

function Inclusive(props: Props) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await checkLanguage(props.data);
      setRecommendations(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {recommendations.length > 0 ? (
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
        <p>No recommendations found</p>
      )}
    </div>
  );
}

export default Inclusive;
