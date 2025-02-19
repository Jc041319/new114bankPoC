import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = () => {
  // const data = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  //   datasets: [
  //     {
  //       label: 'Positive',
  //       data: [30, 45, 60, 40, 50, 70], [70, 45, 50, 30, 55, 10],
  //       borderColor: 'rgba(75, 192, 192, 1)',
  //       backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //       tension: 0.3,
  //     },
  //   ],
  // };
  const data = {
    labels: ["0vj8g2x5ju9tdcee", "82kvnh5u31tnt6av", "ry27vdnvn3ty8e89", "y3k2etvnsf6uh2aq", "rwtayvj8hdg9vz1d", "bnh0j33ubrp3fqgv", "dafnzuh1aws1kffe", "rfnpgbybjzbwz4cf", "fujd4j30asbycvc1"],
    datasets: [
      {
        label: "Positive",
        data: [4, 3, 0, 2, 2, 2, 1, 3, 2],
        fill: true,
        backgroundColor: "#A6121F",
        borderColor: "#A6121F"
      },
      {
        label: "Negative",
        data: [0, 0, 4, 0, 1, 0, 2, 0, 2],
        fill: true,
        backgroundColor: "#505046",
        borderColor: "#505046"
      },
      {
        label: "Neutral",
        data: [0, 0, 0, 0, 0, 0, 2, 1, 0],
        fill: true,
        backgroundColor: "#D9AA1E",
        borderColor: "#D9AA1E"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
