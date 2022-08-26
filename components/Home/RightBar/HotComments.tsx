import React, { memo } from 'react';
import Link from 'next/link';
import RightBar from './RightBar';
import { FC } from 'react';
import IconCommentActive from './../../../assets/icon/IconCommentActive';

interface ICommentProps {
    comments: Array<any>;
}

const HotComments: FC<ICommentProps> = ({ comments }) => {
    return(
        <RightBar title="BÌNH LUẬN NỔI BẬT">
            <div className="list-hot-comments">
              {comments.map((value, index) => (
                <div className="hot-comment" key={index}>
                  <div className="hot-comment-content">
                    <div className="hot-comment-icon">
                      <IconCommentActive/>
                    </div>
                    <p>{value.content}</p>
                  </div>
                  <div className="hot-comment-reply">
                    <span>{'('+ value.reply +' phản hồi)'}</span>
                  </div>
                </div>
              ))}
            </div>
          </RightBar>
    )
}
export default memo(HotComments);