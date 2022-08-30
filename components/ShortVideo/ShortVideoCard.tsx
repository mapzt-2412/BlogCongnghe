import React, { memo, useRef } from "react";
import { Player } from "video-react";
import Image from "next/image";
import AvatarDefaultSmall from "./../../assets/icon/AvatarDefaultSmall";

const ShortVideoCard = ({ value }) => {
  const ref = useRef(null);
  const handleMouseEnter = () => {
    ref?.current.play();
  };
  const handleMouseLeave = () => {
    ref?.current.pause();
  };
  return (
    <div
      className="short-video"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* <Image src={value.thumbnail} width={135} height={225} alt="short-video"/> */}
      <Player
        src={value.video}
        fluid={false}
        width={135}
        height={225}
        ref={ref}
        muted={true}
      />

      <div className="short-video-avatar">
        {value.avatar ? (
          <Image src={value.avatar} width={36} height={36} alt="avatar" />
        ) : (
          <AvatarDefaultSmall width={36} height={36} />
        )}
      </div>
      <div className="short-video-author">
        <span>{value.author}</span>
      </div>
    </div>
  );
};
export default ShortVideoCard;
