import React, { memo, useRef } from "react";
import { Player } from "video-react";
import Image from "next/image";
import AvatarDefaultSmall from "./../../assets/icon/AvatarDefaultSmall";

const ShortVideoCard = ({ value,onClick, type }) => {
  const ref = useRef<HTMLVideoElement>();
  const handleMouseEnter = () => {
    ref?.current?.play();
  };
  const handleMouseLeave = () => {
    ref?.current?.pause();
  };
  return (
    <div
      className="short-video"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* <Image src={value.thumbnail} width={135} height={225} alt="short-video"/> */}
      <Player
        src={value[0].data}
        fluid={false}
        width={'100%'}
        height={type ? 500 :225}
        ref={ref}
        muted={true}
      />

      <div className="short-video-avatar">
        {value?.avatar ? (
          <Image src={value?.avatar} width={36} height={36} alt="avatar" />
        ) : (
          <AvatarDefaultSmall width={36} height={36} />
        )}
      </div>
      <div className="short-video-author">
        <span>{value?.author}</span>
      </div>
    </div>
  );
};
export default memo(ShortVideoCard);
