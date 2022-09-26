import { Input, Modal, notification } from "antd";
import React, { memo } from "react";
import Logo from "../../../assets/icon/Logo";
import PropertiesService from "../../../services/properties.service";
import { saveToken } from "../../../libs/common";

import { GoogleLogin } from '@react-oauth/google';

const Login = ({setTab, setData, data}) => {
    const handleChange = (event) => {
        setData((pre) => {
            return {
                ...pre,
                [event.target.name]: event.target.value,
            }
        })
    }
    const login = () => {
      PropertiesService.login(data).then((data) => {
        alert("Đăng nhập thành công");
        saveToken(data.data.token)});
    }
    const responseGoogle = (credentialResponse) => {
      PropertiesService.loginWithGoogle({googleToken : credentialResponse.credential}).then((data) => {
        alert("Đăng nhập thành công");
        saveToken(data.data.token)
      })
    }
  return (
    <>
      <div className="modal-logo">
        <Logo />
      </div>
      <div className="modal-title">
        <p>ĐĂNG NHẬP</p>
      </div>
      <div className="modal-username">
        <p>Tên đăng nhập</p>
        <Input placeholder="Tên đăng nhập" onChange={handleChange} name ={"username"} />
      </div>
      <div className="modal-username">
        <p>Mật khẩu</p>
        <Input.Password type="password" placeholder="Mật khẩu" onChange={handleChange} name ={"password"}/>
      </div>
      <div className="modal-password">
        <a href="#">Quên mật khẩu?</a>
      </div>
      <GoogleLogin
  onSuccess={credentialResponse => {
    responseGoogle(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
      <div className="modal-btn-signin">
        <button onClick={login}>ĐĂNG NHẬP</button>
      </div>
      <div className="modal-signup">
        <p>
          Chưa có tài khoản? <span onClick={() => setTab("Register")}>Đăng ký</span>
        </p>
      </div>
    </>
  );
};

export default memo(Login);
