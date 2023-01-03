import React, { useMemo } from "react";
import { memo, useState, useCallback } from "react";
import { message, Modal, Select } from "antd";
import Logo from "../../assets/icon/Logo";
import PropertiesService from "./../../services/properties.service";
import { getToken } from "../../libs/common";
import Router from "next/router";
import { ROUTE_HOME } from "../../libs/constants";
import { DatePicker, Space } from "antd";
import moment from "moment";

const ModalCreate = ({
  isModalCreateVisible,
  setIsModalCreateVisible,
  setReqData,
  handleSubmit,
}) => {
  const onChange = useCallback(
    (date, dateString) => {
      setReqData((pre) => {
        return {
          ...pre,
          dateTime: moment(date).format("YYYY-MM-DD-HH-mm"),
        };
      });
    },
    [setReqData]
  );
  const handleCancel = () => {
    setIsModalCreateVisible(false);
  };

  const options = useMemo(
    () => [
      {
        value: "public",
        label: "Công khai",
      },
      {
        value: "private",
        label: "Chỉ mình tôi",
      }
    ],
    []
  );
  return (
    <Modal
      visible={isModalCreateVisible}
      onCancel={handleCancel}
      footer={false}
    >
      <div className="modal-title">
        <p>Vui lòng chọn</p>
      </div>
      <div className="modal-body">
        <div className="modal-body-item">
          <div className="modal-body-item-left">Chế độ đăng</div>
          <div className="modal-body-item-right">
            <Select options={options}/>
          </div>
        </div>
        <div className="modal-body-item">
          <div className="modal-body-item-left">Thời gian đăng</div>
          <div className="modal-body-item-right">
            <DatePicker
              showTime
              onChange={onChange}
              format="YYYY-MM-DD HH:mm"
            />
          </div>
        </div>
      </div>
      <div className="modal-button-center">
        <div className="modal-button save-article" onClick={handleSubmit}>
          <p>Đăng bài viết</p>
        </div>
        <div className="modal-button save-draft" onClick={handleCancel}>
          <p>KHÔNG</p>
        </div>
      </div>
    </Modal>
  );
};
export default memo(ModalCreate);
