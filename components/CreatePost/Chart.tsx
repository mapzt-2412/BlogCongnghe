import React, { FC , memo, useState } from "react";
import AreaChart from "./Chart/AreaChart";
import LineChart from "./Chart/LineChart";
import PieChart from "./Chart/PieChart";
import DoughnutChart from "./Chart/DoughnutChart";
import RadarChart from "./Chart/RadarChart";
import PolarAreaChart from "./Chart/PolarAreaChart";
import ScatterChart from "./Chart/ScatterChart";
import BubbleChart from "./Chart/BubbleChart";
import MultitypeChart from "./Chart/MultitypeChart";
import { Modal, Row, Col, Radio, Button, RadioChangeEvent } from "antd";
import ChartWrapper from "./Chart/ChartWrapper";
import IconAreaChart from "./../../assets/icon/IconAreaChart";
import IconBubbleChart from "./../../assets/icon/IconBubbleChart";
import IconLineChart from "./../../assets/icon/IconLineChart";
import IconDoughnutChart from "./../../assets/icon/IconDoughnutChart";
import IconBarChart from "../../assets/icon/IconBarChart";
import TableData from "./EditChartData/TableData";

interface IChartProps {
  isModalChartVisible: boolean | undefined,
  setIsModalChartVisible: (data) => void,
  addData?: (data) => void,
  handlEditTable?: (data) => void,
  dataTable?: object,
  type?: string,
}

const options = [
  { label: <IconAreaChart />, value: "area-chart" },
  { label: <IconBarChart />, value: "bar-chart" },
  { label: <IconBubbleChart />, value: "bubble-chart" },
  { label: <IconLineChart />, value: "line-chart" },
  { label: <IconDoughnutChart />, value: "doughnut-chart" },
];

const Chart : FC<IChartProps> = ({
  isModalChartVisible,
  setIsModalChartVisible,
  addData,
  dataTable,
  handlEditTable,
  type,
}) => {
  const [typeChart, setTypeChart] = useState(type? type :"");
  const [isType, setIsType] = useState(type? true : false);
  const [isOK, setIsOK] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(
    dataTable
      ? dataTable
      : {
          chartName: "",
          datasets: {},
          lables: {},
          dataTables: {},
          colors: {},
        }
  );
  const handleOk = () => {
    if(addData){
      addData({
        lable: <ChartWrapper type={typeChart} dataTable={data} />,
        title: "Biểu đồ",
      });
      setTypeChart("");
      setIsType(false);
      setPage(1);
      setIsOK(!isOK);
    }else if(handlEditTable){
      handlEditTable(data);
    }
    setIsModalChartVisible(false);
  };

  const handleCancel = () => {
    setIsModalChartVisible(false);
  };

  const onChangeType = ({ target: { value } }: RadioChangeEvent) => {
    setTypeChart(value);
    setIsType(true);
  };

  return (
    <div className="chart-wrapper">
      <Modal
        title="Tạo biểu đồ theo ý của bạn :v"
        visible={isModalChartVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <div className="chart-container">
          <div className="modal-chart-button">
            <Button
              type="primary"
              className="modal-chart-button-next"
              onClick={() => setPage(page + 1)}
              disabled={!isType}
            >
              Tiếp theo
            </Button>
            <Button
              type="primary"
              className="modal-chart-button-back"
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
            >
              Trở lại
            </Button>
          </div>
          <div className="modal-chart-content">
            {page === 1 && (
              <Radio.Group
                options={options}
                onChange={onChangeType}
                value={typeChart}
                optionType="button"
                buttonStyle="solid"
              />
            )}
            {page === 2 && (
              <TableData
                setData={setData}
                data={data}
                typeChart={typeChart}
                isOK={isOK}
              />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default memo(Chart);
