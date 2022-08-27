import { Input } from "antd";
import React, { memo, useRef } from "react";
import Comment from "./Comment"

const data = [
  {
    userName: "_vphlinh",
    avatar: null,
    time: 20220801,
    content:
      "Build thì dù các cửa hàng giờ đều hỗ trợ khách từ A đến Z, tuy nhiên thì người đi build cũng cần có chút kiến thức để tránh bị vẽ vời, mất thêm tiền mà không cần thiết.",
    reply: [
      {
        userName: "_vphlinh",
        avatar: null,
        time: 20220801,
        content:
          "Build thì dù các cửa hàng giờ đều hỗ trợ khách từ A đến Z, tuy nhiên thì người đi build cũng cần có chút kiến thức để tránh bị vẽ vời, mất thêm tiền mà không cần thiết.",
      },
      {
        userName: "_vphlinh",
        avatar: null,
        time: 20220801,
        content:
          "Build thì dù các cửa hàng giờ đều hỗ trợ khách từ A đến Z, tuy nhiên thì người đi build cũng cần có chút kiến thức để tránh bị vẽ vời, mất thêm tiền mà không cần thiết.",
      },
      {
        userName: "vn_ninja",
        avatar: null,
        time: 20220801,
        content:
          "@_vphlinh Thằng em tôi mua vỏ 3 củ, tản nước 3 củ, thêm 3 cái quạt cũng 3 củ. Và rất nhiều cái linh tinh. Cây thì cũ không thay, thay ram 16G 2400 lên 16G 3200. 16G kia mang về vứt xó.",
        reply: [
          {
            userName: "_vphlinh",
            avatar: null,
            time: 20220801,
            content:
              "Build thì dù các cửa hàng giờ đều hỗ trợ khách từ A đến Z, tuy nhiên thì người đi build cũng cần có chút kiến thức để tránh bị vẽ vời, mất thêm tiền mà không cần thiết.",
          },
          {
            userName: "_vphlinh",
            avatar: null,
            time: 20220801,
            content:
              "Build thì dù các cửa hàng giờ đều hỗ trợ khách từ A đến Z, tuy nhiên thì người đi build cũng cần có chút kiến thức để tránh bị vẽ vời, mất thêm tiền mà không cần thiết.",
          },
        ],
      },
    ],
  },
];
const ListComment = () => {
  return (
    <div className="comment-container">
      <div className="comment-input">
        <Input placeholder="Viết bình luận" id={"comment-input"}/>
      </div>
      <div className="list-comment">
        {data.map((value, index) => (
          <Comment data={ value } key={index}/>
        ))}
      </div>
    </div>
  );
};
export default memo(ListComment);
