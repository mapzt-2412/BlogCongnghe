import { Radio, Modal, Input, Button } from 'antd';
import React, { memo} from 'react';
import { report } from "../../libs/commonConstants";

const ModalReport = ({isModalOpen, handleCancel, handleReport, reportContent, handleChangeInput,placement, placementChange }) => {
    return (
        <>
        <Modal title="Báo cáo" visible={isModalOpen} onCancel={handleCancel} footer={false}>
        <h2>Hãy chọn vấn đề</h2>
        <p>Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy tìm ngay sự giúp đỡ trước khi báo cáo với chúng tôi.</p>
        <Radio.Group value={placement} onChange={placementChange}>
          {
            report?.map((value,index) => 
            <Radio.Button value={value.type} key ={index}>{value.value}</Radio.Button>)
          }
        </Radio.Group>
        {
          placement !== "" &&
          <>
          <Input placeholder="Nhập nội dung báo cáo" value={reportContent} onChange={handleChangeInput}/>
          <div className="interactive-report">
              <Button onClick={handleReport}>
                Gửi báo cáo
              </Button>
          </div>
          </>
        }
      </Modal>
        </>
    )
}
export default memo(ModalReport)