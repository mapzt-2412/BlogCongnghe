import React, { memo, useState } from "react";
import { Button, message, Upload, Modal } from "antd";
import IconMovie from "../../assets/icon/IconMovie";
import IconUploadArticle from "../../assets/icon/IconUploadArticle";
import { getToken } from "../../libs/common";
import type { UploadProps } from "antd";
import UploadImage from "../CreatePost/UploadImage";
import TextArea from "antd/lib/input/TextArea";
import UploadShortVideo from "../CreatePost/UploadShortVideo";
import propertiesService from "../../services/properties.service";
import IconCancel from "../../assets/icon/IconCancel";
import IconConfirm from "../../assets/icon/IconConfirm";

const UploadVideo = ({ isModalVideoVisible, setIsModalVideoVisible }) => {
  const [videoUrl, setVideoUrl] = useState();
  const [isPlay, setIsPlay] = useState(true);
  const handlePlay = () => {
    setIsPlay(!isPlay);
  };

  const props: UploadProps = {
    name: "upload",
    action: process.env.REACT_APP_API_URL + "/articles/media",
    headers: {
      authorization: "Bearer " + getToken(),
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        setVideoUrl(info.file.response.url);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const handleCancel = () => {
    setIsModalVideoVisible(false);
  };

  const [reqData, setReqData] = useState({
    topicId: 2,
    thumbnail: "story",
    title: "",
    content: [{
      type: "",
      data: "",
    }],
  });
  const validateError = () => {
    if (!reqData.title) {
      message.error("Vui lòng nhập tiêu đề");
      return false;
    }
    if (!reqData.content) {
      message.error("Vui lòng chọn video");
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    if (!validateError()) {
      return;
    }
    const requestData = { ...reqData, content: JSON.stringify(reqData.content) };
    propertiesService.createArticle(requestData, getToken()).then((data) => {
      if (data.data.data) {
        console.log(data);
      }
    });
    setIsModalVideoVisible(false);
    setReqData({
      topicId: 2,
      thumbnail: "story",
      title: "",
      content: [{
        type: "",
        data: "",
      }]
    })
  };

  const handleChangeInput = (event) => {
    setReqData({
      ...reqData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeContent = (value) => {
    setReqData({
      ...reqData,
      content: [{
        type: "story",  
        data: value,
      }],
    });
  };

  return (
    <Modal
      visible={isModalVideoVisible}
      onCancel={handleCancel}
      footer={false}
      className="modal-upload"
    >
      <div className="modal-title">Tạo bảng tin</div>
      <TextArea
        rows={1}
        placeholder="Vui lòng nhập tiêu đề"
        maxLength={200}
        value={reqData?.title}
        name="title"
        onChange={handleChangeInput}
      />
      {/* <UploadImage handleChangeThumbnail={handleChangeThumbnail} /> */}
      {reqData.content[0].data ? (
        <div className="video-wrapper">
          <video className="video" autoPlay controls>
            <source src={reqData?.content[0]?.data} type="video/mp4" />
          </video>
          <div
            className="video-button"
            onClick={() => {
              setReqData({
                ...reqData,
                content:  [{
                  type: "",
                  data: "",
                }],
              });
            }}
          >
            <IconCancel />
          </div>
        </div>
      ) : (
        <UploadShortVideo handleChangeContent={handleChangeContent} />
      )}
      <div className="modal-chart-button-wrapper">
        <div className={`modal-chart-button`} onClick={handleSubmit}>
          <IconUploadArticle />
          <p>Đăng</p>
        </div>
      </div>
    </Modal>
  );
};
export default memo(UploadVideo);
