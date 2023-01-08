import { Col, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";
import HotComments from "../components/Home/RightBar/HotComments";
import HotTags from "../components/Home/RightBar/HotTags";
import ListPost from "../components/ListPost/ListPost";
import Path from "../components/Path";
import articleService from "../services/article.service";

const Trend = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const handleReadMore = useCallback(() => {
    setPage((pre) => pre + 1);
  }, []);
  useEffect(() => {
    articleService
      .getArticlesByTopic("News")
      .then((data) => setData((pre) => [...pre, ...data.data.data]));
  }, [page]);

  return (
    <div className="main-container">
      <div className="list-post-header">
        <Path data={{ content: ["Tin tức"] }} />
      </div>
      <Row>
        <Col span={16}>
          <ListPost
            data={data}
            id={"Những tin tức mới nhất"}
            handleReadMore={handleReadMore}
          />
        </Col>
        <Col span={8}>
          <HotTags />
          <HotComments />
        </Col>
      </Row>
    </div>
  );
};
export default memo(Trend);
