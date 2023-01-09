import React from "react";
import { memo, useState, useCallback, useEffect } from "react";
import dashboard from "..";
import ListShortVideo from "../../../../components/ShortVideo/ListShortVideo";
import { getToken } from "../../../../libs/common";
import propertiesService from "../../../../services/properties.service";
import { Context } from "./Context";

const ShortVideo = () => {
  const [data, setData] = useState<any>();
  const [page, setPage] = useState(1);
  const [myInfor, setMyInfor] = useState();
  const [id, setId] = useState(0);
  const getStory = useCallback(() => {
    propertiesService
      .getStory({ page: page, limit: 4 }, getToken())
      .then((data) => {
        setData(data.data.data.myStories);
        setMyInfor(data.data.data.myInfo);
      });
  }, [page]);
  const handleChangeId = useCallback((id) => {
    setId(id);
  }, []);
  const deleteArticle = useCallback(() => {
    if (id) {
      propertiesService
        .deleteArticle({ articleId: id }, getToken())
        .then((data) => getStory());
    }
  }, [getStory, id]);

  useEffect(() => {
    getStory();
  }, [getStory]);
  return (
    <Context.Provider value={{ deleteArticle, handleChangeId, id }}>
      <div className="list-post-container">
        <div className="list-post-content">
          <div className="list-post-content-header">
            <div className="list-post-topic">
              <p>Danh sách bảng tin đã đăng</p>
            </div>
          </div>
          <ListShortVideo
            data={data}
            page={page}
            setPage={setPage}
            getStory={getStory}
            type={"dashboard"}
            myInfor={myInfor}
          />
        </div>
      </div>
    </Context.Provider>
  );
};
export default memo(ShortVideo);
