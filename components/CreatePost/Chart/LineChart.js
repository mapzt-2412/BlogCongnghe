import React, { memo, useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

 function LineChart({dataChart}){
  const [dataset, setDataset] = useState([]);

  const setDatasetFunction = () => {
    const newDataset = [];
    Object.values(dataChart.datasets).map((value,index) => {
      newDataset.push(
        {
          label: value,
          data: findValueBykey(dataChart.dataTables, `input${index + 1}`),
          borderColor: `rgba(${Object.values(findValueBykey(dataChart.colors, `color${index + 1}`)).join(',')})`,
          backgroundColor: `rgba(${Object.values(findValueBykey(dataChart.colors, `color${index + 1}`)).join(',')})`,
        }
      )
    }
    )
    setDataset(newDataset);
  }
  useEffect(() => {
    setDatasetFunction();
  },[])
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: dataChart.chartName,
      },
    },
  };

  
  const data = {
    labels: Object.values(dataChart.lables),
    datasets: dataset,
  }
  return <Line options={options} data={data} />;
}
export default memo(LineChart)