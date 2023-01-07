import { Input } from "antd";
import React, { memo, useState } from "react";
import Logo from "../../../assets/icon/Logo";
import PropertiesService from "../../../services/properties.service";

const Register = ({ setTab }) => {
  const [data, setData] = useState();
  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  }
  const register = () => {
    PropertiesService.register(data).then((data) => {
      if(data.status === 201){
        setTab("Login")
      }
    })
  }
    return (
      <>
        <div className="modal-logo">
          <Logo />
        </div>
        <div className="modal-title">
          <p>ĐĂNG KÝ</p>
        </div>
        <div className="modal-username">
          <p>Họ và tên</p>
          <Input placeholder="" name={"nickname"} onChange={handleChange}/>
        </div>
        <div className="modal-username">
          <p>Tên đăng nhập</p>
          <Input placeholder="" name={"username"} onChange={handleChange}/>
        </div>
        <div className="modal-username">
          <p>Email</p>
          <Input placeholder="" name={"email"} onChange={handleChange}/>
        </div>
        <div className="modal-username">
          <p>Mật khẩu</p>
          <Input.Password type="password" placeholder="Mật khẩu" name={"password"} onChange={handleChange}/>
        </div>
        <div className="modal-username">
          <p>Xác nhận mật khẩu</p>
          <Input.Password type="password" placeholder="Xác nhận mật khẩu" />
        </div>
        {/* <div className="modal-password">
          <a href="#">Quên mật khẩu?</a>
        </div> */}
        <div className="modal-btn-signin">
          <button onClick={register}>ĐĂNG KÝ</button>
        </div>
        <div className="modal-signup">
        <p>
          Đã có tài khoản?{" "}
          <span onClick={() => setTab("Login")}>Đăng nhập</span>
        </p>
      </div>
      </>
    );
  };

  export default memo(Register);