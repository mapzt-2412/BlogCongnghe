import React, { memo, useEffect, useState } from "react";
import HotTags from "../../components/Home/RightBar/HotTags";
import Recommend from "../../components/Home/RightBar/Recommend";
import Interactive from "../../components/Interactive/Interactive";
import ListComment from "../../components/Interactive/Comment/ListComment";
import Image from "next/image";
import Link from "next/link";
import AvatarDefaultSmall from "../../assets/icon/AvatarDefaultSmall";
import { Button } from "antd";
import Path from "../../components/Path";
import PropertiesService from "../../services/properties.service";
import { useRouter } from "next/router";
import AreaChart from "../../components/CreatePost/Chart/AreaChart";
import { getToken } from "../../libs/common";

import showdown from "showdown";
import Head from "next/head";
import { spinnerService } from "../../services/spiner.service";
import { Player } from "video-react";

const converter = new showdown.Converter();

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
];

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

const PostDetail = (props) => {
  const { id } = useRouter().query;
  const [data, setData] = useState();
  const [content, setContent] = useState([]);
  const [comment, setComment] = useState();
  const [interactives, setInteractives] = useState();

  useEffect(() => {
    if (id) {
      PropertiesService.getArticleById(id, getToken()).then((data) => {
        setData(data.data.data);
        setContent(JSON.parse(data.data.data.content));
        // setContent(data.data.data.content);
        setInteractives(data.data.data.interactives);
      });
      PropertiesService.getComment(id, getToken()).then((data) =>
        setComment(data.data.data)
      );
    }
  }, [id]);
  const renderContent = (type, data) => {
    if (type === "chart") {
      return <AreaChart dataChart={data} />;
    } else if (type === "video") {
      return (
        <div className="video-upload">
          <Player
            src={data}
            width={"100%"}
            height={500}
            fluid={false}
            muted={true}
            autoPlay
          />
        </div>
      );
    } else if (type === "content") {
      if (data?.key === "normal") {
        return (
          <div
            dangerouslySetInnerHTML={{ __html: `${data.data}` }}
            className={"ck-content"}
          />
        );
      } else {
        const html = converter.makeHtml(data.data);
        return (
          <div
            dangerouslySetInnerHTML={{ __html: `${html}` }}
            className={"ck-markdown-content"}
          />
        );
      }
    }
  };
  const handleFollow = () => {
    PropertiesService.userFollow(
      { userFollowedId: data.user.id },
      getToken()
    ).then((data) => {
      console.log(data);
    });
  };
  console.log(props);

  return (
    <>
      <Head>
        <title>{props?.apiResponse?.data.title}</title>
        <meta name="keywords" content={props?.apiResponse?.data.title}></meta>
        <meta property="og:type" content="article" />
        <meta
          property="og:description"
          content={`${
            props?.apiResponse?.data.description
          } , ${props?.apiResponse?.data.tags
            ?.map((value) => value.name)
            .join(",")}`}
        ></meta>
        <meta
          property="og:title"
          content={props?.apiResponse?.data.title}
        ></meta>
        <meta
          property="og:image"
          content={props?.apiResponse?.data.thumbnail}
        ></meta>
        <meta
          property="og:url"
          content={`${process.env.REACT_APP_BASE_URL}/post/${id}`}
        />
      </Head>
      <div className="post-detail-container">
        <Path data={{ title: [data?.topic.name], content: data?.title }} />
        <div className="post-detail-title">
          <p>{data?.title}</p>
        </div>
        <div className="post-detail-author">
          <div className="post-author-profile">
            <div className="post-author-avatar">
              {data?.user.avatar ? (
                <div className="avatar-small">
                  <Image
                    src={data?.user.avatar}
                    width={24}
                    height={24}
                    layout="responsive"
                    alt="avatar"
                  />
                </div>
              ) : (
                <AvatarDefaultSmall />
              )}
            </div>
            <Link href={`/${data?.user?.id}`}>
              {data?.user?.nickname
                ? data?.user?.nickname
                : "Người dùng hệ thống"}
            </Link>
            {!data?.isFollow && (
              <Button type="primary" onClick={handleFollow}>
                + Theo dõi
              </Button>
            )}
          </div>
          <div className="post-detail-time">
            <span>Ngày đăng: </span>
            <p>{data?.updatedAt.split("T")[0]}</p>
          </div>
          <div className="post-detail-time">
            <span>Bình luận: </span>
            <p>{comment?.length}</p>
          </div>
        </div>
        <div className="post-detail-content">
          {data?.topic.name !== "Vlog" && (
            <Image
              src={data?.thumbnail}
              width={654}
              height={300}
              layout="responsive"
              alt="post-image"
            />
          )}
          <div className="post-detail-main-content">
            {content?.map((value) => (
              <>{renderContent(value.type, value.data)}</>
            ))}
          </div>
          <HotTags tags={data?.tags ? data?.tags : []} title={"DANH SÁCH TAGS"} />
          <Interactive dataInteractive={data} id={id} />
        </div>
        <ListComment comment={comment} setComment={setComment} />
        <Recommend posts={trends} />
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  let url = `https://blog-cong-nghe.herokuapp.com/articles/${context.params.id}`;

  let requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, requestOptions);
  const resJson = await res.json();

  return {
    props: {
      apiResponse: resJson,
    },
  };
}

export default memo(PostDetail);
