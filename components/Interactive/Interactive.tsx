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
import { Modal, Radio, Select, Input, Button  } from 'antd';

const { Option } = Select;

const Interactive = ({dataInteractive , id }) => {
  const [like, setLike] = useState(dataInteractive?.isLike);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likeNum, setLikeNum] = useState(dataInteractive?.interactives?.likeNum);
  const [bookmark, setBookmark] = useState(dataInteractive?.isBookmark);
  const [callApi, setCallApi] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const [placement, SetPlacement] = useState('');
  const [data, setData ] = useState({
    like: like,
    bookmark: bookmark,
  });
  useEffect(() => {
    if(dataInteractive?.isLike !== "undifine"){ 
      setLike(dataInteractive?.isLike)
    }
    if(dataInteractive?.isBookmark !== "undifine"){
      setBookmark(dataInteractive?.isBookmark)
    }
    if(dataInteractive?.interactives?.likeNum !== "undifine"){
      console.log(dataInteractive?.interactives?.likeNum)
      setLikeNum(dataInteractive?.interactives?.likeNum)
    }
  },[dataInteractive?.isLike, dataInteractive?.isBookmark])

  useEffect(()=>{
    if(callApi) {
      PropertiesService.likeArticle(data, getToken()).then((data) => console.log(data.data.data))
      setCallApi(false);
    }
  },[data])

  useEffect(() => {
    setData((pre) => {
      return {
        ...pre,
      like: like,
      bookmark: bookmark,
      }
    })
  },[like, bookmark])
  
  useEffect(() => {
    if(id){ 
      setData({...data, articleId: id})
    }
  },[id])
  const handleComment = () => {
    document.getElementById("comment-input")?.focus();
  }
  const handleInteractive = (type) =>{
    if(type === "like"){
      setLike(!like);
      if(like === true){
        setLikeNum(likeNum - 1);
      }else{
        setLikeNum(likeNum + 1);
      }
      setData({...data, like: !like});
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
            <Radio.Button value={value.type}>{value.value}</Radio.Button>)
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
