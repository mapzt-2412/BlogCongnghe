import React, { FC, memo, useState, useEffect } from 'react';
import Link from "next/link";
import IconNext from "./../../../assets/icon/IconNext";
import PostCard from '../../ListPost/PostCard/PostCard';
import PropertiesService from "../../../services/properties.service";

const Topic = ({ data }) => {
    const [articles, setArticles] = useState();
    useEffect(() => {
        PropertiesService.get3ArticlesByTopic(data?.name).then((data) => setArticles(data.data.data))
    },[data?.name]) 
    return (
        <div className="topic-container">
            <div className="topic-header">
                <div className="topic-title">
                        <p>{ data?.name }</p>
                    </div>
                    <div className="topic-arrow-top"></div>
                    <div className="topic-arrow-bottom"></div>
                    <Link href={`/list-post/${data?.name}`}>
                        <div className="topic-see-more">
                            Xem thêm
                            <IconNext className="icon-next-mobile" />
                        </div>
                    </Link>
                    
                </div>
                <div className="topic-content">  
                    {
                        articles?.map((value, index) => (
                            <>
                                <PostCard data={value} key={index} index={index}/>
                            </>
                        ))
                    }
                </div>
        </div>
    )
}
export default memo(Topic);