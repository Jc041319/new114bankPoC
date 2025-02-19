import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ['General Sentiment', 'Customer Service', 'Ease and speed', 'Account and Services'],
    datasets: [
      {
        label: 'Colors',
        data: [22, 19, 7, 15],
        backgroundColor: ['rgba(251,192,192, 1', 'rgba(255,254,190, 1)', 'rgba(173,188,242, 1)', 'rgba(130,230,172, 1)'],
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
