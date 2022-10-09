import React, { memo, useState, useEffect  } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  ROUTE_ABOUT,
  ROUTE_HELP,
  ROUTE_HOME,
  ROUTE_NEWS,
  ROUTE_NEWSFEEDS,
  ROUTE_RECOMMEND,
  ROUTE_TREND,
  ROUTE_VLOG,
} from "./../../../libs/constants";
import ListTopic from "./ListTopic/ListTopic";
import ListTrend from "./ListTopic/ListTrend";
import PropertiesService from "../../../services/properties.service";

const data = [
  "Trong tương lai, mô hình kinh doanh chuyển sang online",
  "Trong tương lai, mô hình kinh doanh chuyển sang online",
  "Trong tương lai, mô hình kinh doanh chuyển sang online",
  "Trong tương lai, mô hình kinh doanh chuyển sang online",
  "Trong tương lai, mô hình kinh doanh chuyển sang online",
]
const NavBar = () => {
  const [isShowTopic, setIsShowTopic] = useState(false);
  const [topics, setTopics] = useState([]);
  const onMouseEnter = (item) => {
    if(item === "topic" && !isShowTopic){
        setIsShowTopic(true)
    }
  };

  const onMouseLeave = (item) => {
    if(item === "topic" && isShowTopic){
      setIsShowTopic(false)
    }
  }
  useEffect(() => {
    PropertiesService.getTopics().then((data) => setTopics(data.data.data))
  },[])
  const title = [
    {
      title: "Trang chủ",
      route: ROUTE_HOME,
    },
    {
      title: "Giới thiệu",
      route: ROUTE_ABOUT,
    },
    {
      title: "Bảng tin",
      route: ROUTE_NEWSFEEDS,
    },
    {
      title: "Xu hướng",
      route: ROUTE_TREND,
    },
    {
      title: "Tin tức",
      route: ROUTE_NEWS,
    },

    {
      title: "Đề xuất",
      route: ROUTE_RECOMMEND,
    },
    {
      title: "Trợ giúp",
      route: ROUTE_HELP,
    },
    {
      title: "Vlog",
      route: ROUTE_VLOG,
    },
    {
      title: "Chủ đề",
      route: ROUTE_VLOG,
      name: "topic",
    },
  ];

  const router = useRouter();
  return (
    <div className="navbar-container">
      {title.map((value) => (
        <Link href={value.route} key={value.title}>
          {value.name ? (
            <div
              className={
                router?.pathname === value?.route
                  ? "navbar-title active"
                  : "navbar-title"
              }
              onMouseEnter={() => onMouseEnter(value.name)}
              onMouseOut={ () => onMouseLeave(value.name) }
            >
              {value?.title}
            </div>
          ) : (
            <div
              className={
                router?.pathname === value.route
                  ? "navbar-title active"
                  : "navbar-title"
              }
            >
              {value.title}
            </div>
          )}
        </Link>
      ))}
      <div className={"dropdown-navbar " + (isShowTopic ? "show" : "hide")} onMouseEnter={() => setIsShowTopic(true)} onMouseLeave={() => setIsShowTopic(false)}> 
        <ListTrend title={"Danh sách chủ đề"} data = {topics}/>
      </div>
    </div>
  );
};
export default memo(NavBar);
