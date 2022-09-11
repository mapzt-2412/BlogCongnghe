import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

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
      label: 'Red dataset',
      data: [{x: 10, y: 20, r: 5} , {x : 20, y: 40, r: 5}],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Blue dataset',
      data: [{x: 15, y: 25, r: 5} , {x : 21, y: 20, r: 5}],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function BubbleChart() {
  return <Bubble options={options} data={data} />;
}
