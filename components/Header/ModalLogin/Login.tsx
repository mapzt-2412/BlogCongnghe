import { Input, Modal, notification } from "antd";
import React, { memo, useEffect, useState } from "react";
import Logo from "../../../assets/icon/Logo";
import PropertiesService from "../../../services/properties.service";
import { saveToken } from "../../../libs/common";

import { GoogleLogin } from "@react-oauth/google";

const Login = ({ setTab, setData, data }) => {
  // const initialValues = { username: "", email: "", password: "" };
  // const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (event) => {
    setData((pre) => {
      return {
        ...pre,
        [event.target.name]: event.target.value,
      };
    });
  };
  const login = () => {
    PropertiesService.login(data).then((data) => {
      alert("Đăng nhập thành công");
      saveToken(data.data.token);
    });
  };
  const responseGoogle = (credentialResponse) => {
    PropertiesService.loginWithGoogle({
      googleToken: credentialResponse.credential,
    }).then((data) => {
      alert("Đăng nhập thành công");
      saveToken(data.data.token);
    });
  };

  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // }, [formErrors, formValues, isSubmit]);

  // const validate = (values) => {
  //   const errors = {};
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  //   if (!values.username) {
  //     errors.username = "Username is required!";
  //   }
  //   if (!values.email) {
  //     errors.email = "Email is required!";
  //   } else if (!regex.test(values.email)) {
  //     errors.email = "This is not a valid email format!";
  //   }
  //   if (!values.password) {
  //     errors.password = "Password is required";
  //   } else if (values.password.length < 4) {
  //     errors.password = "Password must be more than 4 characters";
  //   } else if (values.password.length > 10) {
  //     errors.password = "Password cannot exceed more than 10 characters";
  //   }
  //   return errors;
  // };

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
        <Input
          type="text"
          placeholder="Tên đăng nhập"
          // value={formValues.username}
          onChange={handleChange}
          name="username"
        />
      </div>
      {/* <p>{formErrors.username}</p> */}

      <div className="modal-username">
        <p>Mật khẩu</p>
        <Input.Password
          type="password"
          placeholder="Mật khẩu"
          onChange={handleChange}
          name={"password"}
        />
      </div>
      <div className="modal-password">
        <a href="#">Quên mật khẩu?</a>
      </div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          responseGoogle(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <div className="modal-btn-signin">
        <button onClick={login}>ĐĂNG NHẬP</button>
      </div>
      <div className="modal-signup">
        <p>
          Chưa có tài khoản?{" "}
          <span onClick={() => setTab("Register")}>Đăng ký</span>
        </p>
      </div>
    </>
  );
};

export default memo(Login);
