import Link from "next/link";
import React from "react";
import { ROUTE_TREND } from "../../../libs/constants";
import RightBar from "./RightBar";
import { memo } from 'react';
import Image from "next/image";

const Trends = ({ trends }) => {
  return (
    <RightBar title="Xu Hướng">
      {trends.map((value, index) => (
        <div className="trend-item" key={index}>
          <div className="trend-image">
            <Image
              src={value.image}
              height={75}
              width={122}
              layout="responsive"
              alt="trend"
            />
          </div>
          <div className="trend-title">
            <p>{value.title}</p>
          </div>
        </div>
      ))}
      <div className="link see-more">
        <Link href={ROUTE_TREND}>Xem thêm</Link>
      </div>
    </RightBar>
  );
};
export default memo(Trends);
