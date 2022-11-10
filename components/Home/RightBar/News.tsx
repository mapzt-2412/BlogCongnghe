import React, { memo, useState, useEffect } from "react";
import { ROUTE_LISTPOST } from "../../../libs/constants";
import RightBar from "./RightBar";
import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from "next/link";
import PropertiesService from "../../../services/properties.service";
import { SliceString } from '../../../libs/common';
import { stringLengthTitle, stringLengthDescription } from '../../../libs/commonConstants';

const News = ({ news}) => {
  const [data, setData] = useState();
  useEffect(()=>{
    PropertiesService.getArticlesByTopic("News","limit=4").then((data) => setData(data.data.data))
  },[])
  console.log(data)
  return (
    <RightBar title="TIN TỨC">
      <Row>
        {data?.map((value, index) => (
          <Col span={12} key={index}>
            <div className={"news-item " + (index % 2 === 0 ? "left" : "")}>
              <div className="news-image">
                <Image
                  src={value?.thumbnail !== "story" ? value?.thumbnail : "/"}
                  height={120}
                  width={191}
                  layout="responsive"
                  alt="trend"
                />
              </div>
              <div className="news-title">
                <p>{SliceString(value.title, stringLengthTitle)}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <div className="link see-more">
        <Link href={ROUTE_LISTPOST + `/News`}>Xem thêm</Link>
      </div>
    </RightBar>
  );
};
export default memo(News);
