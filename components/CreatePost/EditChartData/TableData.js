import { Input, Button } from "antd";
import React, { memo, useState, useEffect, useCallback } from "react";
import { Colorpicker, ColorPickerValue } from "antd-colorpicker";

const TableData = ({ setData, typeChart, data, isOK, isEdit }) => {
  const [chartName, setChartName] = useState(data?.chartName);
  const [dataTable, setDataTable] = useState(data?.dataTables);
  const [dataset, setDataset] = useState(data?.datasets);
  const [isMultiCol, setIsMultiCol] = useState(true);
  const [lable, setLable] = useState(data?.lables);
  const [color, setColor] = useState(data?.colors);
  const [row, setRow] = useState(2);
  const [col, setCol] = useState(2);

  useEffect(() => {
    setData((pre) => {
      return {
        ...pre,
        chartName: chartName,
        datasets: dataset,
        lables: lable,
        dataTables: dataTable,
        colors: color,
      };
    });
  }, [dataset, lable, dataTable, color, chartName, setData]);

  useEffect(() => {
    if (typeChart === "doughnut-chart") {
      setIsMultiCol(false);
    }
  }, [typeChart]);

  useEffect(() => {
    if (isOK) {
      handleReset();
    }
  }, [isOK, handleReset]);

  useEffect(() => {
    if(isEdit){
      if (Object.keys(dataset).length !== 0) {
        setRow(1 + Object.keys(dataset).length);
      }
      if (Object.keys(lable).length !== 0) {
        setCol(1 + Object.keys(lable).length);
      }
    }
  }, [dataset, lable, isEdit]);

  const handleChangeChartName = (e) => {
    setChartName(e.target.value);
  };

  const handleChangeColor = (colorHex, name) => {
    setColor({
      ...color,
      [name]: colorHex.rgb,
    });
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

  const handleReset = useCallback(() => {
    setChartName("");
    setDataTable({});
    setDataset({});
    setLable({});
    setColor({});
    setRow(2);
    setCol(2);
    setData({
      chartName: "",
      datasets: {},
      lables: {},
      dataTables: {},
      colors: {},
    });
  }, [setData]);
  const renderRow = (length) => {
    let data = [];
    for (let i = 0; i < length; i++) {
      data.push(
        <td onClick={() => handleRenderRow(i + 2)}>
          <Input
            placeholder="Nhập tên cho các cột"
            onChange={handleChangeDataset}
            value={dataset ? dataset[`dataset${i + 2}`] : ""}
            name={`dataset${i + 2}`}
          />
        </td>
      );
    }
    return data;
  };

  const renderCell = (length, index) => {
    let data = [];
    data.push(
      <td>
        <Input
          placeholder="Nhập tên cho các tập dữ liệu"
          onChange={handleChangeLabel}
          name={`lable${index + 2}`}
          value={lable ? lable[`lable${index + 2}`] : ""}
        />
      </td>
    );
    for (let i = 1; i < length; i++) {
      data.push(
        <td onClick={() => handleRenderRow(i)}>
          <Input
            onChange={handleChangeInput}
            name={`input${i}`}
            id={index + 2}
            value={
              dataTable[`input${i}`] ? dataTable[`input${i}`][index + 2] : ""
            }
          />
        </td>
      );
    }
    if (!isMultiCol) {
      data.push(
        <td>
          <div className="color-picker">
            <Colorpicker
              popup
              onChange={(color) =>
                handleChangeColor(color, `color${index + 2}`)
              }
              name={`color${index + 2}`}
              value={color ? color[`color${index + 2}`] : ""}
            />
            Hãy chọn màu cho biểu đồ
          </div>
        </td>
      );
    }
    return data;
  };

  const renderCol = (length) => {
    let data = [];
    for (let i = 0; i < length; i++) {
      data.push(
        <tr onClick={() => handleRenderCol(i + 2)}>
          {renderCell(row, i).map((value, index) => (
            <>{value}</>
          ))}
        </tr>
      );
    }
    return data;
  };
  const handleRenderRow = (index) => {
    if (index === row - 1 && isMultiCol) {
      setRow(row + 1);
    }
  };
  const handleRenderCol = (index) => {
    if (index === col - 1) {
      setCol(col + 1);
    }
  };
  return (
    <div className="form-chart-container">
      <Input
        placeholder="Nhập tên của biểu đồ"
        value={chartName}
        onChange={handleChangeChartName}
      />
      <div className="chart-data-form">
        <Button onClick={handleReset}>Clear data</Button>
        <table>
          <thead>
            <tr>
              <td className="table-blank">
                <div className="table-blank"></div>
              </td>
              <td onClick={() => handleRenderRow(1)}>
                <Input
                  placeholder="Nhập tên cho các cột"
                  onChange={handleChangeDataset}
                  name={`dataset${1}`}
                  value={dataset ? dataset[`dataset${1}`] : ""}
                />
              </td>
              {isMultiCol ? (
                renderRow(row - 2).map((value) => <>{value}</>)
              ) : (
                <td className="table-blank">
                  <div className="table-blank"></div>
                </td>
              )}
            </tr>
          </thead>
          <tbody>
            <tr onClick={() => handleRenderCol(1)}>
              <td>
                <Input
                  placeholder="Nhập tên cho các tập dữ liệu"
                  name={`lable${1}`}
                  value={lable ? lable[`lable${1}`] : ""}
                  onChange={handleChangeLabel}
                />
              </td>
              <td>
                <Input
                  name={`input${1}`}
                  onChange={handleChangeInput}
                  value={
                    dataTable[`input${1}`] ? dataTable[`input${1}`][`1`] : ""
                  }
                  id={1}
                />
              </td>
              {!isMultiCol && (
                <td>
                  <div className="color-picker">
                    <Colorpicker
                      popup
                      onChange={(color) =>
                        handleChangeColor(color, `color${1}`)
                      }
                      name={`color${1}`}
                      value={color ? color[`color${1}`] : ""}
                    />
                    Hãy chọn màu cho biểu đồ
                  </div>
                </td>
              )}
              {renderRow(row - 2).map((_, index) => (
                <>
                  {
                    <td onClick={() => handleRenderRow(index + 2)}>
                      <Input
                        name={`input${index + 2}`}
                        onChange={handleChangeInput}
                        value={
                          dataTable[`input${index + 2}`]
                            ? dataTable[`input${index + 2}`][`1`]
                            : ""
                        }
                        id={1}
                      />
                    </td>
                  }
                </>
              ))}
            </tr>
            {renderCol(col - 2).map((value) => (
              <>{value}</>
            ))}
            {isMultiCol && (
              <tr>
                <td className="table-blank">
                  <div className="table-blank"></div>
                </td>
                <td>
                  <div className="color-picker">
                    <Colorpicker
                      popup
                      onChange={(color) =>
                        handleChangeColor(color, `color${1}`)
                      }
                      name={`color${1}`}
                      value={color ? color[`color${1}`] : ""}
                    />
                    Hãy chọn màu cho biểu đồ
                  </div>
                </td>
                {renderRow(row - 2).map((value, index) => (
                  <td key={index}>
                    {
                      <div className="color-picker">
                        <Colorpicker
                          popup
                          onChange={(color) =>
                            handleChangeColor(color, `color${index + 2}`)
                          }
                          name={`color${index + 2}`}
                          value={color ? color[`color${index + 2}`] : ""}
                        />
                        Hãy chọn màu cho biểu đồ
                      </div>
                    }
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default memo(TableData);
