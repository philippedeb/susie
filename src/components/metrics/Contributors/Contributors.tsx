import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import LanguagePiechart from "../Language/LanguagePiechart";
import { getContributorPercentages } from "./ContributorPercentage";

interface Props {
  commitAuthorDates: [string, string][];
}

function Contributors(props: Props) {
  const [contributors, setContributors] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    async function fetchData() {
      const contributors: { [key: string]: number } = getContributorPercentages(props.commitAuthorDates);
      setContributors(contributors);
    }
    fetchData();
  }, [props.commitAuthorDates]);

  return (
    <div>
            <LanguagePiechart languages={contributors}

            ></LanguagePiechart>
    </div>
  );
}

export default Contributors