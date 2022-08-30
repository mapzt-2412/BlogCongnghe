import React, { FC, memo } from 'react';
import Link from "next/link";
import IconNext from "./../../../assets/icon/IconNext";
import PostCard from '../../ListPost/PostCard/PostCard';

interface ITopicProps {
    data: {
        topic: string;
        data: Array<any>;
    };
} 

const Topic: FC<ITopicProps> = ({ data }) => {
    return (
        <div className="topic-container">
            <div className="topic-header">
                <div className="topic-title">
                        <p>{ data?.topic }</p>
                    </div>
                    <div className="topic-arrow-top"></div>
                    <div className="topic-arrow-bottom"></div>
                    <Link href="/">
                        <div className="topic-see-more">
                            Xem thêm
                            <IconNext/>
                        </div>
                    </Link>
                    
                </div>
                <div className="topic-content">  
                    {
                        data?.data.map((value, index) => (
                            <PostCard data={value} key={index} index={index}/>
                        ))
                    }
                </div>
        </div>
    )
}
export default memo(Topic);