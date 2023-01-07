import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { memo } from "react";
import { getToken } from "../../../libs/common";
import { ROUTE_TREND } from "../../../libs/constants";
import articleService from "../../../services/article.service";
import RightBar from "./RightBar";
import Router from "next/router";

interface ArticlesProps {
  article: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
  };
}
const Recommend = () => {
  const [posts, setPosts] = useState<Array<ArticlesProps>>([]);

  useEffect(() => {
    articleService.getRecommend(getToken()).then((data) => {
      setPosts(data.data.data);
    });
  }, []);

  return (
    <RightBar title="BÀI VIẾT LIÊN QUAN">
      {posts?.map((value, index) => (
        <div
          className={"post-item "}
          key={index}
          onClick={() => Router.push(`/post/${value.article.id}`)}
        >
          <span>{index + 1 + "."}</span>
          <div className="post-title">
            <p>{value.article.title}</p>
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
