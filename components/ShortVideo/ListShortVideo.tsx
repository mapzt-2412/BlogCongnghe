import { Col, Row, Carousel, Upload, UploadProps, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { memo, useRef } from "react";
import { getToken } from "../../libs/common";
import ShortVideoContext from "../../pages/short-video/context";
import UploadVideo from "../CreatePost/UploadVideo";
import IconAddShortVideo from "./../../assets/icon/IconAddShortVideo";
import IconNext from "./../../assets/icon/IconNext";
import ModalUpload from "./ModalUpload";
import ShortVideoCard from "./ShortVideoCard";
import { useContext } from "react";
import { UserInfo } from "../../pages/_app";
import { useRouter } from "next/router";
import { ROUTE_SHORTVIDEO } from "../../libs/constants";
// import UploadVideo from "../components/CreatePost/UploadVideo";

const ListShortVideo = ({ data }) => {
  const ref = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setShortVideoIds } = useContext(UserInfo);
  // const handleClick = () => {
  //   console.log("canh");
  // }
  const route = useRouter();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClick = (id) => {
    route.push(ROUTE_SHORTVIDEO + `/${id}`)
  }

  const props: UploadProps = {
    name: "upload",
    action: process.env.REACT_APP_API_URL + "/articles/media",
    headers: {
      authorization: "Bearer " + getToken(),
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file.response?.data);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} đã đăng thành công`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} đã đăng không thành công`);
      }
    },
  };
  useEffect(() => {
    if (data) {
      data.map((data) => {
        setShortVideoIds(pre => [...pre, data.id])
      });
    }
  }, [data, setShortVideoIds]);

  return (
    <>
      <Carousel dots={false} ref={ref}>
        <>
          <div className="list-short-video-wrapper">
            <div className="create-short-video short-video" onClick={showModal}>
                <IconAddShortVideo />
                <span>Tạo bảng tin</span>
            </div>
            <ModalUpload
              isModalVideoVisible={isModalOpen}
              setIsModalVideoVisible={setIsModalOpen}
            />

            {data?.map((value, index) => (
              <ShortVideoCard value={JSON.parse(value.content)} key={index} onClick={() => handleClick(value.id)}/>
            ))}
          </div>
        </>
        {/* <div className="list-short-video-wrapper">
          {dataStory?.map((value, index) => (
            <ShortVideoCard value={value?.data} key={index} />
          ))}
        </div> */}
      </Carousel>
      <div className="carousel-next" onClick={() => ref?.current.next()}>
        {" "}
        <IconNext />{" "}
      </div>
    </>
  );
};
export default memo(ListShortVideo);
