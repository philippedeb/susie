import React from "react";
import { Pie } from "react-chartjs-2";
import { Container, Row, Col } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register([ArcElement, Tooltip, Legend]);

interface Props {
  commitAuthorDates: { [key: string]: number };
}

interface contributor {
  name: string;
  amount: number;
}

function sortAndPruneTupleList(labels: string[], data: number[], n: number): contributor[] {
    const labelDataArray: contributor[] = labels.map((label, index) => ({ name: label, amount: data[index] }));
    labelDataArray.sort((b, a) => a.amount - b.amount);

    const otherList = labelDataArray.slice(n, labelDataArray.length);
    console.log(otherList);
    const otherpercentage = otherList.reduce((acc, value) => acc + value.amount, 0);
    console.log(otherpercentage);
    const other: contributor = {name: "other", amount: otherpercentage};
    console.log(other);

    const prunedArray = labelDataArray.slice(0, n);
    console.log(prunedArray);

    prunedArray.push(other);
    console.log(prunedArray);

    return prunedArray;
}

const ContributorPiechart: React.FC<Props> = ({ commitAuthorDates }) => {
  const labels = Object.keys(commitAuthorDates);
  const data = Object.values(commitAuthorDates);
  

  const labelDataArray = sortAndPruneTupleList(labels, data, 8);

  // Separate the label and data values into separate arrays again
  const sortedLabels = labelDataArray.map(obj => obj.name);
  const sortedData = labelDataArray.map(obj => obj.amount);

  const total = data.reduce((acc, curr) => acc + curr, 0);

  const chartData = {
    labels: sortedLabels,
    datasets: [
      {
        data: sortedData,
        backgroundColor: [
          "#e60049",
          "#0bb4ff",
          "#50e991",
          "#e6d800",
          "#9b19f5",
          "#ffa300",
          "#dc0ab4",
          "#b3d4ff",
          "#00bfa0",
        ],
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
            // const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value}`;
          },
        },
      },
      legend: {
        labels: {
          color: "#fff",
          fontWeight: "bold",
        },
        position: "top" as "top",
        align: "start" as "start",
      },
    },
  };

  return (
    <Container>
      <Row>
        <Col>
          <Pie data={chartData} options={options} />
        </Col>
      </Row>
    </Container>
  );
};

export default ContributorPiechart;
