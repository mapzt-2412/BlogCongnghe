import React, { memo } from "react";
import Link from "next/link";
import RightBar from "./RightBar";
import { FC } from "react";
import { useEffect } from "react";
import articleService from "../../../services/article.service";
import { useState } from "react";

interface ITagsProps {
  tags?: Array<any>;
  title?: string;
}

const HotTags: FC<ITagsProps> = ({ tags, title }) => {
  const [hotTags, setHotTags] = useState<Array<any>>([]);
  useEffect(() => {
    if (tags) {
      setHotTags(tags);
    } else {
      articleService.gettags().then((data) => setHotTags(data.data.data));
    }
  }, [tags]);

  return (
    <RightBar title={title ? title : "TAG NỔI BẬT"}>
      <div className="tags">
        {hotTags?.slice(0, 10).map((value, index) => (
          <div className="link tag" key={index}>
            {value && (
              <Link href={`/list-post/tags?name=${value.name}`}>
                {value.name ? `#${value.name}` : `#${value}`}
              </Link>
            )}
          </div>
        ))}
      </div>
    </RightBar>
  );
};
export default memo(HotTags);
