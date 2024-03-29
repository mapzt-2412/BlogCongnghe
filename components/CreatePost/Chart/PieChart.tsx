import React, { useState, memo, useEffect, useCallback } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const findValueBykey = (obj, key) => {
  for (const entry of Object.entries(obj)) {
    const [lable, value] = entry;

    if (lable === key){
      return Object.values(value);
    };
  }
}


export default function PieChart( {dataChart}) {
  const [dataset, setDataset] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const newDataset = [];
    Object.values(dataChart.datasets).map((value,index) => {
      newDataset.push(
        {
          label: value,
          data: findValueBykey(dataChart.dataTables, `input${index + 1}`),
          borderColor: colors,
          backgroundColor: colors,
        }
      )
    }
  )
    setDataset(newDataset);
  },[colors, dataChart.dataTables, dataChart.datasets])

  useEffect(() => {
    Object.values(dataChart.colors).map((value,index) => {
      setColors(pre => {
        return [...pre, `${Object.values(value)[0]}`]
      })
    })
  },[dataChart.colors])
 
  const data = {
    labels: Object.values(dataChart.lables),
    datasets: dataset,
  }
  return <Pie data={data} />;
}
