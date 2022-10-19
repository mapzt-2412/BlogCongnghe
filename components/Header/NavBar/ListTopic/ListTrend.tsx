import React, { memo } from "react";
import { useRouter } from "next/router";

const ListTrend = ({title, data}) => {
    const router = useRouter()
    const handleClick = (name) => {
        router.push(`/list-post/${name}`)
    }
    return (
        <div className="dropdown-navbar-item">
            <div className="dropdown-navbar-item-title">
                <p>{title}</p>
            </div>
            <div className="dropdown-navbar-item-content">
                {
                    data.map((value, index) => (
                        <div className="dropdown-navbar-item-content-item" onClick ={() => handleClick(value.name)} key ={index}>
                            <p> {index + 1 + ". " + value.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default memo(ListTrend);