import React, { memo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Rate, Menu } from "antd";
import Path from "../../components/Path";
import SidebarItem from "../../components/SideBar/SidebarItem";
import Sidebar from "../../components/SideBar/Sidebar.json";
import ListPost from "../../components/ListPost/ListPost";
import { getToken } from "../../libs/common";
import PropertiesService from "../../services/properties.service";
import DashboardInfo from "../../components/DashboardInfo/Dashboard-Info";
import DashboardPassword from "../../components/DashboardInfo/Dashboard-Password";
import Follower from '../../components/Follower/Follower';

const Dashboard = () => {
  const { id } = useRouter().query;
  const [value, setValue] = useState(3);
  const [token, setToken] = useState();
  const [key, setKey] = useState("2");
  const [data, setData] = useState();

  useEffect(() => {
      if(getToken()){
        setToken(getToken())
      }
    },[])

  useEffect(()=>{
      if(token){
          PropertiesService.getArticleByUser(token).then(data => setData(data.data.data))
      }
  },[token])

  const onChange = (key: string) => {
      setKey(key);
    };


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
            <SidebarItem key={index} item={item} onChange={onChange} count={key}/>
          ))}
        </div>

        <div className="profile-list-post">
          {
            key === "2" && <ListPost data={data?.listPost} id={"Bài viết đã đăng"}/>
          }
          {
            key === "4" && <DashboardInfo />
          }
          {
            key === "5" && <DashboardPassword />
          }
          {
            key === "6" && <Follower type={"2"} />
          }
          {
            key === "7" && <Follower type={"3"} />
          }
          {/* <Follower/> */}
        </div>
      </div>
    </div>
  );
};
export default memo(Dashboard);
