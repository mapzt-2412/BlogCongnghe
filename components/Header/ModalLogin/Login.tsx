import { Input, Modal } from "antd";
import React, { memo } from "react";
import Logo from "../../../assets/icon/Logo";

const Login = ({setTab, setData}) => {
    const handleChange = (event) => {
        setData((pre) => {
            return {
                ...pre,
                [event.target.name]: event.target.value,
            }
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
        <Input placeholder="Tên đăng nhập" onChange={handleChange} name ={"userName"} />
      </div>
      <div className="modal-username">
        <p>Mật khẩu</p>
        <Input.Password type="password" placeholder="Mật khẩu" onChange={handleChange} name ={"password"}/>
      </div>
      <div className="modal-password">
        <a href="#">Quên mật khẩu?</a>
      </div>
      <div className="modal-btn-signin">
        <button>ĐĂNG NHẬP</button>
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
