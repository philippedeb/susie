import React from "react";
import { Pie } from "react-chartjs-2";
import { Container, Row, Col, Table, Alert } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import DropDown from "../../structure/DropDown";
ChartJS.register([ArcElement, Tooltip, Legend]);

interface Props {
  commitAuthorDates: { [key: string]: number };
}

interface contributor {
  name: string;
  amount: number;
  color: string;
}

function sortAndPruneTupleList(
  labels: string[],
  data: number[],
  n: number
): contributor[] {
  const labelDataArray: contributor[] = labels.map((label, index) => ({
    name: label,
    amount: data[index],
    color: [
      "#e60049",
      "#0bb4ff",
      "#50e991",
      "#e6d800",
      "#9b19f5",
      "#ffa300",
      "#dc0ab4",
      "#b3d4ff",
      "#00bfa0",
    ][index],
  }));
  labelDataArray.sort((b, a) => a.amount - b.amount);

  const otherList = labelDataArray.slice(n, labelDataArray.length);
  const otherpercentage = otherList.reduce(
    (acc, value) => acc + value.amount,
    0
  );
  const other: contributor = {
    name: "Other",
    amount: otherpercentage,
    color: "#7d7a74",
  };
  const prunedArray = labelDataArray.slice(0, n);

  if (otherpercentage > 0) prunedArray.push(other);
  return prunedArray;
}

const ContributorPiechart: React.FC<Props> = ({ commitAuthorDates }) => {
  const labels = Object.keys(commitAuthorDates);
  const data = Object.values(commitAuthorDates);

  const totalCommits = data.reduce((acc, curr) => acc + curr, 0);

  if (totalCommits === 0) {
    return (
      <Alert variant="warning">
        {" "}
        Uh oh.. no contributors found for this repository! 🥹{" "}
      </Alert>
    );
  }

  const labelDataArray = sortAndPruneTupleList(labels, data, 8);
  const maxWidthName = 23; // Max width of name in table, in characters
  const tableRows = labelDataArray.map((contributor) => (
    <tr key={contributor.name}>
      <td>
        {contributor.name.length > maxWidthName
          ? `${contributor.name.slice(0, maxWidthName)}..`
          : contributor.name}
      </td>
      <td>
        {contributor.amount / totalCommits <= 0.01
          ? "< 1"
          : ((contributor.amount / totalCommits) * 100.0).toFixed(0)}
        %
      </td>
      <td>{contributor.amount}</td>
      <td>
        <span
          style={{
            backgroundColor: contributor.color,
            display: "inline-block",
            width: 16,
            height: 16,
            borderRadius: "50%",
          }}
        />
      </td>
    </tr>
  ));

  // Separate the label and data values into separate arrays again
  const sortedLabels = labelDataArray.map((obj) => obj.name);
  const sortedData = labelDataArray.map((obj) => obj.amount);
  const colors = labelDataArray.map((obj) => obj.color);

  const total = data.reduce((acc, curr) => acc + curr, 0);

  const chartData = {
    labels: sortedLabels,
    datasets: [
      {
        data: sortedData,
        backgroundColor: colors,
      },
    ],
  };

  const options = {
    animate: true,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label;
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
      legend: {
        labels: {
          color: "#fff",
          fontWeight: "bold",
        },
        position: "right" as "right",
        align: "start" as "start",
      },
    },
  };

  return (
    <>
      <Container>
        <Row>
          <Table style={{ color: "#fff" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Percentage</th>
                <th>Commits</th>
                <th>Color</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </Table>
        </Row>
        <Row>
          <DropDown header="Contributor Piechart 🍰" collapsed={true}>
            <Container>
              <Row>
                <Col>
                  <Pie data={chartData} options={options} />
                </Col>
              </Row>
            </Container>
          </DropDown>
        </Row>
      </Container>
      <br />
    </>
  );
};

export default ContributorPiechart;
