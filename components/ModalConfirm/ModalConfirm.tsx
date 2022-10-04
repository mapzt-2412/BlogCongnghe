import React from "react";
import { memo } from "react";
import { Modal } from "antd";
import Logo from "../../assets/icon/Logo";
const ModalConfirm = ({isModalConfirmVisible, setIsModalConfirmVisible}) => {
    const handleCancel = () =>{
        setIsModalConfirmVisible(false);
    }
    return (
        <Modal visible={isModalConfirmVisible} onCancel={handleCancel} footer={false}>
            <div className="modal-logo">
                <Logo />
            </div>
            <div className="modal-title">
                <p>Thông báo</p>
            </div>
            <div className="modal-content">
                <p>Bạn có muốn lưu bài đang viết hay không?</p>
            </div>
            <div className="modal-button-center">
                <div className="modal-button save-article">
                    <p>LƯU BẢN NHÁP</p>
                </div>
                <div className="modal-button save-draft">
                    <p>KHÔNG</p>
                </div>
            </div>
      </Modal>
    )
}
export default memo(ModalConfirm)