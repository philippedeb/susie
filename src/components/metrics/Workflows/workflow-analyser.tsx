import { Alert } from "react-bootstrap";
import { ProgressBar } from 'react-bootstrap';

// Minimum ratio of successes
const THRESHOLD = 0.1

interface Props {
    statusses: string[];
}

function WorkflowAnalysis(props: Props) {
    var occurrences : { [key: string]: number } = {};
    for (var i = 0, j = props.statusses.length; i < j; i++) {
       occurrences[props.statusses[i]] = (occurrences[props.statusses[i]] || 0) + 1;
    }
    const successes = occurrences['success']/props.statusses.length;
    const failures = occurrences['failure']/props.statusses.length;
    const other = 1 - successes - failures;

    return (
    <>
      <ProgressBar style={pb_style}>
        <ProgressBar striped variant="success" now={successes * 100} key={1} label={"Successful builds"}/>
        <ProgressBar variant="warning" now={other * 100} key={2} label={"Other"}/>
        <ProgressBar striped variant="danger" now={failures * 100} key={3} label={"Fails"}/>
      </ProgressBar>
        {failures > THRESHOLD ? (
        <Alert variant="failing_builds">
          Your builds are failing quite often, you should try running locally before pushing!
          You can checkout our guides on how to make software development more energy efficient.
        </Alert>
      ) : (
        (
          <Alert variant="success">
            Your builds are quite successful. Running locally before pushing saves energy, so good job!
          </Alert>
        ))
      }
    </>)
};

export default WorkflowAnalysis;

const pb_style = {
  height: 40,
  margin: 20
};
