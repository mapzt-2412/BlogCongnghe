import React, { FC, memo } from 'react';
import Image from 'next/image';
import AvatarDefaultSmall from '../../../assets/icon/AvatarDefaultSmall';
import IconTimming from '../../../assets/icon/IconTimming';
import { SliceString } from '../../../libs/common';
import { stringLengthTitle, stringLengthDescription } from '../../../libs/commonConstants';
import moment from 'moment';
import Link from "next/link"
import vi from "moment/locale/vi";

interface IPostCardProps {
    data: {
        image: string;
        title: string;
        author: string;
        time: string;
        authorImage: string;
    },
    index: number;
    type?: string;
} 

const PostCard: FC<IPostCardProps> = ({ data, index, type }) => {
    return (
        <div className={'post-card-container ' + (index === 2 ? "right" : "" ) }>
            <div className="post-card-image">
            <Link href={`/post/${data.id}`}>
                <Image src={data?.thumbnail} width={280} height={175} layout="responsive" alt='post-image'/>
                </Link>
            </div>
            <div className="post-title">
                <p> { SliceString(data?.title,stringLengthTitle) } </p>
            </div>
            <div className="post-author">
                <div className="post-author-profile">
                    <div className="post-author-avatar"> 
                    {
                        data?.authorImage ?
                        <Image src={data?.authorImage} width={24} height={24} layout="responsive" alt="avatar"/>
                        :
                        <AvatarDefaultSmall/>
                    }
                    </div>
                    { data?.author.nickname }
                </div>
                <div className="post-time">
                    <IconTimming/>
                    <div className="post-duration">
                        {
                            moment(data?.createdAt, "YYYYMMDD").locale("vi", vi).fromNow()
                        }
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default memo(PostCard);