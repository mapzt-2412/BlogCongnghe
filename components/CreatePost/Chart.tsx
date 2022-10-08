import React, { FC, memo, useState } from "react";
import AreaChart from "./Chart/AreaChart";
import LineChart from "./Chart/LineChart";
import PieChart from "./Chart/PieChart";
import DoughnutChart from "./Chart/DoughnutChart";
import RadarChart from "./Chart/RadarChart";
import PolarAreaChart from "./Chart/PolarAreaChart";
import ScatterChart from "./Chart/ScatterChart";
import BubbleChart from "./Chart/BubbleChart";
import MultitypeChart from "./Chart/MultitypeChart";
import {
  Modal,
  Row,
  Col,
  Radio,
  Button,
  RadioChangeEvent,
  InputNumber,
} from "antd";
import ChartWrapper from "./Chart/ChartWrapper";
import IconAreaChart from "./../../assets/icon/IconAreaChart";
import IconBubbleChart from "./../../assets/icon/IconBubbleChart";
import IconLineChart from "./../../assets/icon/IconLineChart";
import IconDoughnutChart from "./../../assets/icon/IconDoughnutChart";
import IconBarChartHorizontal from "./../../assets/icon/IconBarChartHorizontal";
import IconBarChart from "../../assets/icon/IconBarChart";
import IconBack from "../../assets/icon/IconBack";
import TableData from "./EditChartData/TableData";
import MatrixTable from "./EditChartData/MatrixTable";

interface IChartProps {
  isModalChartVisible: boolean | undefined;
  setIsModalChartVisible: (data) => void;
  addData?: (data) => void;
  addDataContent?: (data) => void;
  handlEditTable?: (data) => void;
  dataTable?: object;
  type?: string;
  isEdit?: boolean;
}

const options = [
  { label: <IconAreaChart />, value: "area-chart" },
  { label: <IconBarChart />, value: "bar-chart" },
  { label: <IconBubbleChart />, value: "bubble-chart" },
  { label: <IconLineChart />, value: "line-chart" },
  { label: <IconDoughnutChart />, value: "doughnut-chart" },
];

const Chart: FC<IChartProps> = ({
  isModalChartVisible,
  setIsModalChartVisible,
  addData,
  dataTable,
  handlEditTable,
  type,
  isEdit,
  addDataContent,
}) => {
  const [typeChart, setTypeChart] = useState(type ? type : "");
  const [isType, setIsType] = useState(type ? true : false);
  const [isOK, setIsOK] = useState(false);
  const [page, setPage] = useState(1);
  const [col, setCol] = useState(dataTable?.col ? dataTable?.col : 1);
  const [row, setRow] = useState(dataTable?.row ? dataTable?.row : 1);
  const [data, setData] = useState(
    dataTable
      ? dataTable
      : {
          chartName: "",
          datasets: {},
          lables: {},
          dataTables: {},
          colors: [],
          col: 1,
          row: 1,
        }
  );
  const handleOk = () => {
    if (addData) {
      addData({
        lable: (
          <ChartWrapper type={typeChart} dataTable={data} isTable={false} />
        ),
        title: "Biểu đồ",
      });
      addDataContent(
        {
          type: "chart",
          data: {...data, typeChart: typeChart},
        }
      );
      setTypeChart("");
      setIsType(false);
      setPage(1);
      setIsOK(!isOK);
      setData({
        chartName: "",
        datasets: {},
        lables: {},
        dataTables: {},
        colors: [],
        count: 0,
      });
    } else if (handlEditTable) {
      handlEditTable(data);
    }
    setIsModalChartVisible(false);
  };

  const handleCancel = () => {
    setIsModalChartVisible(false);
  };

  const onChangeType = (value) => {
    setTypeChart(value);
    setIsType(true);
  };
  const changePage = () => {
    if (page === 3) {
      handleOk();
    } else if (isType) {
      setPage(page + 1);
    }
  };
  const backPage = () => {
    if (isType) {
      setPage(page - 1);
    }
  };
  return (
    <div className="chart-wrapper">
      <Modal
        visible={isModalChartVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <div className="chart-container">
          <div className="modal-title">Bảng biểu</div>
          <div className="modal-chart-content">
            {page === 1 && (
              <>
                <div className="modal-chart-input">
                  <div className="modal-chart-input-col">
                    <p>Chọn số cột:</p>
                    <InputNumber
                      min={1}
                      controls={false}
                      value={col}
                      onChange={(value) => setCol(value)}
                    />
                  </div>
                  <div className="modal-chart-input-row">
                    <p>Chọn số hàng:</p>
                    <InputNumber
                      min={1}
                      controls={false}
                      value={row}
                      onChange={(value) => setRow(value)}
                    />
                  </div>
                </div>
                <div className="modal-chart-type">
                  <p>Chọn biểu đồ:</p>
                  <Row gutter={16}>
                    <Col span={4}>
                      <div
                        className={`type-item ${
                          typeChart === "bar-chart" && "active"
                        }`}
                        onClick={() => onChangeType("bar-chart")}
                      >
                        <IconBarChart />
                      </div>
                    </Col>
                    <Col span={4}>
                      <div
                        className={`type-item ${
                          typeChart === "bar-chart-horizontal" && "active"
                        }`}
                        onClick={() => onChangeType("bar-chart-horizontal")}
                      >
                        <IconBarChartHorizontal />
                      </div>
                    </Col>
                    <Col span={4}>
                      <div
                        className={`type-item ${
                          typeChart === "bubble-chart" && "active"
                        }`}
                        onClick={() => onChangeType("bubble-chart")}
                      >
                        <IconBubbleChart />
                      </div>
                    </Col>
                    <Col span={4}>
                      <div
                        className={`type-item ${
                          typeChart === "area-chart" && "active"
                        }`}
                        onClick={() => onChangeType("area-chart")}
                      >
                        <IconAreaChart />
                      </div>
                    </Col>
                    <Col span={4}>
                      <div
                        className={`type-item ${
                          typeChart === "doughnut-chart" && "active"
                        }`}
                        onClick={() => onChangeType("doughnut-chart")}
                      >
                        <IconDoughnutChart />
                      </div>
                    </Col>
                    <Col span={4}>
                      <div
                        className={`type-item ${
                          typeChart === "line-chart" && "active"
                        }`}
                        onClick={() => onChangeType("line-chart")}
                      >
                        <IconLineChart />
                      </div>
                    </Col>
                  </Row>
                </div>
              </>
            )}
            {page === 2 && (
              // <TableData
              //   setData={setData}
              //   data={data}
              //   typeChart={typeChart}
              //   isOK={isOK}
              //   isEdit={isEdit}
              // />
              <MatrixTable
                col={col}
                row={row}
                setCol={setCol}
                setRow={setRow}
                setData={setData}
                data={data}
              />
            )}
            {page === 3 && (
              <ChartWrapper type={typeChart} dataTable={data} isModal={true} />
            )}
          </div>
        </div>
        <div className="modal-chart-button-wrapper">
          {page !== 1 && (
            <div
              className={`modal-chart-button ${!isType && "disable"}`}
              onClick={backPage}
            >
              <IconBack width={24} />
              <p>Trở lại</p>
            </div>
          )}
          <div
            className={`modal-chart-button next ${!isType && "disable"}`}
            onClick={changePage}
          >
            <IconBack width={24} />
            <p>Tiếp tục</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default memo(Chart);
