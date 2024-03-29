import React, { FC, memo } from "react";
import Image from "next/image";
import AvatarDefaultSmall from "../../../assets/icon/AvatarDefaultSmall";
import IconTimming from "../../../assets/icon/IconTimming";
import { formatDate, SliceString } from "../../../libs/common";
import {
  stringLengthTitle,
  stringLengthDescription,
} from "../../../libs/commonConstants";
import moment from "moment";
import Link from "next/link";
import Route from "next/router";

interface IPostCardProps {
  data: {
    thumbnail: string;
    title: string;
    user: {
      nickname: string;
      id: string;
    };
    time: string;
    authorImage: string;
    id: string;
    updatedAt: string;
  };
  index: number;
  type?: string;
}

const PostCard: FC<IPostCardProps> = ({ data, index, type }) => {
  const NavigateToProfile = () => {
    Route.push(`/${data?.user.id}`);
  };
  const NavigateToArticle = () => {
    Route.push(`/post/${data?.id}`);
  };
  return (
    <div className={"post-card-container " + (index === 2 ? "right" : "")}>
      <div className="post-card-image">
        <Link href={`/post/${data?.id}`}>
          <Image
            src={data?.thumbnail !== "story" ? data?.thumbnail : "/"}
            width={280}
            height={175}
            layout="responsive"
            alt="post-image"
          />
        </Link>
      </div>
      <div className="post-title" onClick={NavigateToArticle}>
        <p> {SliceString(data?.title, stringLengthTitle)} </p>
      </div>
      {data?.user && (
        <>
          <div className="post-author">
            <div className="post-author-profile" onClick={NavigateToProfile}>
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
              {data?.user.nickname
                ? data?.user.nickname
                : "Người dùng hệ thống"}
            </div>
            <div className="post-time">
              <IconTimming />
              <div className="post-duration">{formatDate(data?.updatedAt)}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default memo(PostCard);
