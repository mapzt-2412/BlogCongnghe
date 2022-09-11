import React , { memo, useState } from "react";
import AreaChart from './Chart/AreaChart';
import LineChart from './Chart/LineChart';
import PieChart from './Chart/PieChart';
import DoughnutChart from './Chart/DoughnutChart';
import RadarChart from './Chart/RadarChart';
import PolarAreaChart from './Chart/PolarAreaChart';
import ScatterChart from './Chart/ScatterChart';
import BubbleChart from './Chart/BubbleChart';
import MultitypeChart from './Chart/MultitypeChart';
import { Modal, Row, Col, Radio, Button, RadioChangeEvent } from "antd";
import IconAreaChart from './../../assets/icon/IconAreaChart';
import IconBubbleChart from './../../assets/icon/IconBubbleChart';
import IconLineChart from './../../assets/icon/IconLineChart';
import IconDoughnutChart from './../../assets/icon/IconDoughnutChart';
import IconBarChart from "../../assets/icon/IconBarChart";
import EditDataChart from "./EditChartData/EditDataChart";

const options = [
  { label: <IconAreaChart/>, value: 'area-chart' },
  { label: <IconBarChart/>, value: 'bar-chart' },
  { label: <IconBubbleChart/>, value: 'bubble-chart' },
  { label: <IconLineChart/>, value: 'line-chart' },
  { label: <IconDoughnutChart/>, value: 'doughnut-chart' },
];

const Chart = ({ isModalChartVisible, setIsModalChartVisible, addData }) => {
  const [typeChart, setTypeChart] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState();

  const handleOk = () => {
    addData({
      lable: <LineChart dataChart={data}/>,
      title: "Biểu đồ",
    })
    setIsModalChartVisible(false);
  };

  const handleCancel = () => {
    setIsModalChartVisible(false);
  };

  const onChangeType = ({ target: { value } }: RadioChangeEvent) => {
    setTypeChart(value);
  };

    return (
      <div className="chart-wrapper">
        <Modal title="Tạo biểu đồ theo ý của bạn :v" visible={isModalChartVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
          <div className="chart-container">
            <div className="modal-chart-button">
              <Button type="primary" className="modal-chart-button-next" onClick={() => setPage(page + 1)}>Tiếp theo</Button>
              <Button type="primary" className="modal-chart-button-back" onClick={() => setPage(page - 1)}>Trở lại</Button>
            </div>
            <div className="modal-chart-content">
              {
                page === 1 &&
                <Radio.Group
                options={options}
                onChange={onChangeType}
                value={typeChart}
                optionType="button"
                buttonStyle="solid"
              />
              }
              {
                page === 2 &&
                <EditDataChart setData={setData} data={data}/>
              }
            </div>
          </div>
        </Modal>
      </div>
    )
}
export default memo(Chart);