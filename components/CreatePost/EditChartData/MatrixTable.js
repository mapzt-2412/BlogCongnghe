import React, { memo, useState, useEffect, useCallback } from "react";
import { Input } from "antd";
import { color } from "../../../libs/commonConstants";

const MatrixTable = ({ col, row, setRow, setCol, setData, data, typeChart }) => {
  const [dataTable, setDataTable] = useState(data?.dataTables);
  const [dataset, setDataset] = useState(data?.datasets);
  const [lable, setLable] = useState(data?.lables);

  useEffect(() => {
    setData((pre) => {
      return {
        ...pre,
        datasets: dataset,
        lables: lable,
        dataTables: dataTable,
        col: col,
        row: row,
      };
    });
  }, [dataset, lable, dataTable, setData, col, row]);

  useEffect(() => {
    let colorChart = [];
    if(typeChart === "pie-chart" || typeChart === "doughnut-chart"){
      for (let i = 0; i < row; i++) {
        colorChart.push(color[i]);
      }
    }else{
      for (let i = 0; i < col; i++) {
        colorChart.push(color[i]);
      }
    }
    
    setData((pre) => {
      return {
        ...pre,
        colors: colorChart,
      };
    });
  }, [col, setData]);

  const renderCol = (length, index) => {
    let data = [];
    for (let i = 0; i < length; i++) {
      data.push(
        <td>
          <Input
            name={`input${i + 2}`}
            onChange={handleChangeInput}
            id={index + 1}
            value={
              dataTable[`input${i + 2}`]
                ? dataTable[`input${i + 2}`][index + 1]
                : ""
            }
          />
        </td>
      );
    }
    return data;
  };
  const renderDataset = (length) => {
    let data = [];
    for (let i = 0; i < length; i++) {
      data.push(
        <td>
          <Input
            name={`dataset${i + 2}`}
            onChange={handleChangeDataset}
            value={dataset ? dataset[`dataset${i + 2}`] : ""}
          />
        </td>
      );
    }
    return data;
  };
  const renderRow = (length) => {
    let data = [];
    for (let i = 0; i < length; i++) {
      data.push(
        <tr>
          <td>
            <Input
              name={`lable${i + 2}`}
              onChange={handleChangeLabel}
              value={lable ? lable[`lable${i + 2}`] : ""}
            />
          </td>
          <td>
            <Input
              name={`input${1}`}
              onChange={handleChangeInput}
              id={i + 2}
              value={
                dataTable[`input${1}`] ? dataTable[`input${1}`][i + 2] : ""
              }
            />
          </td>
          {renderCol(col - 1, i + 1).map((value, index) => (
            <>{value}</>
          ))}
        </tr>
      );
    }
    return data;
  };
  const handleChangeInput = (e) => {
    if (e.target.value == +e.target.value) {
      let data;
      for (const entry of Object.entries(dataTable)) {
        const [key, value] = entry;
        if (key === e.target.name) {
          data = value;
        }
      }
      if (data) {
        setDataTable({
          ...dataTable,
          [e.target.name]: { ...data, [e.target.id]: e.target.value },
        });
      } else {
        setDataTable({
          ...dataTable,
          [e.target.name]: { [e.target.id]: e.target.value },
        });
      }
    }
  };

  const handleChangeDataset = (e) => {
    setDataset({
      ...dataset,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeLabel = (e) => {
    setLable({
      ...lable,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="maxtrix-header">
        <div className="maxtrix-header-title">
          <p>Nhập số liệu: </p>
        </div>
        <div className="maxtrix-header-add">
          <p onClick={() => setCol(col + 1)}>Thêm cột</p>
          <p onClick={() => setRow(row + 1)}>Thêm hàng</p>
        </div>
      </div>
      <div className="maxtrix-content">
        <table>
          <thead>
            <tr>
              <td className="table-blank">
                <div className="table-blank"></div>
              </td>
              <td>
                <Input
                  name={`dataset${1}`}
                  onChange={handleChangeDataset}
                  value={dataset ? dataset[`dataset${1}`] : ""}
                />
              </td>
              {renderDataset(col - 1).map((value, index) => (
                <>{value}</>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Input
                  name={`lable${1}`}
                  onChange={handleChangeLabel}
                  value={lable ? lable[`lable${1}`] : ""}
                />
              </td>
              <td>
                <Input
                  name={`input${1}`}
                  onChange={handleChangeInput}
                  id={1}
                  value={
                    dataTable[`input${1}`] ? dataTable[`input${1}`][1] : ""
                  }
                />
              </td>
              {renderCol(col - 1, 0).map((value, index) => (
                <>{value}</>
              ))}
            </tr>
            {renderRow(row - 1).map((value) => (
              <>{value}</>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default memo(MatrixTable);
