import React, { memo, useCallback, useRef, useState } from "react";
import { Player } from "video-react";
import Image from "next/image";
import AvatarDefaultSmall from "./../../assets/icon/AvatarDefaultSmall";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import { Dropdown, Menu, Space } from "antd";
import IconMoreHorizontal from "../../assets/icon/IconMoreHorizontal";
import propertiesService from "../../services/properties.service";
import { getToken } from "../../libs/common";
import { useDashBoardContext } from "../../components/Context/context";

const ShortVideoCard = ({ value, onClick, type, id, avatar }) => {
  const [isModalVisible, setIsModalVisble] = useState(false);
  const { handleChangeId, deleteArticle } = useDashBoardContext();
  const ref = useRef<HTMLVideoElement>();
  const handleMouseEnter = () => {
    ref?.current?.play();
  };
  const handleMouseLeave = () => {
    ref?.current?.pause();
  };

  const handleDelete = useCallback(() => {
    deleteArticle();
    setIsModalVisble(false);
  }, [deleteArticle]);
  const menu = () => {
    return (
      <Menu
        selectable
        onClick={(e) => {
          setIsModalVisble(true);
          handleChangeId(id);
        }}
        items={[
          {
            key: "1",
            label: "Xóa bài viết",
          },
        ]}
      />
    );
  };
  return (
    <div
      className="short-video"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* <Image src={value.thumbnail} width={135} height={225} alt="short-video"/> */}
      <div onClick={onClick}>
        <Player
          src={value[0].data}
          fluid={false}
          width={"100%"}
          height={type ? 300 : 225}
          ref={ref}
          muted={true}
        />
      </div>

      <ModalConfirm
        isModalConfirmVisible={isModalVisible}
        setIsModalConfirmVisible={setIsModalVisble}
        type={"delete"}
        callBack={handleDelete}
        reqData={undefined}
        draftID={undefined}
      />
      {type && (
        <div className="post-more">
          <Dropdown overlay={menu}>
            <Space>
              <IconMoreHorizontal />
            </Space>
          </Dropdown>
        </div>
      )}
      <div className="short-video-avatar">
        {avatar ? (
          <div className="avatar-medium">
            <Image src={avatar} width={36} height={36} alt="avatar" />
          </div>
        ) : (
          <AvatarDefaultSmall width={36} height={36} />
        )}
      </div>
      <div className="short-video-author">
        <span>{value?.author}</span>
      </div>
    </div>
  );
};
export default memo(ShortVideoCard);
