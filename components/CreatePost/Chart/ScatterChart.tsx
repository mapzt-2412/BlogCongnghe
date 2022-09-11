import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const data = {
  datasets: [
    {
      label: 'A dataset',
      data: [{x: 10, y: 20} , {x : 20, y: 40}],
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

export default function ScatterChart() {
  return <Scatter options={options} data={data} />;
}
