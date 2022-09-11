import { Input } from "antd";
import React , { memo, useState } from "react";

const FormChart = () => {
    const {dataTable, setDataTable} = useState([]);
    return (
        <div className="form-chart-container">
            <Input placeholder="Nhập tên của tập dữ liệu" />
            <div className="chart-data-form">
                <table>
                    <tr>
                        <td></td>
                        <td><Input placeholder="Nhập tên cho các cột" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><Input placeholder="Nhập tên cho các cột" /></td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
export default memo(FormChart);