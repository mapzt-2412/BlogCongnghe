import React, { memo, useState, useRef } from "react";
import AvatarDefaultSmall from "../../../assets/icon/AvatarDefaultSmall";
import { formatDate } from "../../../libs/common";
import Image from "next/image";
import { Input } from "antd";

const Comment = ({ data, level, handleInteractiveLastChild }) => {
    const [isShowReply, setIsShowReply] = useState(false);
    const [isShowInput, setIsShowInput] = useState(false);
    const [comment, setComment] = useState("");
    const [cmtAuthor, setCmtAuthor] = useState("");
    const refInput = useRef(null);
    const CmtLevel = level ? level : 0;
    const handleShowReply = () => {
        setIsShowReply(!isShowReply);   
    }
    const handleInteractive = (message, author) =>{
        if(message === "reply"){
            if(level === 2){
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
    const handleChange = (e) =>{
        setComment(e.target.value)
    }
    const handleKeyDown = (e) => {
        if(e.keyCode === 8 && cmtAuthor !== "" && comment === ""){
            setCmtAuthor("");
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
                <p>{data.userName}</p>
                <span className="italic">{formatDate(data.time)}</span>
              </div>
              <p>{ data.content }</p>
            </div>
        </div>
        <div className="comment-interactive">
            <p>Thích</p>
            <p onClick={() => handleInteractive("reply", data.userName)}>Phản hồi</p>
            <p>Chia sẻ</p>
        </div>
            {   
                data.reply?.length > 1 && !isShowReply ?
                  <>
                    <div className="child-level-comment comment">
                        <p className="see-more" onClick={handleShowReply}>{`Xem Thêm 2 bình luận cũ hơn`}</p>
                        <Comment data={ data.reply[data.reply.length - 1] } level={CmtLevel + 1} handleInteractiveLastChild={handleInteractive}/>
                    </div>
                  </>
                : 
                    data.reply?.map((secondValue, index)=>(
                    <div className="child-level-comment comment" key={index}>
                      <Comment data={ secondValue } level={CmtLevel + 1} handleInteractiveLastChild={handleInteractive}/>
                    </div>
                  ))
            }
        <div className={"comment-input-reply " + (isShowInput ? "show" : "hide")}>
            <span>{cmtAuthor}</span>
            <input placeholder={cmtAuthor ==="" ? "Viết bình luận" : ""} ref={refInput} value={comment} onChange={handleChange} onKeyDown={handleKeyDown}/>
        </div>
        </div>
    )
}
export default memo(Comment);