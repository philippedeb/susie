import { useEffect, useState } from "react";
import { getBusFactor, getContributionCounts } from "./ContributorLogic";
import ContributorPiechart from "./ContributorPiechart";

interface Props {
  commitAuthorDates: [string, string][];
}

function Contributors(props: Props) {
  const [contributors, setContributors] = useState<{ [key: string]: number }>({});
  const [busFactor, setBusFactor] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const contributors: { [key: string]: number } = getContributionCounts(props.commitAuthorDates);
      setContributors(contributors);

      const busFactor: number = getBusFactor(props.commitAuthorDates);
      setBusFactor(busFactor);
    }

    fetchData();
  }, [props.commitAuthorDates]);

  return (
    <>
      <div>
          <ContributorPiechart commitAuthorDates={contributors}

          ></ContributorPiechart>
      </div>
      <div>
        {busFactor}
      </div>
    </>
  );
}

export default Contributors