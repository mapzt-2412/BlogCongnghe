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
    topicId: 14,
    // tags: [],
    thumbnail: "",
    title: "",
    // description: "",
    content: "",
  });

  const handleSubmit = () => {
    propertiesService.createArticle(reqData,getToken()).then(data => {
        if(data.data.data) {
            console.log(data)
        }
    })
    setIsModalVideoVisible(false);
  };

  // const handleChangeThumbnail = (value) => {
  //     // setReqData({
  //     //   ...reqData,
  //     //   thumbnail: value,
  //     // });
  //     console.log("canh")
  //   };

  const handleChangeInput = (event) => {
    setReqData({
      ...reqData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeContent = (value) => {
    setReqData({
      ...reqData,
      content: value,
    });
  };

  return (
    <Modal visible={isModalVideoVisible} onCancel={handleCancel} footer={false}>
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
      <UploadShortVideo handleChangeContent={handleChangeContent} />
      {reqData.content && (
        <video width="300" controls>
          <source src={reqData?.content} type="video/mp4" />
        </video>
      )}

      {/* <Upload {...props}>
            <div className="upload-video-wrapper">
                <IconMovie/>
                <div className="upload-video-button">
                    <IconUploadArticle />
                    <span>Thêm video từ thiết bị</span>
                </div>
            </div>
            </Upload> */}
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
