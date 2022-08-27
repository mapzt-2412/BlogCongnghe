import React, { memo } from "react";
import { ROUTE_TREND } from "../../../libs/constants";
import RightBar from "./RightBar";
import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from "next/link";

const News = ({ news}) => {
  return (
    <RightBar title="TIN TỨC">
      <Row>
        {news.map((value, index) => (
          <Col span={12} key={index}>
            <div className={"news-item " + (index % 2 === 0 ? "left" : "")}>
              <div className="news-image">
                <Image
                  src={value.image}
                  height={120}
                  width={191}
                  layout="responsive"
                  alt="trend"
                />
              </div>
              <div className="news-title">
                <p>{value.title}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <div className="link see-more">
        <Link href={ROUTE_TREND}>Xem thêm</Link>
      </div>
    </RightBar>
  );
};
export default memo(News);
