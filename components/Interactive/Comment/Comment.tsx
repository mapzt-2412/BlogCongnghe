import React, { memo, useState, useRef, useEffect } from "react";
import AvatarDefaultSmall from "../../../assets/icon/AvatarDefaultSmall";
import { formatDate } from "../../../libs/common";
import Image from "next/image";
import { Input } from "antd";
import PropertiesService from "../../../services/properties.service";
import { useRouter } from 'next/router';
import { getToken } from "../../../libs/common";

const Comment = ({ data, level, handleInteractiveLastChild }) => {
    const [isShowReply, setIsShowReply] = useState(false);
    const [isShowInput, setIsShowInput] = useState(false);
    const [comment, setComment] = useState(data?.children);
    const [cmtAuthor, setCmtAuthor] = useState("");
    const refInput = useRef(null);
    const CmtLevel = level ? level : 0;
    const { id } = useRouter().query;
    const [requestData,setRequestData] = useState({});
    const handleShowReply = () => {
        setIsShowReply(!isShowReply);   
    }
    useEffect(() => {
      if(id){ 
        setRequestData({...requestData, articleId: id})
      }
    },[id])
    const handleChangeInput = (e) => {
      setRequestData({...requestData, comment: e.target.value})
    }
    const handleKeyDown = (e) => {
      if(e.keyCode === 8 && cmtAuthor !== "" && requestData?.comment === ""){
        setCmtAuthor("");
      }
      else if(e.keyCode === 13){
        PropertiesService.commentArticle(requestData, getToken()).then((data) => {
          if(comment){
            setComment([...comment, data.data.data])
          }
        })
        setRequestData({...requestData, comment: ""});
      }
    }

    const handleInteractive = (message, author) =>{
      setRequestData({...requestData, parentsId: id})
      console.log(requestData)
        if(message === "reply"){
            if(level === 1){
                handleInteractiveLastChild(message, author);
            }else{
                setIsShowInput(true);
                setTimeout(() => refInput?.current.focus(), 0);
                if(comment === ""){
                    setCmtAuthor(`@${author} `);
                }
            }
        }
    }
    return (
        <div className={`first-level-comment comment`}>
        <div className="comment-wrapper">
            <div className="comment-avatar">
              {data.avatar ? (
                <Image src={data.avatar} width={32} height={32} alt="avatar" />
              ) : (
                <AvatarDefaultSmall width={32} height={32}/>
              )}
            </div>
            <div className="comment-content">
              <div className="comment-info">
                <p>{data?.author?.username}</p>
                <span className="italic">{formatDate(data?.createdAt)}</span>
              </div>
              <p>{ data.content }</p>
            </div>
        </div>
        <div className="comment-interactive">
            <p>Thích</p>
            <p onClick={() => handleInteractive("reply", data?.author.username)}>Phản hồi</p>
            <p>Chia sẻ</p>
        </div>
            {   
                comment?.length > 1 && !isShowReply ?
                  <>
                    <div className="child-level-comment comment">
                        <p className="see-more" onClick={handleShowReply}>{`Xem Thêm 2 bình luận cũ hơn`}</p>
                        <Comment data={ comment[comment?.length - 1] } level={CmtLevel + 1} handleInteractiveLastChild={handleInteractive}/>
                    </div>
                  </>
                : 
                comment?.map((secondValue, index)=>(
                    <div className="child-level-comment comment" key={index}>
                      <Comment data={ secondValue } level={CmtLevel + 1} handleInteractiveLastChild={handleInteractive}/>
                    </div>
                  ))
            }
        <div className={"comment-input-reply " + (isShowInput ? "show" : "hide")}>
            <span>{cmtAuthor}</span>
            <input placeholder={cmtAuthor ==="" ? "Viết bình luận" : ""} ref={refInput} value={requestData?.comment} onChange={handleChangeInput} onKeyDown={handleKeyDown}/>
        </div>
        </div>
    )
}
export default memo(Comment);