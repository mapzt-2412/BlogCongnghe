import { Input } from "antd";
import React, { memo } from "react";
import { useState } from "react";
import IconSearch from "../../assets/icon/IconSearch";
import IconSignin from "../../assets/icon/IconSignin";
import IconSignup from "../../assets/icon/IconSignup";
import Logo from "../../assets/icon/Logo";
import HotNews from "./HotNews/HotNews";
import NavBar from "./NavBar/NavBar";
import { useRouter } from 'next/router';
import { ROUTE_SHORTVIDEO } from "../../libs/constants";
import ReactModalLogin from "react-modal-login";
import ModalLogin from "./ModalLogin/ModalLogin";

const Header = (props) => {

  const [tab,setTab] = useState("");
  const [isModalLoginVisible, setIsModalLoginVisible] = useState(false)
  // const [loginError, setLoginError] = useState<string | undefined>()
 
  const toggleModal = (tabName) => {
    setIsModalLoginVisible(wasModalVisible =>  !wasModalVisible)
    setTab(tabName);
  }
  
  const pathName = useRouter().pathname;
  if(pathName === ROUTE_SHORTVIDEO + "/[id]"){
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
  return (
    <>
      <div className="header-container">
        <ModalLogin isModalLoginVisible={isModalLoginVisible} setIsModalLoginVisible={setIsModalLoginVisible} tabName = {tab}/>
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
          <div className="header-button header-login">
            <IconSignin />
            <button onClick={() => toggleModal("Login")}>
              Đăng nhập
            </button>
          </div>
          <div className="header-button">
            <IconSignup />
            <button onClick={() => toggleModal("Register")}>
              Đăng ký
            </button>
          </div>
        </div>
      </div>
      <NavBar/>
      <HotNews/>
    </>
  );
};
export default memo(Header);
