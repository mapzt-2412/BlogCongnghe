import { Col, Row, Carousel, Upload, UploadProps, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { memo, useRef } from "react";
import { getToken } from "../../libs/common";
import ShortVideoContext from "../../pages/short-video/context";
import UploadVideo from "../CreatePost/UploadVideo";
import IconAddShortVideo from "./../../assets/icon/IconAddShortVideo";
import IconNext from "./../../assets/icon/IconNext";
import ModalUpload from "./ModalUpload";
import ShortVideoCard from "./ShortVideoCard";
import { useContext } from "react";
import { UserInfo } from "../../pages/_app";
import { useRouter } from "next/router";
import { ROUTE_SHORTVIDEO } from "../../libs/constants";
// import UploadVideo from "../components/CreatePost/UploadVideo";

const ListShortVideo = ({ data, page, setPage }) => {
  const ref = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setShortVideoIds } = useContext(UserInfo);
  const [isLastPage, setIsLastPage] = useState(false);

  const route = useRouter();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClick = (id) => {
    route.push(ROUTE_SHORTVIDEO + `/${id}`);
  };

  useEffect(() => {
    if (data) {
      data.map((data) => {
        setShortVideoIds((pre) => [...pre, data.id]);
      });
      if (data.length === 0) {
        setIsLastPage(true);
      }
    } 
  }, [data, setShortVideoIds]);

  return (
    <>
      <div className="list-short-video-wrapper">
        <div className="create-short-video short-video" onClick={showModal}>
          <IconAddShortVideo />
          <span>Tạo bảng tin</span>
        </div>
        <ModalUpload
          isModalVideoVisible={isModalOpen}
          setIsModalVideoVisible={setIsModalOpen}
        />
        {data?.length === 0 && <div className="noti">Không còn tin nửa</div>}
        {data?.map((value, index) => (
          <ShortVideoCard
            value={JSON.parse(value.content)}
            key={index}
            onClick={() => handleClick(value.id)}
          />
        ))}
      </div>
      <div className="carousel-button">
        {page !== 1 && (
          <div
            className="carousel-pre"
            onClick={() => setPage((pre) => pre - 1)}
          >
            {" "}
            <IconNext />{" "}
          </div>
        )}
        {!isLastPage && (
          <div
            className="carousel-next"
            onClick={() => setPage((pre) => pre + 1)}
          >
            {" "}
            <IconNext />{" "}
          </div>
        )}
      </div>
    </>
  );
};
export default memo(ListShortVideo);
