import { Input } from "antd";
import React, { memo, useState, useEffect } from "react";
import { Colorpicker, ColorPickerValue } from 'antd-colorpicker'

const EditDataChart = ({setData, data}) => {
  const [chartName, setChartName] = useState("");
  const [dataTable, setDataTable] = useState({});
  const [dataset, setDataset] = useState({});
  const [lable, setLable] = useState({});
  const [color, setColor] = useState({})
  const [row, setRow] = useState(2);
  const [col, setCol] = useState(2);

  useEffect(() => {
   setData({
      ...data,
      chartName: chartName,
      datasets: dataset,
      lables: lable,
      dataTables: dataTable,
      colors: color,
   })
  },[dataset, lable, dataTable, setData, data, color, chartName])

  const handleChangeChartName = (e) => {
    setChartName(e.target.value)
  }
  const handleChangeColor = (colorHex, name) => {
    setColor({
      ...color,
      [name]: colorHex.rgb,
    })
    console.log(color)
  }
  const handleChangeInput = (e) => {
   let data;
   for (const entry of Object.entries(dataTable)) {
      const [key, value] = entry;
      if (key === e.target.name){
         data = value;
      };
    }
   if(data){
      setDataTable({
         ...dataTable,
         [e.target.name]: {...data, [e.target.id]: e.target.value},
      })
   }else{
      setDataTable({
         ...dataTable,
         [e.target.name]: {[e.target.id]: e.target.value},
      })
   }
  }

  const handleChangeDataset = (e) => {
      setDataset({
         ...dataset,
         [e.target.name]: e.target.value,
      })
   }
   const handleChangeLabel = (e) => {
      setLable({
         ...lable,
         [e.target.name]: e.target.value,
      })
   }
  const renderRow = (length) => {
    let data = [];
    for (let i = 0; i < length; i++) {
      data.push(
        <td onClick={() => handleRenderRow(i + 2)}>
          <Input placeholder="Nhập tên cho các cột" onChange={handleChangeDataset} name={`dataset${i+2}`}/>
        </td>
      );
    }
    return data;
  };

  const renderCell = (length,index) => {
   let data = [];
   data.push(
      <td>
        <Input placeholder="Nhập tên cho các tập dữ liệu" onChange={handleChangeLabel} name={`lable${index+2}`}/>
      </td>
    )
   for (let i = 1; i < length; i++) {
     data.push(
       <td onClick={() => handleRenderRow(i)}>
         <Input onChange ={handleChangeInput} name={`input${i}`} id={index+2}/>
       </td>
     );
   }
   return data;
 };

  const renderCol = (length) => {
    let data = [];
    for (let i = 0; i < length ; i++) {
      data.push(
        <tr onClick={() => handleRenderCol(i + 2)}>
          {renderCell(row,i).map((value,index) => (
            <>{
               value
            }</>
          ))}
        </tr>
      );
    }
    return data;
  };
  const handleRenderRow = (index) => {
    if (index === row - 1) {
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
      <Input placeholder="Nhập tên của biểu đồ" onChange={handleChangeChartName}/>
      <div className="chart-data-form">
        <table>
          <thead>
            <tr>
              <td className="table-blank">
                <div className="table-blank"></div>
              </td>
              <td onClick={() => handleRenderRow(1)}>
                <Input placeholder="Nhập tên cho các cột" onChange={handleChangeDataset}  name={`dataset${1}`}/>
              </td>
              {renderRow(row - 2).map((value) => (
                <>{value}</>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr onClick={() => handleRenderCol(1)}>
              <td>
                <Input placeholder="Nhập tên cho các tập dữ liệu" name={`lable${1}`} onChange ={handleChangeLabel}/>
              </td>
              <td>
                <Input name={`input${1}`} onChange={handleChangeInput} id={1}/>
              </td>
              {renderRow(row - 2).map((_,index) => (
                <>{
                  <td onClick={() => handleRenderRow(index + 2)}>
                     <Input name={`input${index + 2}`} onChange ={handleChangeInput} id={1}/>
                  </td>
                }</>
              ))}
            </tr>
            {renderCol(col - 2).map((value) => (
              <>{value}</>
            ))}
            <tr>
              <td className="table-blank">
                <div className="table-blank"></div>
              </td>
              <td>
                <div className="color-picker">
                  <Colorpicker popup onChange={(color) => handleChangeColor(color, `color${1}`)} name={`color${1}`} value={color[`color${1}`]}/>
                  Hãy chọn màu cho biểu đồ
                </div>
              </td>
              {renderRow(row - 2).map((value, index) => (
                
                <td key={index}>{
                  <div className="color-picker">
                  <Colorpicker popup onChange={(color) => handleChangeColor(color, `color${index+2}`)} name={`color${index+2}`} value={color[`color${index+2}`]}/>
                  Hãy chọn màu cho biểu đồ
                  </div>
                  }
                  
                  </td>
                  
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default memo(EditDataChart);
