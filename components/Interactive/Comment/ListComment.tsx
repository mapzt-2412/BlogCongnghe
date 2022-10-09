import { Input } from "antd";
import React, { memo, useRef, useState, useEffect } from "react";
import Comment from "./Comment";
import { useRouter } from 'next/router';
import PropertiesService from "../../../services/properties.service";
import { getToken } from "../../../libs/common";

const ListComment = ({ comment, setComment}) => {
  const { id } = useRouter().query;
  const [data,setData] = useState({});
  const handleChangeInput = (e) => {
    setData({...data, comment: e.target.value})
  }
  useEffect(() => {
    if(id){ 
      setData({...data, articleId: id})
    }
  },[id])
  const handleKeyDown = (e) => {
    if(e.keyCode === 13){
      PropertiesService.commentArticle(data, getToken()).then((data) => setComment((pre) => [...pre, data.data.data]))
      setData({...data, comment: ""});
    }
  }
  return (
    <div className="comment-container">
      <div className="comment-input">
        <Input placeholder="Viết bình luận" id={"comment-input"} value={data?.comment} onChange={handleChangeInput} onKeyDown={handleKeyDown}/>
      </div>
      <div className="list-comment">
        {comment?.map((value, index) => (
          <Comment data={ value } key={index}/>
        ))}
      </div>
    </div>
  );
};
export default memo(ListComment);
