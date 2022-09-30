import React, { memo } from "react";

const ListTrend = ({title, data}) => {
    return (
        <div className="dropdown-navbar-item">
            <div className="dropdown-navbar-item-title">
                <p>{title}</p>
            </div>
            <div className="dropdown-navbar-item-content">
                {
                    data.map((value, index) => (
                        <p> {index + 1 + ". " + value}</p>
                    ))
                }
            </div>
        </div>
    )
}
export default memo(ListTrend);