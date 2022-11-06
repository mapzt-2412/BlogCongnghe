import Link from "next/link";
import React from "react";
import { memo } from "react";
import { ROUTE_TREND } from "../../../libs/constants";
import RightBar from "./RightBar";

const Recommend = ({ posts }) => {
  return (
    <RightBar title="BÀI VIẾT LIÊN QUAN">
      {posts?.map((value, index) => (
        <div className={"post-item "} key={index}>
          <span>{index + 1 + "."}</span>
          <div className="post-title">
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
export default memo(Recommend);
