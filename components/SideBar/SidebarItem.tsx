import React from "react";
import { useState, useEffect } from "react";

export default function SidebarItem({ item, onChange, count }) {
  const [key, setKey] = useState("2")
  useEffect(() => {
    if(count !== "undefine"){
      setKey(count)
    }
  },[count])
  console.log(key )
  if (item.childrens) {
    return (
      <div className="sidebar-item">
        <div className="sidebar-title">
          <span>{item.title}</span>
          {/* <br></br> */}
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => (
            <SidebarItem key={index} item={child} onChange={onChange} count={key}/>
          ))}
          <br></br>
          {/* <hr></hr> */}
        </div>
      </div>
    );
  }else{
    return (
      <>
        <div className={"plain " + (key === item.key && "active")} style={{color: "#333"}} onClick={() => onChange(item.key)}>
            {/* { item.icon && <i className={item.icon}></i> } */}
            {item.title}
        </div>
      </>
    )
}
}
