import React from "react";
import { memo, useState, useCallback } from "react";
import { message, Modal } from "antd";
import Logo from "../../assets/icon/Logo";
import PropertiesService from "./../../services/properties.service";
import { getToken } from "../../libs/common";
import Router from "next/router";
import { ROUTE_HOME } from "../../libs/constants";
import { DatePicker, Space } from 'antd';

const ModalCreate = ({isModalCreateVisible, setIsModalCreateVisible, setReqData, handleSubmit}) => {

    const onChange = useCallback((date, dateString)  => {
      setReqData(pre => {
        return {
          ...pre, 
          dateTime: dateString,
        }
      })
    },[setReqData])
    const handleCancel = () =>{
      setIsModalCreateVisible(false);
    }
    return (
        <Modal visible={isModalCreateVisible} onCancel={handleCancel} footer={false}>
            <div className="modal-logo">
                <Logo />
            </div>
            <div className="modal-title">
                <p>Lập lịch đăng bài</p>
            </div>
            <div className="modal-content date-picker">
                <p>Chọn thời gian đăng bài</p>
                <div>
                <DatePicker onChange={onChange} />
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
    )
}
export default memo(ModalCreate)