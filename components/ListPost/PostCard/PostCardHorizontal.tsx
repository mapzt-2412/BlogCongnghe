import React from "react";
import { memo, FC } from "react";
import Image from "next/image";
import { Dropdown, Menu, Space, Typography } from "antd";
import AvatarDefaultSmall from "../../../assets/icon/AvatarDefaultSmall";
import IconLike from "../../../assets/icon/IconLike";
import IconComment from "../../../assets/icon/IconComment";
import IconMoreHorizontal from "../../../assets/icon/IconMoreHorizontal";
import { SliceString, getToken } from "../../../libs/common";
import {
  stringLengthTitle,
  stringLengthDescription,
} from "../../../libs/commonConstants";
import { ROUTE_CREATE_POST } from "../../../libs/constants";
import Link from "next/link";
import Route from "next/router";
import PropertiesService from "../../../services/properties.service";

const PostCardHorizontal = ({ data, type, deleteArticle, deleteDraft }) => {
  const handleClick = ({ key }) => {
    if (key === "1") {
      if (type === "dashboard-article") {
        Route.push(ROUTE_CREATE_POST + `?post=${data.id}`);
      } else {
        Route.push(ROUTE_CREATE_POST + `?draft=${data.id}`);
      }
    } else if (key === "2") {
      if (type === "dashboard-article") {
        deleteArticle(data?.id);
      } else {
        deleteDraft(data?.id);
      }
    }
  };
  const menu = (
    <Menu
      selectable
      onClick={handleClick}
      items={[
        {
          key: "1",
          label: "Chỉnh sửa bài viết",
        },
        {
          key: "2",
          label: "Xóa bài viết",
        },
      ]}
    />
  );
  return (
    <div className="post-card-horizontal-container">
      <div className="post-card-horizontal-image">
        <Link href={`/post/${data?.id}`}>
          <Image
            src={data?.thumbnail !== "story" ? data?.thumbnail : "/"}
            width={282}
            height={175}
            layout="responsive"
            alt="post-image"
          />
        </Link>
      </div>
      <div className="post-card-horizontal-content">
        <div
          className="post-card-horizontal-title"
          onClick={() => Route.push(`/post/${data?.id}`)}
        >
          <p>{data?.title}</p>
          <div className="post-card-horizontal-desc">
            {SliceString(
              data?.description ? data.description : "",
              stringLengthDescription
            )}
          </div>
        </div>
        {data?.user && (
          <>
            <div className="post-card-horizontal-footer">
              <div
                className="post-author-profile"
                onClick={() => Route.push(`/${data?.user?.id}`)}
              >
                <div className="post-author-avatar">
                  {data?.user?.avatar ? (
                    <div className="avatar-small">
                      <Image
                        src={data?.user?.avatar}
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
                {data?.user?.nickname
                  ? data?.user?.nickname
                  : "Người dùng hệ thống"}
              </div>
              <div className="post-interactive">
                <div>
                  {data.likeNum ? data.likeNum : "0"} <IconLike />
                </div>
                <div className="icon-dislike">
                  <IconLike /> {data.dislikeNum ? data.dislikeNum : "0"}{" "}
                </div>
              </div>
            </div>
          </>
        )}
        {type && (
          <div className="post-more">
            <Dropdown overlay={menu}>
              <Space>
                <IconMoreHorizontal />
              </Space>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
};
export default memo(PostCardHorizontal);
