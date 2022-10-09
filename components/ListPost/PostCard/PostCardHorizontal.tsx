import React from "react";
import { memo, FC } from "react";
import Image from 'next/image';
import AvatarDefaultSmall from "../../../assets/icon/AvatarDefaultSmall";
import IconLike from '../../../assets/icon/IconLike';
import IconComment from '../../../assets/icon/IconComment';
import { SliceString } from '../../../libs/common';
import { stringLengthTitle, stringLengthDescription } from '../../../libs/commonConstants';
import Link from "next/link";

const PostCardHorizontal = ({ data }) => {
    return (
        <div className="post-card-horizontal-container">
            <div className="post-card-horizontal-image">
                <Link href={`/post/${data?.id}`}>
                <Image src={ data?.thumbnail} width={282} height={175} layout="responsive" alt="post-image"/>
                </Link>
            </div>
            <div className="post-card-horizontal-content">
                <div className="post-card-horizontal-title">
                    <p>{ data.title }</p>
                    <div className="post-card-horizontal-desc">
                        
                    {  SliceString(data.description,stringLengthDescription) }
                </div>
                </div>
                <div className="post-card-horizontal-footer">
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
                    <div className="post-interactive">
                        <span>{0} <IconLike/></span>
                        <span>{0} <IconComment/></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default memo(PostCardHorizontal);