import React, { memo } from 'react';
import Link from 'next/link';
import RightBar from './RightBar';
import { FC } from 'react';

interface ITagsProps {
    tags: Array<any>;
}

const HotTags: FC<ITagsProps> = ({ tags }) => {
    return (
        <RightBar title="TAG NỔI BẬT">
            <div className="tags">
              {tags?.map((value, index) => (
                <div className="link tag" key={index}>
                  {
                    value && <Link href="/">{`#${value}`}</Link>
                  }
                </div>
              ))}
            </div>
          </RightBar>
    )
}
export default memo(HotTags);