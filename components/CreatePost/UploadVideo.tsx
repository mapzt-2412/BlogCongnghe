import React, { memo, useState } from 'react';
import { Button, message, Upload, Modal } from 'antd';
import IconMovie from "../../assets/icon/IconMovie";
import IconUploadArticle from "../../assets/icon/IconUploadArticle";
import { getToken } from "../../libs/common";
import type { UploadProps } from 'antd';

const UploadVideo = ({isModalVideoVisible, setIsModalVideoVisible, addData , addDataContent}) => {
  const [videoUrl, setVideoUrl] = useState();
  const [isPlay, setIsPlay] = useState(true);
  const handlePlay = () => {
    setIsPlay(!isPlay);
}

  const props: UploadProps = {
    name: 'upload',
    action: process.env.REACT_APP_API_URL + "/articles/media",
    headers: {
      authorization: "Bearer " + getToken(),
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        setVideoUrl(info.file.response.url)
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
    const handleCancel = () => {
        setIsModalVideoVisible(false);
      };
    const handleSubmit = () => {
      addData({
        title: "video",
        lable: (
          <div className="video-upload">
                <video 
                src={videoUrl}
                loop
                autoPlay
                muted
                controls
                onClick={handlePlay}
                />
                </div>
          ),
      })
      addDataContent({
        type: "video",
        data: videoUrl,
      })
      setIsModalVideoVisible(false);
    };
    return (
        <Modal 
        visible={isModalVideoVisible}
        onCancel={handleCancel}
        footer={false}
        >
            <div className="modal-title">Video</div>
            <Upload {...props}>
            <div className="upload-video-wrapper">
                <IconMovie/>
                <div className="upload-video-button">
                    <IconUploadArticle />
                    <span>Thêm video từ thiết bị</span>
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
    )
}
export default memo(UploadVideo)