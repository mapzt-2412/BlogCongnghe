import { Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { memo } from "react";
import PropertiesService from "../../services/properties.service";
import { useRouter } from "next/router";
import { getToken } from "../../libs/common";

const ResetPassword = () => {
  const [data, setData] = useState();
  const [token, setToken] = useState();
  const { id } = useRouter().query;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log(data)
  };

  const handleResetPassword = () => {
    if (data?.new_password !== "" && data?.confirm_password !== "") {
      PropertiesService.handleResetPassword(data).then((data) => {
        message.success('Đổi mật khẩu thành công');
      });
    }else {
        message.error('Đổi mật khẩu không thành công');
    }
  };

  useEffect(() => {
    if(id){
      setData(pre => {
        return {
            ...pre,
            token: id,
        }
      });
    }
  },[id])

  return (
    <>
    {id ? (<>
        <div className="dashboard-info-username">
        <p>Mật khẩu mới</p>
        <Input.Password
          type="password"
          className="dashboard-password"
          placeholder="Mật khẩu mới"
          onChange={handleChange}
          name="newPassword"
        />
      </div>
      <div className="dashboard-info-username">
        <p>Xác nhận mật khẩu mới</p>
        <Input.Password
          type="password"
          className="dashboard-password"
          placeholder="Xác nhận mật khẩu mới"
        //   onChange={handleChange}
          name="confirmPassword"
        />
      </div>
      <div className="dashboard-info-btn">
        <button onClick={handleResetPassword}>Đổi mật khẩu</button>
      </div>
    </>): ""}
      
    </>
  );
};

export default memo(ResetPassword);
