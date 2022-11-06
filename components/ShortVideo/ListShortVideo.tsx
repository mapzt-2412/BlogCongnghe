import { Col, Row, Carousel, Upload, UploadProps, message, Modal } from "antd";
import React, { useState } from "react";
import { memo, useRef } from "react";
import { getToken } from "../../libs/common";
import UploadVideo from "../CreatePost/UploadVideo";
import IconAddShortVideo from "./../../assets/icon/IconAddShortVideo";
import IconNext from "./../../assets/icon/IconNext";
import ModalUpload from "./ModalUpload";
import ShortVideoCard from "./ShortVideoCard";
// import UploadVideo from "../components/CreatePost/UploadVideo";

const ListShortVideo = ({ data }) => {
  const [videoUrl, setVideoUrl] = useState();
  const ref = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // const handleClick = () => {
  //   console.log("canh");
  // }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const props: UploadProps = {
    name: 'upload',
    action: process.env.REACT_APP_API_URL + "/articles/media",
    headers: {
      authorization: "Bearer " + getToken(),
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file.response?.data);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} đã đăng thành công`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} đã đăng không thành công`);
      }
    },
  };



  return (
    <>
      <Carousel dots={false} ref={ref}>
        <>
          <div className="list-short-video-wrapper">
            <div className="create-short-video short-video" onClick={showModal}>
                <div>
                  <IconAddShortVideo />
                  <span>Tạo bảng tin</span>
                </div>
            </div>
            <ModalUpload
              isModalVideoVisible={isModalOpen}
              setIsModalVideoVisible={setIsModalOpen}
            />

            {/* {data.map((value, index) => (
              <ShortVideoCard value={value} key={index} />
            ))} */}
          </div>
        </>
        {/* <div className="list-short-video-wrapper">
          {data.map((value, index) => (
            <ShortVideoCard value={value} key={index} />
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
