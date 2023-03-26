import { Alert } from "react-bootstrap";

interface Props {
  commits: number;
  pullRequests: number;
  branches: number;
  issues: number;
}

function Info(props: Props) {
  const possiblyMaxCapacityReached =
    props.commits == 100 ||
    props.pullRequests == 100 ||
    props.branches == 100 ||
    props.issues == 100;

  return (
    <>
      <ul>
        <li>
          <strong>Commits:</strong> {props.commits}
        </li>
        <li>
          <strong>Pull Requests:</strong> {props.pullRequests}
        </li>
        <li>
          <strong>Branches:</strong> {props.branches}
        </li>
        <li>
          <strong>Issues:</strong> {props.issues}
        </li>
      </ul>
      {possiblyMaxCapacityReached && (
        <>
          <Alert variant="warning">
            {" "}
            ⚠️ The maximum load capacity of 100 is reached; any further
            information is not included in the analysis.{" "}
          </Alert>
          <Alert variant="secondary">
            🎯 While not all past data might be relevant anyway, we are planning
            on releasing this feature soon!
          </Alert>
        </>
      )}
    </>
  );
}

export default Info;
