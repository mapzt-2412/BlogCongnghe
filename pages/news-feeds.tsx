import React, { FC, memo, useContext, useEffect, useState } from "react";
import ListShortVideo from "../components/ShortVideo/ListShortVideo";
import ListPost from "../components/ListPost/ListPost";
import Path from "../components/Path";
import { getToken } from "../libs/common";
import PropertiesService from "../../BlogCongnghe/services/properties.service";
import ModalLogin from "../components/Header/ModalLogin/ModalLogin";
import Login from "../components/Header/ModalLogin/Login";
import { Modal } from "antd";
import Register from "../components/Header/ModalLogin/Register";
import { useRouter } from "next/router";
import { ROUTE_HOME } from "../libs/constants";
import ShortVideoContext from "./short-video/context";
import { UserInfo } from "./_app";
// interface IModalLoginProps {
//   isModalLoginVisible: boolean | undefined;
//   setIsModalLoginVisible: (data) => void;
//   tabName: string;
// }
const NewsFeeds = () => {
  const [data, setData] = useState();
//   const [tab, setTab] = useState("Login");
//   const [token, setToken] = useState();
//   const handleOk = () => {
//     setIsModalLoginVisible(false);
//   };
//   const handleCancel = () => {
//     setIsModalLoginVisible(false);
//   };
//   const renderContent = (tab) => {
//     if (tab === "Login") {
//       return <Login setTab={setTab} setData={setData} data={data} />;
//     } else if (tab === "Register") {
//       return <Register setTab={setTab} />;
//     }
//   };
//   useEffect(() => {
//     setTab(tabName);
//   }, [tabName]);
//   useEffect(() => {
//     if (getToken()) {
//       setToken(getToken());
//     }
//   }, []);
//   useEffect(() => {
//     if (token) {
//       PropertiesService.getProfile(token).then((data) =>
//         setData(data.data.data)
//       );
//     }
//   }, [token]);
const { shortVideoIds } = useContext(UserInfo);

useEffect(() => {
  PropertiesService.getStory(getToken()).then((data) =>
        setData(data.data.data.myStories)
      );
},[])

const router = useRouter();
if(getToken()===false) {
  router.push(ROUTE_HOME);
}
  return (
    <>
      <div className="main-container">
                <Path data={{content: "Bảng tin"}}/>
                <ListShortVideo data={data} />
                <div className="post-detail-container">
                    <ListPost data={[]} id={""} />
                </div>
            </div>
      {/* {token ? (
        <div className="main-container">
          <Path data={{ content: "Bảng tin" }} />
          <ListShortVideo data={data} />
          <div className="post-detail-container">
            <ListPost data={undefined} id={undefined} />
          </div>
        </div>
      ) : (
        <>
          <Modal
            visible={isModalLoginVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
          >
            {renderContent(Login)}
          </Modal>
        </>
      )} */}
    </>
  );
};
export default memo(NewsFeeds);
