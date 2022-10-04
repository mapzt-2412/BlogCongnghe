import React, { memo } from 'react';
import { Button, message, Upload, Modal } from 'antd';
import IconMovie from "../../assets/icon/IconMovie";
import IconUploadArticle from "../../assets/icon/IconUploadArticle";
import type { UploadProps } from 'antd';
const props: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

const UploadVideo = ({isModalVideoVisible, setIsModalVideoVisible, addData}) => {
    const handleCancel = () => {
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
                <div className={`modal-chart-button`} >
                    <IconUploadArticle />
                    <p>Tiếp tục</p>
                </div>
                </div>
        </Modal>
    )
}
export default memo(UploadVideo)