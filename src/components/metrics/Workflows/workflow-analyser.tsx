
import { Alert } from "react-bootstrap";

// Minimum ratio of successes
const THRESHOLD = 0.1

interface Props {
    threshold: number;
    statusses: string[];
}

function WorkflowAnalysis(props: Props) {
    var occurrences : { [key: string]: number } = {};
    for (var i = 0, j = props.statusses.length; i < j; i++) {
       occurrences[props.statusses[i]] = (occurrences[props.statusses[i]] || 0) + 1;
    }
    const percentage_failures = occurrences['failure']/props.statusses.length * 100
    if (percentage_failures > THRESHOLD) {
        console.log("Your builds are failing quite often, you should try running locally before pushing!")
    } else {
        console.log("Your builds are successful. Running locally before pushing saves energy, so good job!")
    }
}