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

const PostCardHorizontal = ({ data, type, setData }) => {
  const handleClick = ({ key }) => {
    if (key === "1") {
      if (type === "dashboard-article") {
        Route.push(ROUTE_CREATE_POST + `?post=${data.id}`);
      } else if (type === "dashboard-draft") {
        Route.push(ROUTE_CREATE_POST + `?draft=${data.id}`);
      }
    } else if (key === "2") {
      if (type === "dashboard-article") {
        PropertiesService.deleteArticle(
          { articleId: data.id },
          getToken()
        ).then((data) => {
          if(data.data.data) {
            PropertiesService.getArticleByUser(getToken()).then((data) => setData(data.data.data))
          }
        });
      } else if (type === "dashboard-draft") {
        PropertiesService.deleteDraft({ draftId: data.id }, getToken()).then(
          (data) => {
            if (data.data.data) {
              PropertiesService.getDraftByUser(getToken()).then((data) =>
                setData(data.data.data)
              );
            }
          }
        );
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
            src={data?.thumbnail}
            width={282}
            height={175}
            layout="responsive"
            alt="post-image"
          />
        </Link>
      </div>
      <div className="post-card-horizontal-content">
        <div className="post-card-horizontal-title">
          <p>{data.title}</p>
          <div className="post-card-horizontal-desc">
            {SliceString(data.description, stringLengthDescription)}
          </div>
        </div>
        {data?.user && (
          <>
            <div className="post-card-horizontal-footer">
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
                {data?.user.nickname}
              </div>
              <div className="post-interactive">
                <span>
                  {0} <IconLike />
                </span>
                <span>
                  {0} <IconComment />
                </span>
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
