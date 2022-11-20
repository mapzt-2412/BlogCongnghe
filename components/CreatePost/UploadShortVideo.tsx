import { Button, message, Upload, UploadProps } from "antd";
import React from "react";
import IconMovie from "../../assets/icon/IconMovie";
import IconUploadArticle from "../../assets/icon/IconUploadArticle";
import { getToken } from "../../libs/common";

const UploadShortVideo = ({handleChangeContent}) => {
    const props: UploadProps = {
        name: 'upload',
        action: process.env.REACT_APP_API_URL + "/articles/media",
        headers: {
          authorization: "Bearer " + getToken(),
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            handleChangeContent(info.file.response?.url);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} đã đăng thành công`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} đã đăng không thành công`);
          }
        },
      };
    return (
      <Upload {...props} maxCount={1}>
      <div className="upload-video-wrapper">
        <IconMovie />
        <div className="upload-video-button">
          <IconUploadArticle />
          <span>Thêm video từ thiết bị</span>
        </div>
      </div>
    </Upload>
      )
}

export default UploadShortVideo;