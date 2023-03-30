import { useState } from "react";
import { Collapse, Table } from "react-bootstrap";
import "../../../css/Recommendation.css";

interface Props {
    title: string;
    score: number;
    calculation: Array<{
        [token: string]: number;
    }>;
}

function Explanation(props: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="recommendation-container">
            <div className="recommendation-header" onClick={toggleDropdown}>
                <h6>
                    {props.title}{" "}
                    {props.calculation.length > 0
                        ? " → " + props.score
                        : ""}
                </h6>
            </div>
            <Collapse in={isOpen}>
                <div className="recommendation-body">
                    <p>
                        {props.calculation.length > 0
                            ? 'The sentiment scores of the words can be found in the table below'
                        : ""}
                    </p>
                    <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Word</th>
                                <th scope="col">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.calculation.map((calculation) => (
                                <tr>
                                    <td>{Object.keys(calculation)[0]}</td>
                                    <td>{Object.values(calculation)[0]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Collapse>
        </div>
    );
}

export default Explanation;