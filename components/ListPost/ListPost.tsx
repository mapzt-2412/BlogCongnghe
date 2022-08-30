import React from "react";
import { memo, useState } from "react";
import IconCardSort from "../../assets/icon/IconCardSort";
import IconListSort from "../../assets/icon/IconListSort";
import IconCardSortActive from "../../assets/icon/IconCardSortActive";
import IconListSortActive from "../../assets/icon/IconListSortActive";
import PostCardHorizontal from "./PostCard/PostCardHorizontal";
import PostCard from "./PostCard/PostCard";
import { Button, Card, List  } from "antd";

const data = [
  {
    title:
      "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
    description:
      "Thương hiệu sản xuất ốp ",
    author: "_vphlinh",
    image: "/slide1.jpg",
    time: "20220620",
    like: 218,
    comment: 10,
  },
  {
    title:
      "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
    description:
      "Thương hiệu sản xuất ốp lưng điện thoại thân thiện với môi trường - Pela vừa mới ra mắt những mẫu ốp lưng mới dành cho các mẫu điện thoại Pixel 6 và Pixel 6 Pro, có giá bán từ 38 USD (khoảng gần 870.000 đồng), với 4 phiên bản màu sắc khác nhau, bao gồm:",
    author: "_vphlinh",
    image: "/slide2.jpg",
    time: "20220620",
    like: 218,
    comment: 10,
  },
  {
    title:
      "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    description:
      "Thương hiệu sản xuất ốp lưng điện thoại thân thiện với môi trường - Pela vừa mới ra mắt những mẫu ốp lưng mới dành cho các mẫu điện thoại Pixel 6 và Pixel 6 Pro, có giá bán từ 38 USD (khoảng gần 870.000 đồng), với 4 phiên bản màu sắc khác nhau, bao gồm:",
    author: "_vphlinh",
    image: "/slide3.jpg",
    time: "20220620",
    like: 218,
    comment: 10,
  },
  {
    title:
      "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
    description:
      "Thương hiệu sản xuất ốp lưng điện thoại thân thiện với môi trường - Pela vừa mới ra mắt những mẫu ốp lưng mới dành cho các mẫu điện thoại Pixel 6 và Pixel 6 Pro, có giá bán từ 38 USD (khoảng gần 870.000 đồng), với 4 phiên bản màu sắc khác nhau, bao gồm:",
    author: "_vphlinh",
    image: "/slide1.jpg",
    time: "20220620",
    like: 218,
    comment: 10,
  },
  {
    title:
      "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
    description:
      "Thương hiệu sản xuất ốp lưng điện thoại thân thiện với môi trường - Pela vừa mới ra mắt những mẫu ốp lưng mới dành cho các mẫu điện thoại Pixel 6 và Pixel 6 Pro, có giá bán từ 38 USD (khoảng gần 870.000 đồng), với 4 phiên bản màu sắc khác nhau, bao gồm:",
    author: "_vphlinh",
    image: "/slide2.jpg",
    time: "20220620",
    like: 218,
    comment: 10,
  },
  {
    title:
      "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
    description:
      "Thương hiệu sản xuất ốp lưng điện thoại thân thiện với môi trường - Pela vừa mới ra mắt những mẫu ốp lưng mới dành cho các mẫu điện thoại Pixel 6 và Pixel 6 Pro, có giá bán từ 38 USD (khoảng gần 870.000 đồng), với 4 phiên bản màu sắc khác nhau, bao gồm:",
    author: "_vphlinh",
    image: "/slide3.jpg",
    time: "20220620",
    like: 218,
    comment: 10,
  },
];

const ListPost = () => {
  const [isList , setList] = useState(true);
  const changeLayout = () => {
    setList(!isList);
  }
  return (
    <div className="list-post-container">
      <div className="list-post-content">
        <div className="list-post-content-header">
          <div className="list-post-topic">
            <p>TECHNOLOGY</p>
          </div>
          <div className="list-post-sort">
            <div onClick={changeLayout}>
              {
                !isList ? <IconListSort /> : <IconListSortActive />
              }
              
            </div>
            <div onClick={changeLayout}>
              {
                isList ? <IconCardSort /> : <IconCardSortActive />
              }
            </div>
          </div>
        </div>
        <div className="list-post-content-center">
          {
            isList ? 
            data.map((value, index) => (
              <PostCardHorizontal data={value} key={index} />
            ))
            :
            <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <PostCard data={item}/>
              </List.Item>
            )}
          />
          }
          
        </div>
      </div>
      <div className="list-post-footer">
        <Button type="primary" ghost>
          Xem thêm
        </Button>
      </div>
    </div>
  );
};
export default memo(ListPost);
