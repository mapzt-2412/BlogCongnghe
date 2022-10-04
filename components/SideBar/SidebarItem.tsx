import React from "react";
import { useState } from "react";

export default function SidebarItem({ item }) {
  // const [open, setOpen] = useState(false)
  if (item.childrens) {
    return (
      <div className="sidebar-item">
        <div className="sidebar-title">
          <span>{item.title}</span>
          {/* <br></br> */}
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
          <br></br>
          {/* <hr></hr> */}
        </div>
      </div>
    );
  }else{
    return (
      <>
        <a href={item.path || "#"} className="plain" style={{color: "#333", marginLeft: 16}}>
            {/* { item.icon && <i className={item.icon}></i> } */}
            {item.title}
        </a>
        <br></br>
        <br></br>
      </>
    )
}
}
