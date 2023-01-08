import React from "react";
import { memo, useState, useCallback, useEffect } from "react";
import dashboard from "..";
import ListShortVideo from "../../../../components/ShortVideo/ListShortVideo";
import { getToken } from "../../../../libs/common";
import propertiesService from "../../../../services/properties.service";

const ShortVideo = () => {
  const [data, setData] = useState<any>();
  const [page, setPage] = useState(1);
  const getStory = useCallback(() => {
    propertiesService
      .getStory({ page: page, limit: 1 }, getToken())
      .then((data) =>
        setData(data.data.data.myStories)
      );
  }, [page]);
  useEffect(() => {
    getStory();
  }, [getStory]);
  return (
    <>
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
            type={'dashboard'}
          />
        </div>
      </div>
    </>
  );
};
export default memo(ShortVideo);
