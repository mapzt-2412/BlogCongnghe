import React from "react";
import { memo, useState, useEffect, FC } from "react";
import IconCardSort from "../../assets/icon/IconCardSort";
import IconListSort from "../../assets/icon/IconListSort";
import IconCardSortActive from "../../assets/icon/IconCardSortActive";
import IconListSortActive from "../../assets/icon/IconListSortActive";
import PostCardHorizontal from "./PostCard/PostCardHorizontal";
import PostCard from "./PostCard/PostCard";
import { Button, Card, List } from "antd";

interface IListPostProps {
  data: object[];
  id: string;
  type?: string;
  setData?: () => void;
  deleteArticle?: (id: string) => void;
  deleteDraft?: (id: string) => void;
  handleReadMore?: () => void;
}
const ListPost: FC<IListPostProps> = ({
  data,
  id,
  type,
  setData,
  deleteArticle,
  deleteDraft,
  handleReadMore,
}) => {
  const [isList, setList] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const changeLayout = () => {
    setList(!isList);
  };

  useEffect(() => {
    if (data?.length < 5) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [data]);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
      window.addEventListener("resize", (event) => {
        if (window.innerWidth <= 768) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      });
    }
  }, []);
  return (
    <div className="list-post-container">
      <div className="list-post-content">
        <div className="list-post-content-header">
          <div className="list-post-topic">
            <p>{id}</p>
          </div>
          <div
            className="list-post-sort"
            style={{ display: isMobile ? "none" : "" }}
          >
            <div onClick={changeLayout}>
              {!isList ? <IconListSort /> : <IconListSortActive />}
            </div>
            <div onClick={changeLayout}>
              {isList ? <IconCardSort /> : <IconCardSortActive />}
            </div>
          </div>
        </div>
        <div className="list-post-content-center">
          {isList ? (
            data?.map((value, index) => (
              <PostCardHorizontal
                data={value}
                key={index}
                type={type}
                setData={setData}
                deleteArticle={deleteArticle}
                deleteDraft={deleteDraft}
              />
            ))
          ) : (
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <PostCard data={item} type={type} />
                </List.Item>
              )}
            />
          )}
        </div>
      </div>
      {isVisible && (
        <div className="list-post-footer">
          <Button type="primary" ghost onClick={handleReadMore}>
            Xem thêm
          </Button>
        </div>
      )}
    </div>
  );
};
export default memo(ListPost);
