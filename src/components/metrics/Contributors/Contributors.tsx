import { useEffect, useState } from "react";
import { getBusFactor, getContributionCounts } from "./ContributorLogic";
import ContributorPiechart from "./ContributorPiechart";
import DropDown from "../../structure/DropDown";
import { Badge } from "react-bootstrap";

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
      <h5>Overview of contributors 🧑‍💻</h5>
      <div>
        <ContributorPiechart
          commitAuthorDates={contributors}
        ></ContributorPiechart>
      </div>

      <br />
      <hr />
      <h5>Bus Factor 🚌</h5>
      <div>
        The bus factor (or truck factor) of a project is the number of team
        members whose absence would jeopardize the project (
        <i>hypothetically speaking</i>, hit by a bus). The smallest bus factor
        is 1 and any low number represents a crucial point of failure within the
        team, thus, larger values are preferred. And of course, buses aren't
        usually the biggest threat to teams: illness, vacation, and departure
        from the company are all frequent occurrences on projects. Therefore,
        efforts should be made to increase the bus factor on any project that is
        critical to the organization.
        <br />
        <br />
        <Badge bg="secondary">Note</Badge> There are different metrics below for
        the bus factor, click on them to learn more.
      </div>
      <DropDown header={`🐴 Pony factor: ${busFactor}`} collapsed={false}>
        <p>
          The pony factor is the number of top contributors covering 50% or more
          of all time contributions (
          <a
            href="https://humbedooh.com/Chapter%203,%20part%20one_%20Codebase%20development%20resilience.pdf"
            className="susie-link"
          >
            source
          </a>
          ).
        </p>
      </DropDown>
    </>
  );
}

export default Contributors;
