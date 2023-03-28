import React from "react";
import { Pie } from "react-chartjs-2";
import { Container, Row, Col } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register([ArcElement, Tooltip, Legend]);

interface Props {
  commitAuthorDates: { [key: string]: number };
}

const ContributorPiechart: React.FC<Props> = ({ commitAuthorDates }) => {
  const labels = Object.keys(commitAuthorDates);
  const data = Object.values(commitAuthorDates);

  const total = data.reduce((acc, curr) => acc + curr, 0);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
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
