import { memo, useState, useCallback, useEffect } from "react";
import { Button } from "antd";
import Chart from "../Chart";
import LineChart from "./LineChart";
import AreaChart from "./AreaChart";
import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const ChartWrapper = ({ type, dataTable, isModal }) => {
  const [data, setData] = useState(dataTable);
  const [isModalChartVisible, setIsModalChartVisible] = useState(false);

  console.log(type)
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
    } else if (type === "bar-chart") {
      return <BarChart dataChart={data} />;
    }else if (type === "pie-chart") {
      return <PieChart dataChart={data} />;
    }else if (type === "bar-chart-horizontal") {
      return <BarChart dataChart={data} type={"horizontal"}/>
    }
  };
  return (
    <>
      <Chart isModalChartVisible={isModalChartVisible} setIsModalChartVisible={setIsModalChartVisible} dataTable={data} handlEditTable={handlEditTable} type={type} isEdit={true}/>
      {
        !isModal && (
          <Button onClick={editTable}>Chỉnh sửa biểu đồ</Button>
        )
      }
      <div className="chart-detail-wrapper">
        <div className="chart-detail">
          {renderChart()}
        </div>
      </div>
    </>
  );
};
export default memo(ChartWrapper);
