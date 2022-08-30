import React, { memo } from "react";
import HotTags from "../../components/Home/RightBar/HotTags";
import Recommend from "../../components/Home/RightBar/Recommend";
import Interactive from "../../components/Interactive/Interactive";
import ListComment from "../../components/Interactive/Comment/ListComment";
import Image from "next/image";
import AvatarDefaultSmall from "../../assets/icon/AvatarDefaultSmall";
import { Button } from "antd";
import Path from "../../components/Path";

const trends = [
  {
      title: "Trong tương lai, mô hình kinh doanh chuyển sang online", 
      image: "/slide1.jpg",
  },
  {
      title: "Trong tương lai, mô hình kinh doanh chuyển sang online", 
      image: "/slide2.jpg",
  },
  {
      title: "Trong tương lai, mô hình kinh doanh chuyển sang online", 
      image: "/slide3.jpg",
  },
  {
      title: "Trong tương lai, mô hình kinh doanh chuyển sang online", 
      image: "/slide4.jpg",
  },
];


const tags = [
    {
        title: "#IOS", 
        link: "/",
    },
    {
        title: "#IOS", 
        link: "/",
    },
    {
        title: "#IOS", 
        link: "/",
    },
    {
        title: "#IOS", 
        link: "/",
    },
    {
        title: "#IOS", 
        link: "/",
    },
    {
        title: "#IOádasdasdS", 
        link: "/",
    },
    {
        title: "#IOádasdS", 
        link: "/",
    },
    {
        title: "#IOSấdasd", 
        link: "/",
    },
]

const data = {
  title:
    "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google Pixel 6",
  authorImage: null,
  author: "_vphlinh",
  image: "/slide3.jpg",
  time: "20220620",
  comment: 10,
  content:
    "Thương hiệu sản xuất ốp lưng điện thoại thân thiện với môi trường - Pela vừa mới ra mắt những mẫu ốp lưng mới dành cho các mẫu điện thoại Pixel 6 và Pixel 6 Pro, có giá bán từ 38 USD (khoảng gần 870.000 đồng), với 4 phiên bản màu sắc khác nhau, bao gồm: <br> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim <br> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim",
  like: 1,
  share: 1,
};

const PostDetail = () => {
  return (
    <div className="post-detail-container">
      <Path data={{title: ["Technology"], content: data.title}}/>
      <div className="post-detail-title">
        <p>{data.title}</p>
      </div>
      <div className="post-detail-author">
        <div className="post-author-profile">
          <div className="post-author-avatar">
            {data?.authorImage ? (
              <Image
                src={data?.authorImage}
                width={24}
                height={24}
                layout="responsive"
                alt="avatar"
              />
            ) : (
              <AvatarDefaultSmall />
            )}
          </div>
          {data?.author}
            <Button type="primary">
                + Theo dõi
            </Button>
        </div>
        <div className="post-detail-time">
            <span>Ngày đăng: </span>
            <p>{ data.time }</p>
        </div>
        <div className="post-detail-time">
            <span>Bình luận: </span>
            <p>{ data.comment }</p>
        </div>        
      </div>
      <div className="post-detail-content">
        <Image src={data.image} width={654} height={300} layout="responsive" alt="post-image"/>
        <div className="post-detail-main-content">
            <p>
                {data.content}
            </p>
        </div>
        <HotTags tags={tags}/>
        <Interactive like={data.like} share={data.share} comment={data.comment}/>
      </div>
      <ListComment/>
      <Recommend posts={trends}/>
    </div>
  );
};
export default memo(PostDetail);
