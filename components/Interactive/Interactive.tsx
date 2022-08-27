import React from "react";
import { memo } from "react";
import IconComment from "../../assets/icon/IconComment";
import IconLike from "../../assets/icon/IconLike";
import IconShare from "../../assets/icon/IconShare";

const Interactive = ({ like, share, comment }) => {
  const handleComment = () => {
    document.getElementById("comment-input").focus();
  }
  return (
    <div className="interactive-container">
      <button className="interactive">
        <IconLike width={23} height={21} />
        <span>{like}</span>
        Thích
      </button>
      <button className="interactive">
        <IconShare width={19} height={21} />
        <span>{share}</span>
        Chia sẻ
      </button>
      <button className="interactive" onClick={handleComment}>
        <IconComment width={21} height={21} />
        <span>{comment}</span>
        Bình luận
      </button>
    </div>
  );
};
export default memo(Interactive);
