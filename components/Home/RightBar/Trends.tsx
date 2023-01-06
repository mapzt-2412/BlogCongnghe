import Link from "next/link";
import React from "react";
import { ROUTE_TREND } from "../../../libs/constants";
import RightBar from "./RightBar";
import { memo } from 'react';
import Image from "next/image";
import Router from "next/router";

const Trends = ({ trends }) => {
  const NavigateToArticle = (id) => {
    Router.push(`/post/${id}`)
}
  return (
    <RightBar title="Xu Hướng">
      {trends?.map((value, index) => (
        <div className="trend-item" key={index} onClick={() => NavigateToArticle(value.id)}>
          <div className="trend-image">
            <Image
              src={value.thumbnail}
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
