import React, { memo } from "react";
import Link from "next/link";
import RightBar from "./RightBar";
import { FC } from "react";
import IconCommentActive from "./../../../assets/icon/IconCommentActive";
import Router from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import articleService from "../../../services/article.service";

interface ICommentProps {
  comments: Array<any>;
}

const HotComments = () => {
  const [hotCmt, setHotCmt] = useState<Array<any>>([])
  useEffect(() => {
    articleService.getHotComment().then((data) => {
      setHotCmt(data.data.data);
    });
  }, []);
  return (
    <RightBar title="BÌNH LUẬN NỔI BẬT">
      <div className="list-hot-comments">
        {hotCmt.slice(0, 5).map((value, index) => (
          <div className="hot-comment" key={index}>
            <div className="hot-comment-content">
              <div className="hot-comment-icon">
                <IconCommentActive />
              </div>
              <p>{value?.content}</p>
            </div>
            <div
              className="hot-comment-reply"
              onClick={() => Router.push(`/post/${value?.articleId}`)}
            >
              <span>{"Xem chi tiết bài viết"}</span>
            </div>
          </div>
        ))}
      </div>
    </RightBar>
  );
};
export default memo(HotComments);
