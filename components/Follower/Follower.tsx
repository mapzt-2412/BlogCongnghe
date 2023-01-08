import Search from "antd/lib/transfer/search";
import React, { memo, useState, useEffect, useCallback } from "react";
import AvatarDefaultSmall from "../../assets/icon/AvatarDefaultSmall";
import PropertiesService from "../../services/properties.service";
import { getToken, renderLevel } from "../../libs/common";
import Router from "next/router";
import userService from "../../services/user.service";

const Follower = ({ type }) => {
  const [data, setData] = useState();

  useEffect(() => {
    if (type === "2") {
      PropertiesService.getFollowed(getToken()).then((data) =>
        setData(data.data.data.follower)
      );
    } else if (type === "3") {
      PropertiesService.getFollowing(getToken()).then((data) =>
        setData(data.data.data.userFollowed)
      );
    }
  }, [type]);
  const onSearch = (value: string) => console.log(value);

  const handleUnFollow = useCallback((id) => {
    userService
      .userUnFollow({ userFollowedId: id }, getToken())
      .then((data) =>
        PropertiesService.getFollowing(getToken()).then((data) =>
          setData(data.data.data.userFollowed)
        )
      );
  }, []);
  return (
    <div className="list-post-container">
      <div className="list-post-content">
        <div className="list-post-content-header">
          <div className="list-post-topic">
            {type === "2" ? (<p>NGƯỜI ĐANG THEO DÕI ({console.log(data)})</p>) : (<p>NGƯỜI THEO DÕI ({console.log(data)})</p>)}
            
          </div>
          {/* <div className="list-post-sort search-field">
            <Search
              placeholder="Tìm nhanh"
              onSearch={onSearch}
              style={{ width: 100 }}
            />
          </div> */}
        </div>
        <div className="list-post-content-center">
          <div className="followerCard-Group">
            {data?.map((value, index) => (
              <div className="followerCard" key={index}>
                <div className="followerCard-info">
                  <AvatarDefaultSmall width={72} height={72} />
                  <div
                    className="followerCard-details"
                    onClick={() => Router.push(`/${value.id}`)}
                  >
                    <p className="details-name">{value?.nickname}</p>
                    <p>
                      <span>Cấp độ:</span> {renderLevel(value.score)}
                    </p>
                  </div>
                </div>
                {type === "3" && (
                  <button
                    className="btn-subcribe"
                    onClick={() => handleUnFollow(value.id)}
                  >
                    Bỏ theo dõi
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="list-post-footer">
          <Button type="primary" ghost>
            Xem thêm
          </Button>
        </div> */}
    </div>
  );
};

export default memo(Follower);
