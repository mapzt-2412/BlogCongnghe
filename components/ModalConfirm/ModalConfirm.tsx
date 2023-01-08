import React from "react";
import { memo } from "react";
import { message, Modal } from "antd";
import Logo from "../../assets/icon/Logo";
import PropertiesService from "./../../services/properties.service";
import { getToken } from "../../libs/common";
import Router from "next/router";
import { ROUTE_HOME } from "../../libs/constants";
const ModalConfirm = ({
  isModalConfirmVisible,
  setIsModalConfirmVisible,
  reqData,
  draftID,
  type,
  callBack
}) => {
  const handleCancel = () => {
    setIsModalConfirmVisible(false);
  };

  const handleSubmit = (data) => {
    PropertiesService.updateDraft(
      { ...data, draftId: draftID },
      getToken()
    ).then((data) => {
      if (data) {
        message.success("Bài viết đã được lưu");
        Router.push(ROUTE_HOME);
      } else {
        message.error("Đã xảy ra lỗi, vui lòng thử lại sau");
      }
    });
  };

  const handleDelete = (draftID) => {
    PropertiesService.deleteDraft({ draftId: draftID }, getToken()).then(
      (data) => {
        Router.push(ROUTE_HOME);
      }
    );
  };
  return (
    <Modal
      visible={isModalConfirmVisible}
      onCancel={handleCancel}
      footer={false}
    >
      <div className="modal-logo">
        <Logo />
      </div>
      <div className="modal-title">
        <p>Thông báo</p>
      </div>
      <div className="modal-content">
        {
          type === "delete" ? <p>Bạn có chắc chắn muốn xoá bài viết ?</p> :<p>Bạn có muốn lưu bài đang viết hay không?</p>
        }
        
      </div>
      <div className="modal-button-center">
        {type === "delete" ? (
          <>
            <div
              className="modal-button save-article"
              onClick={callBack}
            >
              <p>Có</p>
            </div>
            <div
              className="modal-button save-draft"
              onClick={handleCancel}
            >
              <p>KHÔNG</p>
            </div>
          </>
        ) : (
          <>
            <div
              className="modal-button save-article"
              onClick={() => handleSubmit(reqData)}
            >
              <p>LƯU BẢN NHÁP</p>
            </div>
            <div
              className="modal-button save-draft"
              onClick={() => handleDelete(draftID)}
            >
              <p>KHÔNG</p>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
export default memo(ModalConfirm);
