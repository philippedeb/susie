import { ReactElement, useEffect, useState } from "react";
import { Alert, Badge, Spinner } from "react-bootstrap";
import {
  checkLanguage,
  Recommendations,
  TermRecommendation,
} from "./checkLanguage";
import Recommendation from "./Recommendation";
import "../../../css/Link.css";

interface Props {
  data: [string, string][];
}

function inclusiveStatement(children: React.ReactNode): ReactElement {
  return (
    <div>
      <p>
        {" "}
        Inclusive language is language that is free from words, phrases or tones
        that reflect prejudiced, stereotyped or discriminatory views of
        particular people or groups. It is also language that does not
        deliberately or inadvertently exclude people from being seen as part of
        a group. (
        <a
          className="susie-link"
          href="https://publicdocumentcentre.education.tas.gov.au/Documents/Guidelines-for-Inclusive-Language.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source
        </a>
        )
      </p>
      <p>
        Susie checks your repository for common terms that may be considered as
        not inclusive, though it is not an exhaustive list. To learn more about
        inclusive language, please visit{" "}
        <a
          className="susie-link"
          href="./#/guide?name=inclusive-language"
          target="_blank"
          rel="noopener noreferrer"
        >
          our guide
        </a>
        .
      </p>
      {children}
    </div>
  );
}

function Inclusive(props: Props) {
  const [recommendations, setRecommendations] = useState<Recommendations>({
    terms: {},
    profanity_locations: [],
  });
  const [number_of_recommendations, setNumberOfRecommendations] =
    useState<number>(0);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      // Get recommendations from checkLanguage function
      const recommendations: Recommendations = checkLanguage(props.data);
      setRecommendations(recommendations);

      // Show alert if there are no recommendations
      setNumberOfRecommendations(
        Object.keys(recommendations.terms).length +
          (recommendations.profanity_locations.length > 0 ? 1 : 0)
      );
      setShowAlert(number_of_recommendations === 0);

      // Stop loading symbol after recommendations are fetched
      setIsLoading(false);
    }
    fetchData();
  }, [props.data]);

  return (
    <div>
      {isLoading ? (
        <div className="d-flex justify-content-center my-4">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : number_of_recommendations > 0 ? (
        inclusiveStatement(
          <div>
            <h5>
              {"Results "}{" "}
              <Badge bg="success">{number_of_recommendations}</Badge>
            </h5>
            <p>
              We found the following terms that may be considered as not
              inclusive and have provided some suggestions for replacements.
              Click on a term to see where it was found.
            </p>
            {Object.entries(recommendations.terms).map(
              ([title, { replacements, locations }]) => (
                <Recommendation
                  key={title}
                  title={title}
                  replacements={replacements}
                  locations={locations}
                />
              )
            )}
            {recommendations.profanity_locations.length > 0 && (
              <Recommendation
                key={"Profanity"}
                title={"Profane language 😮"}
                replacements={[]}
                locations={recommendations.profanity_locations}
              />
            )}
          </div>
        )
      ) : (
        inclusiveStatement(
          <Alert show={showAlert} variant="success">
            Based on our analysis, your repository is inclusive! 💚
          </Alert>
        )
      )}
    </div>
  );
}

export default Inclusive;
