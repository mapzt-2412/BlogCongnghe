import { Col, Row } from "antd";
import React, { memo, useState } from "react";
import { useEffect } from "react";
import VlogCard from "../components/Vlog/VlogCard";
import articleService from "../services/article.service";

const Vlog = () => {
  const [data, setData] = useState();

  useEffect(() => {
    articleService.getVlog().then((data) => {
      setData(data.data.data);
    });
  }, []);
  return (
    <div className="main-container">
      <Row gutter={16}>
        {data?.map((value, index) => (
          <Col className="gutter-row" span={6} key={index}>
            <VlogCard data={value} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default memo(Vlog);
