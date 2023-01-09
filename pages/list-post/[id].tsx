import React, { useState, useEffect, useCallback } from "react";
import ListPost from "../../components/ListPost/ListPost";
import { Col, Row } from "antd";
import HotTags from "../../components/Home/RightBar/HotTags";
import HotComments from "../../components/Home/RightBar/HotComments";
import Path from "../../components/Path";
import { useRouter } from "next/router";
import articleService from "../../services/article.service";

const ListTopicByPost = () => {
  const { id, name } = useRouter().query;
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const handleReadMore = useCallback(() => {
    setPage((pre) => pre + 1);
  }, []);

  useEffect(() => {
    if (name) {
      articleService
        .getArticlesByTag(name, { page: page })
        .then((data) => setData((pre) => [...pre, ...data.data.data]));
    } else if (id) {
      articleService
        .getArticlesByTopic(id, { page: page })
        .then((data) => setData((pre) => [...pre, ...data.data.data]));
    }
  }, [id, name, page]);
  return (
    <div className="main-container">
      <div className="list-post-header">
        <Path data={{ content: [name ? name : id] }} />
      </div>
      <Row>
        <Col span={16}>
          <ListPost
            data={data}
            id={name ? name : id}
            handleReadMore={handleReadMore}
          />
        </Col>
        <Col span={8}>
          <HotTags/>
          <HotComments />
        </Col>
      </Row>
    </div>
  );
};
export default ListTopicByPost;
