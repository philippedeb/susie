import { useEffect, useState } from "react";
import { getBusFactor, getContributionCounts } from "./ContributorLogic";
import ContributorPiechart from "./ContributorPiechart";
import DropDown from "../../structure/DropDown";

interface Props {
  commitAuthorDates: [string, string][];
}

function Contributors(props: Props) {
  const [contributors, setContributors] = useState<{ [key: string]: number }>(
    {}
  );
  const [busFactor, setBusFactor] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const contributors: { [key: string]: number } = getContributionCounts(
        props.commitAuthorDates
      );
      setContributors(contributors);

      const busFactor: number = getBusFactor(props.commitAuthorDates);
      setBusFactor(busFactor);
    }

    fetchData();
  }, [props.commitAuthorDates]);

  return (
    <>
      <p>Contributors of the repository 🧑‍💻</p>
      <div>
        <ContributorPiechart
          commitAuthorDates={contributors}
        ></ContributorPiechart>
      </div>

      <DropDown header={"Bus Factor of the repository 🚌"} collapsed={false}>
        <div>
          <p>
            The <b>Bus Factor</b> of this project is: {busFactor}.
          </p>
        </div>

        <div>
          A project's bus factor (or truck factor) is a number equal to the
          number of team members who, if run over by a bus, would put the
          project in jeopardy. The smallest bus factor is 1. Larger numbers are
          preferable. Essentially, a low bus factor represents a single point of
          failure within the team. And of course, buses aren't usually the
          biggest threat to teams: illness, vacation, and departure from the
          company are all frequent occurrences on projects. Thus, efforts should
          be made to increase bus factor on any project that is critical to the
          organization.
        </div>
      </DropDown>
    </>
  );
}

export default Contributors;
