import React, { memo, useState, useEffect } from "react";
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
import { Dropdown, Menu, message, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import IconSignin from "../../../assets/icon/IconSignin";
import IconSignup from "../../../assets/icon/IconSignup";
import AvatarDefaultSmall from "../../../assets/icon/AvatarDefaultSmall";
import IconUploadArticle from "../../../assets/icon/IconUploadArticle";
import { deleteToken } from "../../../libs/common";

const data = [
  "Trong tương lai, mô hình kinh doanh chuyển sang online",
  "Trong tương lai, mô hình kinh doanh chuyển sang online",
  "Trong tương lai, mô hình kinh doanh chuyển sang online",
  "Trong tương lai, mô hình kinh doanh chuyển sang online",
  "Trong tương lai, mô hình kinh doanh chuyển sang online",
];
const NavBar = ({
  token,
  toggleModal,
  setIsShowMenuMobile,
  isShowMenuMobile,
  isMobile,
}) => {
  const [isShowTopic, setIsShowTopic] = useState(false);
  const [topics, setTopics] = useState([]);
  // const [isHide, setIsHide] = useState(true)
  const onMouseEnter = (item) => {
    if (item === "topic" && !isShowTopic) {
      setIsShowTopic(true);
    }
  };

  const onMouseLeave = (item) => {
    if (item === "topic" && isShowTopic) {
      setIsShowTopic(false);
    }
  };
  useEffect(() => {
    PropertiesService.getTopics().then((data) => setTopics(data.data.data));
  }, []);

  // useEffect(() => {},[])
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
      route: "",
      name: "topic",
    },
  ];

  const handleClick = ({ key }) => {
    console.log(key);
    if (key === "2") {
      deleteToken();
    } else if (key === "1") {
      router.push(`/${data?.username}/dashboard`);
    }
  };

  const handleDelete = () => {
    deleteToken();
  }
  
  const handleAccount = () => {
    router.push(`/${data?.username}/dashboard`);
  }

  const router = useRouter();
  const changePage = (route) => {
    if (route === ROUTE_NEWSFEEDS) {
      if (token) {
        router.push(ROUTE_NEWSFEEDS);
      } else {
        toggleModal("Login");
      }
    } else {
      router.push(route);
    }
  };
  const menu = (
    <Menu
      onClick={handleClick}
      items={[
        {
          key: "1",
          label: <div>Tài khoản cá nhân</div>,
        },
        {
          key: "2",
          label: <div>Đăng xuất</div>,
        },
      ]}
    />
  );
  return (
    <div
      className={`navbar-container ${
        isMobile ? "navbar-container-mobile" : ""
      }`}
      style={{
        transform:
          !isShowMenuMobile && isMobile ? "translateX(-100%)" : "translateX(0)",
      }}
    >
      <div
        className="icon-close-menu-mobile"
        style={{ display: isMobile ? "flex" : "none" }}
        onClick={() => {
          setIsShowMenuMobile(false);
        }}
      >
        <CloseOutlined />
      </div>
      {token ? (
            <>
              <div className="header-button header-login">
                {/* <Dropdown overlay={menu} placement="bottom">
                  <Space>
                    <Link href={`/${data?.id}`}> */}
                      <AvatarDefaultSmall width={32} height={32} />
                    {/* </Link>
                  </Space>
                </Dropdown> */}
              </div>
              <Link href={"/create-post"}>
                <div className="header-button header-create-post">
                  <IconUploadArticle />
                  Tạo bài viết
                </div>
              </Link>
            </>
          ) : (
            <div className="menu-mobile-footer">
        <div
          className="header-button header-login"
          onClick={() => toggleModal("Login")}
        >
          <IconSignin className="icon-signin-mobile" />
          Đăng nhập
        </div>
        <div
          className="header-button header-register"
          onClick={() => toggleModal("Register")}
        >
          <IconSignup className="icon-signup-mobile" />
          Đăng ký{" "}
        </div>
      </div>
          )}
      
      {title.map((value) => (
        <div
          key={value.title}
          onClick={() => {
            changePage(value.route);
          }}
        >
          {value.name ? (
            <div
              className={
                router?.pathname === value?.route
                  ? "navbar-title active"
                  : "navbar-title"
              }
              onMouseEnter={() => onMouseEnter(value.name)}
              onMouseOut={() => onMouseLeave(value.name)}
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
        </div>
      ))}
      <div
        className={"dropdown-navbar " + (isShowTopic ? "show" : "hide")}
        onMouseEnter={() => setIsShowTopic(true)}
        onMouseLeave={() => setIsShowTopic(false)}
      >
        <ListTrend title={"Danh sách chủ đề"} data={topics} />
      </div>
      
      {token ? 
      (<div className="header-logout">
          <p onClick={handleDelete}>Đăng xuất</p>
          <p onClick={handleAccount}>Tài khoản cá nhân</p>
      </div>) 
      : ("")}
    </div>
  );
};
export default memo(NavBar);
