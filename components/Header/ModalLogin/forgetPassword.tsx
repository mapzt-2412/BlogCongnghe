import { Input, message } from "antd";
import React, { memo, useState } from "react";
import Logo from "../../../assets/icon/Logo";
import PropertiesService from "../../../services/properties.service";

const ForgetPassword = ({setTab}) => {
    const [data, setData] = useState();
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
        console.log(data);
      };
    
      const handleChangePassword = () => {
        if(data?.email !== "") {
          PropertiesService.requestResetPassword(data).then((data) => {
            message.success('Vui lòng kiểm tra email');
          })
        }
      }

    return <>
        <div className="modal-logo">
          <Logo />
        </div>
        <div className="modal-title">
          <p>XÁC NHẬN QUA EMAIL</p>
        </div>
        <div className="modal-username">
          <p>Email</p>
          <Input placeholder="" name={"email"} onChange={handleChange}/>
        </div>
        <div className="modal-btn-signin">
          <button onClick={handleChangePassword}>GỬI XÁC NHẬN</button>
        </div>
        <div className="modal-signup">
        <p>
          Đã có tài khoản?{" "}
          <span onClick={() => setTab("Login")}>Đăng nhập</span>
        </p>
      </div>
    </>
}

export default memo(ForgetPassword);