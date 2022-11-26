import moment from "moment";
import Link from "next/link";
import React from "react";
import { memo, useRef } from "react";
import AvatarDefaultSmall from "../../assets/icon/AvatarDefaultSmall";
import IconTimming from "../../assets/icon/IconTimming";
import Image from "next/image";
import { SliceString } from "../../libs/common";
import { stringLengthTitle } from "../../libs/commonConstants";
import { Player } from "video-react";

const VlogCard = ({ data }) => {
  const ref = useRef<HTMLVideoElement>();
  const handleMouseEnter = () => {
    ref?.current?.play();
  };
  const handleMouseLeave = () => {
    ref?.current?.pause();
  };
  return (
    <div className="post-card-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="post-card-video">
        <Link href={`/post/${data?.id}`}>
          <Player
            src={data?.content}
            width={280}
            height={175}
            fluid={false}
            ref={ref}
            muted={true}
            controls={false}
          />
        </Link>
      </div>
      <div className="post-title">
        <p> {SliceString(data?.title, stringLengthTitle)} </p>
      </div>
      {data?.user && (
        <>
          <div className="post-author">
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
              {data?.user.nickname
                ? data?.user.nickname
                : "Người dùng hệ thống"}
            </div>
            <div className="post-time">
              <IconTimming />
              <div className="post-duration">
                {moment(data?.updatedAt, "YYYYMMDD").fromNow()}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default memo(VlogCard);
