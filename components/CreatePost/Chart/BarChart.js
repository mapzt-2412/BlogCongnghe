import React from 'react';
import { memo, useState, useCallback, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const findValueBykey = (obj, key) => {
  for (const entry of Object.entries(obj)) {
    const [lable, value] = entry;

    if (lable === key){
      return Object.values(value);
    };
  }
}

export default function BarChart({dataChart , type}) {
  const [dataset, setDataset] = useState([]);

  const setDatasetFunction = useCallback(() => {
    const newDataset = [];
    Object.values(dataChart.datasets).map((value,index) => {
      newDataset.push(
        {
          label: value,
          data: findValueBykey(dataChart.dataTables, `input${index + 1}`),
          borderColor: dataChart.colors[index].border,
          backgroundColor: dataChart.colors[index].background,
        }
      )
    }
    )
    setDataset(newDataset);
  },[])
  useEffect(() => {
    setDatasetFunction();
  },[setDatasetFunction])
  
  const options = {
    indexAxis: type ? 'y'  : 'x'   ,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: dataChart.chartName ? dataChart.chartName : "Biểu đồ",
      },
    },
  };

  
  const data = {
    labels: Object.values(dataChart.lables),
    datasets: dataset,
  }
  console.log(dataset)
  return <Bar options={options} data={data} />;
}
