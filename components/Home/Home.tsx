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

const trends = [
  {
    title: "Trong tương lai, mô hình kinh doanh chuyển sang online",
    image: "/slide1.jpg",
  },
  {
    title: "Trong tương lai, mô hình kinh doanh chuyển sang online",
    image: "/slide2.jpg",
  },
  {
    title: "Trong tương lai, mô hình kinh doanh chuyển sang online",
    image: "/slide3.jpg",
  },
  {
    title: "Trong tương lai, mô hình kinh doanh chuyển sang online",
    image: "/slide4.jpg",
  },
];

const tags = [
  {
    title: "#IOS",
    link: "/",
  },
  {
    title: "#IOS",
    link: "/",
  },
  {
    title: "#IOS",
    link: "/",
  },
  {
    title: "#IOS",
    link: "/",
  },
  {
    title: "#IOS",
    link: "/",
  },
  {
    title: "#IOádasdasdS",
    link: "/",
  },
  {
    title: "#IOádasdS",
    link: "/",
  },
  {
    title: "#IOSấdasd",
    link: "/",
  },
];

const data = [
  {
    topic: "TECHNOLOGY",
    data: [
      {
        title:
          "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
        author: "_vphlinh",
        image: "/slide1.jpg",
        time: "20220620",
      },
      {
        title:
          "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
        author: "_vphlinh",
        image: "/slide2.jpg",
        time: "20220620",
      },
      {
        title:
          "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
        author: "_vphlinh",
        image: "/slide3.jpg",
        time: "20220620",
      },
    ],
  },
  {
    topic: "BLOCKCHAIN",
    data: [
      {
        title:
          "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
        author: "_vphlinh",
        image: "/slide1.jpg",
        time: "20220620",
      },
      {
        title:
          "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
        author: "_vphlinh",
        image: "/slide2.jpg",
        time: "20220620",
      },
      {
        title:
          "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
        author: "_vphlinh",
        image: "/slide3.jpg",
        time: "20220620",
      },
    ],
  },
  {
    topic: "PROGRAMMING",
    data: [
      {
        title:
          "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
        author: "_vphlinh",
        image: "/slide1.jpg",
        time: "20220620",
      },
      {
        title:
          "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
        author: "_vphlinh",
        image: "/slide2.jpg",
        time: "20220620",
      },
      {
        title:
          "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
        author: "_vphlinh",
        image: "/slide3.jpg",
        time: "20220620",
      },
    ],
  },
];

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
