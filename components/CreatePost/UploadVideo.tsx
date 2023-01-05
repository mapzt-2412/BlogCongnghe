import React, { memo, useState, FC } from "react";
import { Button, message, Upload, Modal } from "antd";
import IconMovie from "../../assets/icon/IconMovie";
import IconUploadArticle from "../../assets/icon/IconUploadArticle";
import { getToken, genHexString } from "../../libs/common";
import type { UploadProps } from "antd";

interface IUploadProps {
  isModalVideoVisible: boolean;
  setIsModalVideoVisible: (isModalVideoVisible: boolean) => void;
  addData: (data: any) => void;
  addDataContent: (data: any) => void;
  type?: string;
  addUrl?: (url: string) => void;
  setListVideo: (data: any) => void;
}
const UploadVideo: FC<IUploadProps> = ({
  isModalVideoVisible,
  setIsModalVideoVisible,
  addData,
  addDataContent,
  type,
  addUrl,
  setListVideo,
}) => {
  const [videoUrl, setVideoUrl] = useState("");
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
        setListVideo(pre => [...pre, info.file.response.url])
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
  const handleSubmit = () => {
    if (type && addUrl) {
      addUrl(videoUrl);
    } else {
      // addData({
      //   title: "video",
      //   lable: (
      //     <div className="video-upload">
      //       <video
      //         src={videoUrl}
      //         loop
      //         autoPlay
      //         muted
      //         controls
      //         onClick={handlePlay}
      //       />
      //     </div>
      //   ),
      // });
      addDataContent({
        type: "video",
        data: videoUrl,
        id: genHexString(7)
      });
    }

    setIsModalVideoVisible(false);
  };
  return (
    <Modal visible={isModalVideoVisible} onCancel={handleCancel} footer={false}>
      <div className="modal-title">Video</div>
      <Upload {...props} maxCount={1}>
        <div className="upload-video-wrapper">
          <IconMovie />
          <div className="upload-video-button">
            <IconUploadArticle />
            {type === "image" ? (
              <span>Thêm ảnh từ thiết bị</span>
            ) : (
              <span>Thêm video từ thiết bị</span>
            )}
          </div>
        </div>
      </Upload>
      <div className="modal-chart-button-wrapper">
        <div className={`modal-chart-button`} onClick={handleSubmit}>
          <IconUploadArticle />
          <p>Tiếp tục</p>
        </div>
      </div>
    </Modal>
  );
};
export default memo(UploadVideo);
