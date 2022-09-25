import { Input } from "antd";
import React, { memo } from "react";
import Logo from "../../../assets/icon/Logo";

const Register = () => {
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
          <Input placeholder="" />
        </div>
        <div className="modal-username">
          <p>Mật khẩu</p>
          <Input.Password type="password" placeholder="Mật khẩu" />
        </div>
        <div className="modal-username">
          <p>Xác nhận mật khẩu</p>
          <Input.Password type="password" placeholder="Mật khẩu" />
        </div>
        <div className="modal-password">
          <a href="#">Quên mật khẩu?</a>
        </div>
        <div className="modal-btn-signin">
          <button>ĐĂNG NHẬP</button>
        </div>
        <div className="modal-signup">
          <p>
            Chưa có tài khoản? <span>Đăng ký</span>
          </p>
        </div>
      </>
    );
  };

  export default memo(Register);