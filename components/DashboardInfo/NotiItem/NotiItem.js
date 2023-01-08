import { memo, useState } from "react";
import NotiItemDetail from "./NotiItemDetail";
import Image from "next/image";
import IconArrowRightRed from "./../../../assets/icon/IconArrowRightRed";
import { Button, Modal, Dropdown, Space, Menu } from "antd";
import IconMoreHorizontal from "./../../../assets/icon/IconMoreHorizontal";
import Route from "next/router";
import { ROUTE_CREATE_POST } from "../../../libs/constants";

const NotiItem = ({ content }) => {
  const [viewDetail, setViewDetail] = useState(false);
  console.log(content);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const datePost = new Date(content.articleCreatedAt);
  const handleClick = ({ key }) => {
    if (key === "1") {
      Route.push(ROUTE_CREATE_POST + `?post=${content.articleId}`);
    }
  };
  const menu = (
    <Menu
      selectable
      onClick={handleClick}
      items={[
        {
          key: "1",
          label: "Chỉnh sửa bài viết",
        },
      ]}
    />
  );

  return (
    <>
      {content.type === "error" && (
        <div className="post-card-horizontal-container">
          <div className="post-card-horizontal-image">
            <Image
              src={content.thumbnail}
              width={282}
              height={175}
              layout="responsive"
              alt="post-image"
            />
          </div>
          <div className="post-card-horizontal-content">
            <div className="notification-item">
              <div className="notification-title">{content.articleTitle}</div>
              <div className="notification-date">
                Ngày đăng:{" "}
                {[
                  datePost.getDate(),
                  datePost.getMonth() + 1,
                  datePost.getFullYear(),
                ].join("/")}
              </div>
              <div className="notification-reason">Nguyên nhân:</div>
              {content.result?.map((value, index) => (
                <div key={index}>
                  {value.type === "Image fault" &&
                    value.result?.map((value, index) => (
                      <>
                        <div className="sub-title" onClick={showModal}>
                          Hình ảnh vi phạm <IconArrowRightRed />
                        </div>
                        <Modal
                          title="THÔNG BÁO"
                          visible={isModalOpen}
                          onOk={handleOk}
                          onCancel={handleCancel}
                          footer={null}
                        >
                          <NotiItemDetail content={content} />
                        </Modal>
                      </>
                    ))}
                  {value.type === "Copyright fault" && (
                    <>
                      <div className="sub-title" onClick={showModal}>
                        Nội dung vi phạm bản quyền <IconArrowRightRed />
                      </div>
                      <Modal
                        title="THÔNG BÁO"
                        visible={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={null}
                      >
                        <NotiItemDetail content={content} />
                      </Modal>
                    </>
                  )}
                  {value.type === "Video fault" &&
                    value.result?.map((value, index) => (
                      <>
                        <div className="sub-title" onClick={showModal}>
                          Video vi phạm <IconArrowRightRed />
                        </div>

                        <Modal
                          title="THÔNG BÁO"
                          visible={isModalOpen}
                          onOk={handleOk}
                          onCancel={handleCancel}
                          footer={null}
                        >
                          <NotiItemDetail content={content} />
                        </Modal>
                      </>
                    ))}
                  {value.type === "Bad word fault" &&
                    value.result?.map((value, index) => (
                      <>
                        <div className="sub-title" onClick={showModal}>
                          Video vi phạm <IconArrowRightRed />
                        </div>

                        <Modal
                          title="THÔNG BÁO"
                          visible={isModalOpen}
                          onOk={handleOk}
                          onCancel={handleCancel}
                          footer={null}
                        >
                          <NotiItemDetail content={content} />
                        </Modal>
                      </>
                    ))}
                </div>
              ))}
              {/* <div className="notification-content">
              {content.type === "error" && (
                <div
                  className="view-detail"
                  onClick={() => setViewDetail(!viewDetail)}
                >
                  {viewDetail ? "Ẩn" : "Xem chi tiết"}
                </div>
              )}
            </div> */}
            </div>
            {/* {value.type === "Copyright fault" && (
            <>
              <div className="sub-title">Nội dung vi phạm bản quyền</div>
              </>
          )} */}
            <div className="post-more">
              <Dropdown overlay={menu}>
                <Space>
                  <IconMoreHorizontal />
                </Space>
              </Dropdown>
            </div>
          </div>
        </div>
      )}

      {/* {viewDetail && <NotiItemDetail content={content} />} */}
    </>
  );
};
export default memo(NotiItem);
