import React, { memo, useRef, useState, useEffect, useCallback, useContext } from "react";
import IconClose from "./../../assets/icon/IconClose";
import IconArrowLeft from "./../../assets/icon/IconArrowLeft";
import IconArrowRight from "./../../assets/icon/IconArrowRight";
import Image from "next/image";
import AvatarDefaultSmall from "./../../assets/icon/AvatarDefaultSmall";
import { formatDate, getToken } from "./../../libs/common";
import Interactive from "../../components/Interactive/Interactive";
import ListComment from "../../components/Interactive/Comment/ListComment";
import IconPlay from "./../../assets/icon/IconPlay";
import { useRouter } from "next/router";
import { ROUTE_NEWSFEEDS, ROUTE_SHORTVIDEO } from "./../../libs/constants";
import ShortVideoContext, {
  Context,
} from "./context";
import { UserInfo } from "../_app";
import PropertiesService from "../../services/properties.service";

const ShortVideo = () => {
  const router = useRouter();
  const { id } = useRouter().query;
  const ref = useRef(null);
  const [isPlay, setIsPlay] = useState(true);
  const { shortVideoIds } = useContext(UserInfo);
  const [data, setData] = useState({
    author: "_vphlinh",
    avatar: null,
    title: "Tôi yêu Việt Nam đất nước tôi!",
    like: 218,
    share: 0,
    comment: 10,
    time: "20200202",
  });
  const [url, setUrl] = useState();
  const [interactives, setInteractives] = useState();
  const [comment , setComment] = useState();
  const [navigate, setNavigate] = useState({
    pre: 0, 
    next: 0,
  });
  console.log(shortVideoIds)
  useEffect(() => {
    if(shortVideoIds && id){
      const index = shortVideoIds.reduce((_, value, index) => value === id && index, 0)
      console.log(index)
      if(index === shortVideoIds.length){
        setNavigate({
          pre: shortVideoIds[index - 1],
          next: shortVideoIds[0],
        })
      }else if(index === 0){
        setNavigate({
          pre: shortVideoIds[shortVideoIds.length],
          next: shortVideoIds[1],
        })
      }else{
        setNavigate({
          pre: shortVideoIds[index - 1],
          next: shortVideoIds[index + 1],
        })
      }
    }
  },[id, shortVideoIds])
  useEffect(() => {
    if(id){
      PropertiesService.getArticleById(id, getToken()).then((data) => {
        setUrl(JSON.parse(data.data.data.content)[0])
        setData(pre => {
          return{
            ...pre,
            ...data.data.data
          }
        });
        setInteractives(data.data.data.interactives)
      })
      PropertiesService.getComment(id).then((data) => setComment(data.data.data))
    }
  },[id])

  const handlePlay = () => {
    setIsPlay(!isPlay);
  };
  
  const handleClose = () => {
    router.replace(ROUTE_NEWSFEEDS);
  };
  const handleNavigation = () => {
    router.push(ROUTE_SHORTVIDEO + `/${navigate.next}`);
  };
  console.log(url)
  return (
    <div className="short-video-container">
      <div className="short-video-content">
        <div className="video">
          <video
            ref={ref}
            src={url?.data}
            loop
            autoPlay
            muted
            controls
            onClick={handlePlay}
          />
        </div>
      </div>
      <div className="short-video-button">
        <button type="button" className="close-button" onClick={handleClose}>
          <IconClose />
        </button>
        <button type="button" className="pre-button" onClick={handleNavigation}>
          <IconArrowLeft />
        </button>
        <button
          type="button"
          className="next-button"
          onClick={handleNavigation}
        >
          <IconArrowRight />
        </button>
      </div>
      <div className="short-video-info">
        <div className="short-video-author">
          <div className="short-video-author-avatar">
            {data?.avatar ? (
              <Image src={data?.avatar} width={48} height={48} alt="" />
            ) : (
              <AvatarDefaultSmall width={48} height={48} />
            )}
          </div>
          <div className="short-video-author-info">
            <p>{data.author}</p>
            <span>{formatDate(data.time)}</span>
          </div>
        </div>
        <div className="short-video-description">
          <div className="short-video-title">
            <span>{data.title}</span>
          </div>
          <Interactive
            like={data.like}
            share={data.share}
            comment={data.comment}
          />
        </div>
        <div className="short-video-comment">
          <ListComment />
        </div>
      </div>
    </div>
  );
};
export default memo(ShortVideo);
