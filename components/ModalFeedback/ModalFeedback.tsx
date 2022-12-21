import { Input, message, Modal } from "antd";
import React, { FC, memo, useCallback, useState } from "react";
import { getToken } from "../../libs/common";
import UsersService from "../../services/user.service";

interface IModalProps {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}
const ModalFeedback: FC<IModalProps> = ({
  isModalVisible,
  setModalVisible,
}) => {
    const [data, setData] = useState('');
    const onChange = useCallback((e) => {
        setData(e.target.value);
    },[])
    const onOk = useCallback(() => {
        UsersService.sendFeedback({content: data}, getToken()).then(data => {
            if(data.status === 200){
                message.success('Gửi phản hồi thành công');
                setModalVisible(false);
                setData('');
                return;
            }
            message.success('Gửi phản hồi thất bại vui lòng thử lại sau')
        })
    },[data, setModalVisible])
  return (
    <Modal
      centered
      visible={isModalVisible}
      onCancel={() => setModalVisible(false)}
      onOk={onOk}
      className="modal-feedback"
      okText="Gửi"
    cancelText="Huỷ"
    >
        <div className="modal-title">
            Phản hồi với quản trị viên
        </div>
        <div className="modal-content">
            <Input.TextArea placeholder="Nhập nội dung" onChange={onChange} value={data}/>
        </div>
    </Modal>
  );
};
export default memo(ModalFeedback);
