import React, { FC, memo, useContext, useEffect, useState } from "react";
import ListShortVideo from "../components/ShortVideo/ListShortVideo";
import ListPost from "../components/ListPost/ListPost";
import Path from "../components/Path";
import { getToken } from "../libs/common";
import PropertiesService from "../services/properties.service";
import ModalLogin from "../components/Header/ModalLogin/ModalLogin";
import Login from "../components/Header/ModalLogin/Login";
import { Modal } from "antd";
import Register from "../components/Header/ModalLogin/Register";
import { useRouter } from "next/router";
import { ROUTE_HOME } from "../libs/constants";
import { UserInfo } from "./_app";
import articleService from "../services/article.service";
import { useMemo } from "react";
import { useCallback } from "react";
// interface IModalLoginProps {
//   isModalLoginVisible: boolean | undefined;
//   setIsModalLoginVisible: (data) => void;
//   tabName: string;
// }
const NewsFeeds = () => {
  const [data, setData] = useState<any>();
  const [page, setPage] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);
  const [articles, setArticles] = useState<any[]>([]);

  const { shortVideoIds } = useContext(UserInfo);
  const getStory = useCallback(() => {
    PropertiesService.getStory({ page: page, limit: 5 }, getToken()).then((data) =>
      setData([...data.data.data.myStories, ...data.data.data.followingStories])
    );
  }, [page]);
  useEffect(() => {
    getStory();
  }, [getStory]);

  useEffect(() => {
    articleService
      .getNewfeed(pageIndex, getToken())
      .then((data) => setArticles((pre) => [...pre, ...data.data.data]));
  }, [pageIndex]);

  const handleReadMore = useCallback(() => {
    setPageIndex((pre) => pre + 1);
  }, []);

  const router = useRouter();
  if (getToken() === false) {
    router.push(ROUTE_HOME);
  }
  return (
    <>
      <div className="main-container">
        <Path data={{ content: "Bảng tin" }} />
        <ListShortVideo
          data={data}
          page={page}
          setPage={setPage}
          getStory={getStory}
        />
        <div className="post-detail-container">
          <ListPost
            data={articles}
            id={"Bài viết dành cho bạn"}
            handleReadMore={handleReadMore}
          />
        </div>
      </div>
      {/* {token ? (
        <div className="main-container">
          <Path data={{ content: "Bảng tin" }} />
          <ListShortVideo data={data} />
          <div className="post-detail-container">
            <ListPost data={undefined} id={undefined} />
          </div>
        </div>
      ) : (
        <>
          <Modal
            visible={isModalLoginVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
          >
            {renderContent(Login)}
          </Modal>
        </>
      )} */}
    </>
  );
};
export default memo(NewsFeeds);
