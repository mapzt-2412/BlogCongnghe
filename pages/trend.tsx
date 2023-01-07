import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { memo } from "react";
import HotComments from "../components/Home/RightBar/HotComments";
import HotTags from "../components/Home/RightBar/HotTags";
import ListPost from "../components/ListPost/ListPost";
import Path from "../components/Path";
import articleService from "../services/article.service";

const Trend = () => {
  const [listTrends, setListTrends] = useState([]);
  const [hotCmt, setHotCmt] = useState([]);
  const [hotTags, setHotTags] = useState([]);
  useEffect(() => {
    articleService.getTrends().then((data) => {
      setListTrends(data.data.data);
    });
    articleService.getHotComment().then((data) => {
      setHotCmt(data.data.data);
    });
    articleService.gettags().then((data) => setHotTags(data.data.data));
  }, []);
  console.log(listTrends);
  return (
    <div className="main-container">
      <div className="list-post-header">
        <Path data={{ content: ["Xu hướng"] }} />
      </div>
      <Row>
        <Col span={16}>
          <ListPost data={listTrends} id={"Xu hướng"} />
        </Col>
        <Col span={8}>
          <HotTags tags={hotTags} />
          <HotComments comments={hotCmt} />
        </Col>
      </Row>
    </div>
  );
};
export default memo(Trend);
