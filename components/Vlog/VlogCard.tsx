import moment from "moment";
import Link from "next/link";
import React from "react";
import { memo, useRef } from "react";
import AvatarDefaultSmall from "../../assets/icon/AvatarDefaultSmall";
import IconTimming from "../../assets/icon/IconTimming";
import Image from "next/image";
import { formatDate, SliceString } from "../../libs/common";
import { stringLengthTitle } from "../../libs/commonConstants";
import { Player } from "video-react";
import { useMemo } from "react";
import Router from "next/router";

const VlogCard = ({ data }) => {
  const ref = useRef<HTMLVideoElement>();
  const handleMouseEnter = () => {
    ref?.current?.play();
  };
  const handleMouseLeave = () => {
    ref?.current?.pause();
  };
  const content = useMemo(() => {
    if (data.content) {
      return JSON.parse(data.content).filter(
        (content) => content.type === "video"
      );
    }
    return;
  }, [data.content]);
  return (
    <div
      className="post-card-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="post-card-video">
        <Link href={`/post/${data?.id}`}>
          <Player
            src={content[0].data}
            width={"100%"}
            height={175}
            fluid={false}
            ref={ref}
            muted={true}
            controls={false}
          />
        </Link>
      </div>
      <div
        className="post-title"
        onClick={() => Router.push(`/post/${data?.id}`)}
      >
        <p> {SliceString(data?.title, stringLengthTitle)} </p>
      </div>
      {data?.user && (
        <>
          <div className="post-author">
            <div
              className="post-author-profile"
              onClick={() => Router.push(`/${data?.user.id}`)}
            >
              <div className="post-author-avatar">
                {data?.user.avatar ? (
                  <Image
                    src={data?.user.avatar}
                    width={24}
                    height={24}
                    layout="responsive"
                    alt="avatar"
                  />
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
export default memo(VlogCard);
