import { Input, Modal } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { memo } from "react";
import Logo from "../../../assets/icon/Logo";
import Login from "./Login";
import Register from "./Register";

interface IModalLoginProps {
  isModalLoginVisible: boolean | undefined;
  setIsModalLoginVisible: (data) => void;
  tabName: string;
}

const ModalLogin: FC<IModalLoginProps> = ({
  isModalLoginVisible,
  setIsModalLoginVisible,
  tabName,
}) => {
  const [tab, setTab] = useState("Login");
  const [data, setData] = useState();
  const handleOk = () => {
    setIsModalLoginVisible(false);
  };
  
  const handleCancel = () => {
    setIsModalLoginVisible(false);
  };

  useEffect(() => {
    setTab(tabName);
  },[tabName])
  console.log(data);
const renderContent = (tab) => {
    if(tab === "Login") {
        return <Login setTab={setTab} setData={setData} data={data}/>
    }
    else if(tab === "Register") {
        return <Register setTab={setTab}/>
    }
}
  return (
    <>
      <Modal
        visible={isModalLoginVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        {
            renderContent(tab)
        }
        
      </Modal>
    </>
  );
};

export default memo(ModalLogin);
