import { memo, useState, useCallback } from "react";
import { Button } from "antd";
import Chart from "../Chart";
import LineChart from "./LineChart";
import AreaChart from "./AreaChart";
import DoughnutChart from "./DoughnutChart";

const ChartWrapper = ({ type, dataTable }) => {
  const [data, setData] = useState(dataTable);
  const [isModalChartVisible, setIsModalChartVisible] = useState(false);
  
  const handlEditTable = useCallback ((data) => {
    setData(data)
  },[])
  const editTable = () => {
    setIsModalChartVisible(true);
  };

  const renderChart = () => {
    if (type === "area-chart") {
      return <LineChart dataChart={data} />;
    } else if (type === "line-chart") {
      return <AreaChart dataChart={data} />;
    } else if (type === "doughnut-chart") {
      return <DoughnutChart dataChart={data} />;
    }
  };
  return (
    <>
      <Chart isModalChartVisible={isModalChartVisible} setIsModalChartVisible={setIsModalChartVisible} dataTable={data} handlEditTable={handlEditTable} type={type} isEdit={true}/>
      <Button onClick={editTable}>Chỉnh sửa biểu đồ</Button>
      <div className="chart-detail-wrapper">
        <div className="chart-detail">
          {renderChart()}
        </div>
      </div>
    </>
  );
};
export default memo(ChartWrapper);
