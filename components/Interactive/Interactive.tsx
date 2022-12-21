import React from "react";
import { memo, useEffect, useState } from "react";
import IconComment from "../../assets/icon/IconComment";
import IconLike from "../../assets/icon/IconLike";
import IconLikeActive from "../../assets/icon/IconLikeActive";
import IconShare from "../../assets/icon/IconShare";
import PropertiesService from "../../services/properties.service";
import {getToken} from "../../libs/common";
import { URL } from "../../libs/constants";
import { report } from "../../libs/commonConstants";
import { FacebookShareButton } from "react-share";
import { Modal, Radio, Select, Input, Button, RadioChangeEvent  } from 'antd';
import userService from "../../services/user.service";

const { Option } = Select;

const Interactive = ({dataInteractive , id }) => {
  const [like, setLike] = useState(dataInteractive?.liked);
  const [dislike, setDislike] = useState(dataInteractive?.disliked);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likeNum, setLikeNum] = useState(0);
  const [dislikeNum, setDislikeNum] = useState(0);
  const [bookmark, setBookmark] = useState(false);
  const [callApi, setCallApi] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const [placement, SetPlacement] = useState('');
  const [data, setData ] = useState({
    bookmark: bookmark,
    articleId: '',
  });
  useEffect(() => {
    if(dataInteractive?.liked){ 
      setLike(dataInteractive?.liked)
    }
    if(dataInteractive?.disliked){ 
      setDislike(dataInteractive?.disliked)
    }
    if(dataInteractive?.isBookmark){
      setBookmark(dataInteractive?.isBookmark)
    }
    if(dataInteractive?.likeNum){
      setLikeNum(dataInteractive?.likeNum)
    }
    if(dataInteractive?.dislikeNum){
      setDislikeNum(dataInteractive?.dislikeNum)
    }
  },[dataInteractive?.isBookmark, dataInteractive?.likeNum, dataInteractive?.dislikeNum, dataInteractive?.liked, dataInteractive?.disliked, dataInteractive?.likeNum, dataInteractive?.dislikeNum, dataInteractive])

  useEffect(()=>{
    if(callApi) {
      PropertiesService.likeArticle(data, getToken()).then((data) => console.log(data.data.data))
      setCallApi(false);
    }
  },[callApi, data])

  console.log(data)

  useEffect(() => {
    setData((pre) => {
      return {
        ...pre,
      bookmark: bookmark,
      }
    })
  },[bookmark])

  useEffect(() => {
    if(id){ 
      setData((pre) => ({...pre, articleId: id}))
    }
  },[id])
  const handleComment = () => {
    document.getElementById("comment-input")?.focus();
  }
  const handleInteractive = (type) =>{
    if(type === "like"){
      setLike(!like);
      userService.toggleLike({articleId: id, status: !like}, getToken()).then((data) => {
        console.log(data)
        setLikeNum(data.data.data.likeNum);
        setDislikeNum(data.data.data.dislikeNum);
        setLike(data.data.data.like);
        setDislike(data.data.data.dislike);
      });
      setCallApi(true);
    }else if(type === "dislike"){
      setDislike(!dislike);
      userService.toggleDisliked({articleId: id, status: !dislike}, getToken()).then((data) => {
        setLikeNum(data.data.data.likeNum);
        setDislikeNum(data.data.data.dislikeNum);
        setLike(data.data.data.like);
        setDislike(data.data.data.dislike);
      });
      setCallApi(true);
    }
    else if(type === "bookmark"){
      setBookmark(!bookmark)
      setData({...data, bookmark: !bookmark});
      setCallApi(true);
    }
  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const placementChange = (e: RadioChangeEvent) => {
    SetPlacement(e.target.value);
  };
  const handleChangeInput = (e) => {
    setReportContent(e.target.value);
  };
  const handleReport = () => {
    PropertiesService.sendReport({articleId: id, description: reportContent, type: placement}, getToken()).then((data) => {
      alert("Báo cáo thành công");
      handleCancel();
    })
  }
  return (
    <div className="interactive-container">
      <button className={"interactive "} onClick={()=> handleInteractive("like")}>
        {
          like ? <IconLikeActive width={23} height={21} /> : <IconLike width={23} height={21} />
        }
        
        <span>{likeNum}</span>
        Thích
      </button>
      <button className={"interactive dislike"} onClick={()=> handleInteractive("dislike")}>
        {
          dislike ? <IconLikeActive width={23} height={21} /> : <IconLike width={23} height={21} />
        }
        
        <span>{dislikeNum}</span>
        Không thích
      </button>
      <FacebookShareButton url={"https://www.bilibili.tv/vi/play/1060852?bstar_from=bstar-web.search-result.0.0"} className="interactive">
          <IconShare width={19} height={21} />
          Chia sẻ
      </FacebookShareButton>
      <button className="interactive" onClick={handleComment}>
        <IconComment width={21} height={21} />
        Bình luận
      </button>
      <button className="interactive" onClick={()=> handleInteractive("bookmark")}>
        {bookmark ? "Đã đánh dấu" : "Đánh dấu"}
      </button>
      <button className="interactive" onClick={showModal}>
        Báo cáo
      </button>
      <Modal title="Báo cáo" visible={isModalOpen} onCancel={handleCancel} footer={false}>
        <h2>Hãy chọn vấn đề</h2>
        <p>Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy tìm ngay sự giúp đỡ trước khi báo cáo với chúng tôi.</p>
        <Radio.Group value={placement} onChange={placementChange}>
          {
            report?.map((value,index) => 
            <Radio.Button value={value.type} key ={index}>{value.value}</Radio.Button>)
          }
        </Radio.Group>
        {
          placement !== "" &&
          <>
          <Input placeholder="Nhập nội dung báo cáo" value={reportContent} onChange={handleChangeInput}/>
          <div className="interactive-report">
              <Button onClick={handleReport}>
                Gửi báo cáo
              </Button>
          </div>
          </>
        }
      </Modal>
    </div>
  );
};
export default memo(Interactive);
