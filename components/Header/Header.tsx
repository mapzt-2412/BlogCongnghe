import { Input } from "antd";
import React, { memo } from "react";
import IconSearch from "../../assets/icon/IconSearch";
import IconSignin from "../../assets/icon/IconSignin";
import IconSignup from "../../assets/icon/IconSignup";
import Logo from "../../assets/icon/Logo";
import HotNews from "./HotNews/HotNews";
import NavBar from "./NavBar/NavBar";

const Header = () => {
  return (
    <>
      <div className="header-container">
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
            Đăng nhập
          </div>
          <div className="header-button">
            <IconSignup />
            Đăng ký
          </div>
        </div>
      </div>
      <NavBar/>
      <HotNews/>
    </>
  );
};
export default memo(Header);
