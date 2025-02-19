import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = () => {
  // Example feedback data
  const feedbackData = [
    { item: 'dafnzuh1aws1kffe', positive: 1, neutral: 2, negative: 2 },
    { item: '0vj8g2x5ju9tdcee', positive: 4, neutral: 1, negative: 1 },
    { item: 'rfnpgbybjzbwz4cf', positive: 3, neutral: 1, negative: 1 },
    { item: 'rwtayvj8hdg9vz1d', positive: 2, neutral: 1, negative: 1 },
  ];

  const labels = feedbackData.map((data) => data.item);

  const chartData = {
    labels: labels, // Feedback item labels
    datasets: [
      {
        label: 'Positive',
        data: feedbackData.map((data) => data.positive),
        backgroundColor: 'rgba(251,192,192, 1)',
        borderColor: 'rgba(166,18,31, 1)',
        borderWidth: 1,
      },
      {
        label: 'Neutral',
        data: feedbackData.map((data) => data.neutral),
        backgroundColor: 'rgba(255,254,190, 1)', // Yellow
        borderColor: 'rgba(204,153,0, 1)',
        borderWidth: 1,
      },
      {
        label: 'Negative',
        data: feedbackData.map((data) => data.negative),
        backgroundColor: 'rgba(173,188,242, 1)', // Red
        borderColor: 'rgba(80,80,70, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} responses`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Responses',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Feedback Items',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
