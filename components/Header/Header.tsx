import { Input, Dropdown, Menu, Space } from "antd";
import React, { memo, useEffect } from "react";
import { useState } from "react";
import IconSearch from "../../assets/icon/IconSearch";
import IconSignin from "../../assets/icon/IconSignin";
import IconSignup from "../../assets/icon/IconSignup";
import AvatarDefaultSmall from "../../assets/icon/AvatarDefaultSmall";
import Logo from "../../assets/icon/Logo";
import HotNews from "./HotNews/HotNews";
import NavBar from "./NavBar/NavBar";
import { useRouter } from "next/router";
import { ROUTE_SHORTVIDEO } from "../../libs/constants";
import ModalLogin from "./ModalLogin/ModalLogin";
import { getToken, deleteToken } from "../../libs/common";
import PropertiesService from "../../services/properties.service";
import Link from "next/link";
import IconUploadArticle from "../../assets/icon/IconUploadArticle";

const Header = (props) => {
  const router = useRouter()
  const [data, setData] = useState();
  const [tab, setTab] = useState("");
  const [token, setToken] = useState();
  const [isModalLoginVisible, setIsModalLoginVisible] = useState(false);
  // const [loginError, setLoginError] = useState<string | undefined>()

  const toggleModal = (tabName) => {
    setIsModalLoginVisible((wasModalVisible) => !wasModalVisible);
    setTab(tabName);
  };

  const pathName = useRouter().pathname;
  if (pathName === ROUTE_SHORTVIDEO + "/[id]") {
    return null;
  }
  useEffect(() => {
    if (getToken()) {
      setToken(getToken());
    }
  }, []);
  useEffect(() => {
    if (token) {
      PropertiesService.getProfile(token).then((data) =>
        setData(data.data.data)
      );
    }
  }, [token]);
  // const openModal = (initialTab) => {
  //   console.log("openModal()");

  //   setState({
  //     ...state,
  //     initialTab: initialTab,
  //     showModal: true,
  //   });
  // };
  const handleClick = ({key}) => {
    console.log(key)
    if(key === "2"){
      deleteToken();
    }else if(key === "1"){
      router.push(`/${data?.username}/dashboard`)
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
    <>
      <div className="header-container">
        <ModalLogin
          isModalLoginVisible={isModalLoginVisible}
          setIsModalLoginVisible={setIsModalLoginVisible}
          tabName={tab}
        />
        <div className="header-logo">
          <Logo />
          <div className="header-search">
            <Input
              placeholder="Nhập từ khóa tìm kiếm"
              prefix={<IconSearch />}
            />
          </div>
        </div>
        <div className="header-profile">
          {token ? (
            <>
              <div className="header-button header-login">
                <Dropdown overlay={menu} placement="bottom">
                  <Space>
                    <Link href={`/${data?.username}`}>
                      <AvatarDefaultSmall width={32} height={32} />
                    </Link>
                  </Space>
                </Dropdown>
              </div>
              <Link href={"/create-post"}>
              <div
                className="header-button header-create-post"
              >
                <IconUploadArticle/>
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
                Đăng ký
              </div>
            </>
          )}
        </div>
      </div>
      <NavBar />
      <HotNews />
    </>
  );
};
export default memo(Header);
