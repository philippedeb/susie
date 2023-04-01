import { Alert, Badge } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";
import "../../../css/WorkflowAnalysis.css";

// Minimum ratio of successes
const THRESHOLD = 0.1;

interface Props {
  statusses: string[];
}

function WorkflowAnalysis(props: Props) {
  var occurrences: { [key: string]: number } = {};
  for (var i = 0, j = props.statusses.length; i < j; i++) {
    occurrences[props.statusses[i]] =
      (occurrences[props.statusses[i]] || 0) + 1;
  }
  const successes =
    props.statusses.length > 0 && occurrences["success"]
      ? occurrences["success"] / props.statusses.length
      : 0.0;
  const failures =
    props.statusses.length > 0 && occurrences["failure"]
      ? occurrences["failure"] / props.statusses.length
      : 0.0;
  const other = 1.0 - successes - failures;

  const progressBar = (
    <>
      <ProgressBar className="workflow-progressbar">
        <ProgressBar variant="success" now={successes * 100.0} key={1} />
        <ProgressBar variant="warning" now={other * 100.0} key={2} />
        <ProgressBar variant="danger" now={failures * 100.0} key={3} />
      </ProgressBar>
      <div className="legend d-flex justify-content-center">
        <Badge bg="success" className="workflow-legend">
          Successful
        </Badge>
        <Badge bg="warning" className="workflow-legend">
          Other
        </Badge>
        <Badge bg="danger" className="workflow-legend">
          Fails
        </Badge>
      </div>
    </>
  );

  const unknownProgressBar = (
    <ProgressBar className="workflow-progressbar">
      <ProgressBar
        variant="secondary"
        now={100.0}
        key={1}
        label={"No data available"}
      />
    </ProgressBar>
  );

  const workflowSuggestion =
    failures > THRESHOLD ? (
      <Alert variant="warning">
        Your builds are failing quite often {"(> 10%)"}, please consider running
        them locally before pushing!
      </Alert>
    ) : (
      <Alert variant="success">
        Your builds are quite successful. Running locally before pushing saves
        energy, so good job!
      </Alert>
    );

  return (
    <>
      <p>Let's see how often builds are failing.. 🔭 </p>
      {props.statusses.length > 0 ? progressBar : unknownProgressBar}
      <p>
        <b>Why?</b> Running workflows locally before executing them remotely is
        beneficial for saving on energy usage: executing workflows remotely
        involves utilizing resources such as servers and data centers that
        require a significant amount of energy compared to running them locally.
      </p>
      {props.statusses.length > 0 && workflowSuggestion}
    </>
  );
}

export default WorkflowAnalysis;
