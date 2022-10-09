import React from "react";
import { memo, useState, useEffect } from "react";
import IconCardSort from "../../assets/icon/IconCardSort";
import IconListSort from "../../assets/icon/IconListSort";
import IconCardSortActive from "../../assets/icon/IconCardSortActive";
import IconListSortActive from "../../assets/icon/IconListSortActive";
import PostCardHorizontal from "./PostCard/PostCardHorizontal";
import PostCard from "./PostCard/PostCard";
import { Button, Card, List  } from "antd";
import PropertiesService from "../../services/properties.service";

const ListPost = ({data, id}) => {
  const [isList , setList] = useState(true);
  const changeLayout = () => {
    setList(!isList);
  }
  return (
    <div className="list-post-container">
      <div className="list-post-content">
        <div className="list-post-content-header">
          <div className="list-post-topic">
            <p>{id}</p>
          </div>
          <div className="list-post-sort">
            <div onClick={changeLayout}>
              {
                !isList ? <IconListSort /> : <IconListSortActive />
              }
              
            </div>
            <div onClick={changeLayout}>
              {
                isList ? <IconCardSort /> : <IconCardSortActive />
              }
            </div>
          </div>
        </div>
        <div className="list-post-content-center">
          {
            isList ? 
            data?.map((value, index) => (
              <PostCardHorizontal data={value} key={index} />
            ))
            :
            <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <PostCard data={item}/>
              </List.Item>
            )}
          />
          }
        </div>
      </div>
      <div className="list-post-footer">
        <Button type="primary" ghost>
          Xem thêm
        </Button>
      </div>
    </div>
  );
};
export default memo(ListPost);
