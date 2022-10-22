import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { getToken } from "../../libs/common";
import React, { useState } from 'react';

const UploadImage = ({ handleChangeThumbnail }) => {
  const [image, setImage] = useState();
  const props: UploadProps = {
    name: 'upload',
    action: process.env.REACT_APP_API_URL + "/articles/media",
    headers: {
      authorization: "Bearer " + getToken(),
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        handleChangeThumbnail(info.file.response?.data);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Upload {...props} maxCount={1}>
    <Button>Nhấn để chọn ảnh</Button>
  </Upload>
  )
 
};

export default UploadImage;