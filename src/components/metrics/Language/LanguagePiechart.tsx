import React from "react";
import { Pie } from "react-chartjs-2";
import { Container, Row, Col } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register([ArcElement, Tooltip, Legend]);

interface Props {
  languages: { [key: string]: number };
}

const LanguagePiechart: React.FC<Props> = ({ languages }) => {
  const labels = Object.keys(languages);
  const data = Object.values(languages);

  const total = data.reduce((acc, curr) => acc + curr, 0);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#32CD32",
          "#7B68EE",
          "#FF69B4",
          "#8B4513",
          "#FFA500",
          "#000080",
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
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${percentage}%`;
          },
        },
      },
      legend: {
        labels: {
          color: "#fff",
          fontWeight: "bold",
        },
        position: "right" as "right",
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

export default LanguagePiechart;
