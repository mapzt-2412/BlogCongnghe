import { Input, Dropdown, Menu, Space, Popover, notification } from "antd";
import React, { memo, useCallback, useEffect } from "react";
import { useState } from "react";
import IconSearch from "../../assets/icon/IconSearch";
import IconSignin from "../../assets/icon/IconSignin";
import IconSignup from "../../assets/icon/IconSignup";
import { MenuOutlined } from "@ant-design/icons";
import AvatarDefaultSmall from "../../assets/icon/AvatarDefaultSmall";
import Logo from "../../assets/icon/Logo";
import HotNews from "./HotNews/HotNews";
import NavBar from "./NavBar/NavBar";
import { useRouter } from "next/router";
import { ROUTE_HOME, ROUTE_SHORTVIDEO } from "../../libs/constants";
import ModalLogin from "./ModalLogin/ModalLogin";
import {
  getToken,
  deleteToken,
  saveTheme,
  getTheme,
  handleError,
  getId,
} from "../../libs/common";
import PropertiesService from "../../services/properties.service";
import Link from "next/link";
import IconUploadArticle from "../../assets/icon/IconUploadArticle";
import { Switch } from "antd";
import ChangeTheme from "../ChangeTheme";
import ModalFeedback from "../ModalFeedback/ModalFeedback";
import IconNoti from "../../assets/icon/IconNoti";
import Notification from "../Notification/Notification";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_APPROVE_URL);

const Header = (props) => {
  const router = useRouter();
  const [data, setData] = useState();
  const [tab, setTab] = useState("Login");
  const [token, setToken] = useState<string | false | undefined>();
  const [theme, setTheme] = useState(getTheme());
  const [isModalLoginVisible, setIsModalLoginVisible] = useState(false);
  const [keyword, setKeyword] = useState();
  const [isDisplaySearch, setIsDisplaySearch] = useState(false);
  const [isShowMenuMobile, setIsShowMenuMobile] = useState(false);
  const [isModalFeedbackVisible, setIsModalFeedbackVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const [api, contextHolder] = notification.useNotification();
  // const [loginError, setLoginError] = useState<string | undefined>()

  const openNotification = useCallback((data) => {
    if(data.type === 'Success'){
       notification.success({
        message: `Thông báo`,
        description: 'Bài viết duyệt thành công',
      });
    }else{
      notification.error({
        message: `Thông báo`,
        description: 'Bài viết của bạn duyệt không thành công',
      });
    }
    
  },[]);

  useEffect(() => {
    if (getTheme() === "dark") {
      document.body.classList.toggle("dark");
    }
    if (getToken()) {
      setToken(getToken());
      PropertiesService.getProfile(getToken()).then((data) => {
        console.log(data);
        if (data.status === 200) {
          setData(data.data.data);
          return;
        }
        handleError(data.data.message);
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
      window.addEventListener("resize", (event) => {
        if (window.innerWidth <= 768) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (getId()) {
      console.log(`approveResult ${getId()}`);
      socket.on(`approveResult ${getId()}`, (data) => {
        console.log(data)
        openNotification(data)
      });
    }
    return () => {
      socket.off(`approveResult ${getId()}`);
    };
  }, [openNotification]);
  const onChangeTheme = (theme) => {
    saveTheme(theme);
    setTheme(theme);
    if (theme === "light") {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  };

  const toggleModal = (tabName) => {
    setIsModalLoginVisible((wasModalVisible) => !wasModalVisible);
    setTab(tabName);
  };

  const pathName = useRouter().pathname;
  if (pathName === ROUTE_SHORTVIDEO + "/[id]") {
    return null;
  }

  // const openModal = (initialTab) => {
  //   console.log("openModal()");

  //   setState({
  //     ...state,
  //     initialTab: initialTab,
  //     showModal: true,
  //   });
  // };
  const handleClick = ({ key }) => {
    if (key === "3") {
      deleteToken();
      return;
    }
    if (key === "2") {
      setIsModalFeedbackVisible(true);
      return;
    }
    router.push(`/${data?.username}/dashboard`);
  };

  const getData = (val) => {
    setKeyword(val.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") router.push(`/search/${keyword}`);
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
          label: <div>Phản hồi với quản trị viên</div>,
        },
        {
          key: "3",
          label: <div>Đăng xuất</div>,
        },
      ]}
    />
  );
  return (
    <>
      <ChangeTheme onChangeTheme={onChangeTheme} theme={theme} />
      <div className="header-container">
        <ModalLogin
          isModalLoginVisible={isModalLoginVisible}
          setIsModalLoginVisible={setIsModalLoginVisible}
          tabName={tab}
        />
        <ModalFeedback
          isModalVisible={isModalFeedbackVisible}
          setModalVisible={setIsModalFeedbackVisible}
        />
        <div className="header-logo">
          <MenuOutlined
            className="icon-menu-mobile"
            onClick={() => setIsShowMenuMobile(true)}
          />
          <div className="header-logo-pointer">
            <Link href={ROUTE_HOME}>
              <Logo />
            </Link>
          </div>

          <div className="header-search">
            <Input
              placeholder="Nhập từ khóa tìm kiếm"
              prefix={<IconSearch />}
              type="text"
              onChange={getData}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div
          className="header-search-mobile-btn"
          onClick={() => setIsDisplaySearch(!isDisplaySearch)}
        >
          <IconSearch />
        </div>
        <div className="header-profile">
          {token ? (
            <>
              <Popover
                content={<Notification />}
                title="Thông báo"
                trigger="click"
              >
                <div className="header-button-noti">
                  <IconNoti />
                </div>
              </Popover>

              <div className="header-button header-login">
                <Dropdown overlay={menu} placement="bottom">
                  <Space>
                    <Link href={`/${data?.id}`}>
                      <AvatarDefaultSmall width={32} height={32} />
                    </Link>
                  </Space>
                </Dropdown>
              </div>
              <Link href={"/create-post"}>
                <div className="header-button header-create-post">
                  <IconUploadArticle />
                  Tạo bài viết
                </div>
              </Link>
            </>
          ) : (
            <>
              <div
                className="header-button header-login"
                onClick={() => toggleModal("Login")}
              >
                <IconSignin />
                Đăng nhập
              </div>
              <div
                className="header-button"
                onClick={() => toggleModal("Register")}
              >
                <IconSignup />
                Đăng ký{" "}
              </div>
            </>
          )}
        </div>
        {isDisplaySearch && (
          <div className="header-search-mobile">
            <Input
              placeholder="Nhập từ khóa tìm kiếm"
              prefix={<IconSearch />}
              type="text"
              onChange={getData}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}
      </div>

      <NavBar
        token={token}
        toggleModal={toggleModal}
        isShowMenuMobile={isShowMenuMobile}
        setIsShowMenuMobile={setIsShowMenuMobile}
        isMobile={isMobile}
      />
      <HotNews />
    </>
  );
};
export default memo(Header);
