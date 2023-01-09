import { Col, Row } from "antd";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { memo } from "react";
import HotComments from "../components/Home/RightBar/HotComments";
import HotTags from "../components/Home/RightBar/HotTags";
import ListPost from "../components/ListPost/ListPost";
import Path from "../components/Path";
import { getToken } from "../libs/common";
import { ROUTE_TREND } from "../libs/constants";
import articleService from "../services/article.service";

const Recommend = () => {
  const [listTrends, setListTrends] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    articleService.getRecommend(page, getToken()).then((data) => {
      setListTrends(data.data.data.map((data) => data.article));
    });
  }, [page]);
  if (!getToken()) {
    Router.push(ROUTE_TREND);
    return <></>;
  }
  return (
    <div className="main-container">
      <div className="list-post-header">
        <Path data={{ content: ["Những nội dung liên quan"] }} />
      </div>
      <Row>
        <Col span={16}>
          <ListPost data={listTrends} id={"Những nội dung liên quan"} />
        </Col>
        <Col span={8}>
          <HotTags />
          <HotComments />
        </Col>
      </Row>
    </div>
  );
};
export default memo(Recommend);
