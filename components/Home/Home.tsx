import Slide from "./Slide/Slide";
import { Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import Topic from "./Topic/Topic";
import HotTags from "./RightBar/HotTags";
import Trends from "./RightBar/Trends";
import News from "./RightBar/News";
import Recommend from "./RightBar/Recommend";
import PropertiesService from "../../services/properties.service";
import Head from "next/head";

const Home = () => {
  const [article, setArticle] = useState();
  const [tags, setTags] = useState();
  const [topics, setTopics] = useState();
  const [trends, setTrends] = useState();

  useEffect(() => {
    PropertiesService.getArticles().then((data) => console.log(data));
    PropertiesService.getTags().then((data) => setTags(data.data.data));
    PropertiesService.getTopics().then((data) => setTopics(data.data.data));
    PropertiesService.getTopicByScore().then((data) =>
      setTrends(data.data.data)
    );
  }, []);

  return (
    <>
      <Head>
        <title>BK-Blog</title>
        <meta name="keywords" content="bk-blog"></meta>
        <meta property="og:type" content="homepage" />
        <meta property="og:title" content="bk-blog"></meta>
        <meta property="og:image" content="logo.png"></meta>
        <meta property="og:url" content={`${process.env.REACT_APP_BASE_URL}`} />
      </Head>
      <div className="main-container">
        <Row>
          <Col span={16}>
            <div className="home-slide">
              <Slide trends={trends} />
            </div>
            {topics?.map((value, index) => (
              <Topic data={value} key={index} />
            ))}
          </Col>
          <Col span={8}>
            <Trends trends={trends} />
            <HotTags tags={tags} />
            <News news={trends} />
            <Recommend posts={trends} />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Home;
