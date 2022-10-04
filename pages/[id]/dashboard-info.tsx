import React, { memo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Rate, Menu } from "antd";
import Path from "../../components/Path";
import SidebarItem from "../../components/SideBar/SidebarItem";
import Sidebar from "../../components/SideBar/Sidebar.json";
import DashboardInfo from "../../components/DashboardInfo/Dashboard-Info";

const dashboardInfo = () => {
  const { id } = useRouter().query;
  const [value, setValue] = useState(3);
  const [token, setToken] = useState();
  const [data, setData] = useState();
  //   const [Sidebar, setSidebar] = useState();

  // useEffect(() => {
  //     if(getToken()){
  //       setToken(getToken())
  //     }
  //   },[])

  // useEffect(()=>{
  //     if(token){
  //         PropertiesService.getProfile(token).then(data => setData(data.data.data))
  //     }
  // },[token])

  // const onChange = (key: string) => {
  //     console.log(key);
  //   };

  return (
    <div className="medium-container">
      <Path data={{ title: ["Trang cá nhân"], content: id }} />
      <div className="profile-user-content">
        <div className="profile-menu dashboard-detail">
          {/* <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        items={menuItems}
                    /> */}

          {Sidebar.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>

        <div className="profile-list-post">
          {/* <ListPost /> */}
          {/* <Follower /> */}
          <DashboardInfo />
        </div>
      </div>
    </div>
  );
};
export default memo(dashboardInfo);
