
import { Alert } from "react-bootstrap";
import React , {useState, useEffect} from "react";
import {Text , View, StyleSheet} from 'react-native';
import { ProgressBar } from "react-native-paper";

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
    const percentage_failures = occurrences['failure']/props.statusses.length
    if (percentage_failures > THRESHOLD) {
        console.log("Your builds are failing quite often, you should try running locally before pushing!")
    } else {
        console.log("Your builds are successful. Running locally before pushing saves energy, so good job!")
    }

    return(
        <h5>Test</h5>
        // <ProgressBar progress={1 - percentage_failures}  color={"green"} />    
    )
};

export default WorkflowAnalysis;