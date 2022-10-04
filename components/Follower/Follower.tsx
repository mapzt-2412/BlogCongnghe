import Search from "antd/lib/transfer/search";
import React, { memo } from "react";
import AvatarDefaultSmall from "../../assets/icon/AvatarDefaultSmall";

const Follower = () => {
  const onSearch = (value: string) => console.log(value);
  return (
    <div className="list-post-container">
      <div className="list-post-content">
        <div className="list-post-content-header">
          <div className="list-post-topic">
            <p>NGƯỜI THEO DÕI (10)</p>
          </div>
          <div className="list-post-sort search-field">
            <Search
              placeholder="Tìm nhanh"
              onSearch={onSearch}
              style={{ width: 100 }}
            />
          </div>
        </div>
        <div className="list-post-content-center">
          <div className="followerCard-Group">
            <div className="followerCard">
              <div className="followerCard-info">
                <AvatarDefaultSmall width={72} height={72}/>
                <div className="followerCard-details">
                  <p className="details-name">Nguyễn Văn A</p>
                  <p>
                    <span>Cấp độ:</span> Chuyên gia
                  </p>
                </div>
              </div>
              <button className="btn-subcribe">Theo dõi</button>
            </div>
            <div className="followerCard">
              <div className="followerCard-info">
                <AvatarDefaultSmall width={72} height={72}/>
                <div className="followerCard-details">
                  <p className="details-name">Nguyễn Văn A</p>
                  <p>
                    <span>Cấp độ:</span> Chuyên gia
                  </p>
                </div>
              </div>
              <button className="btn-subcribe">Theo dõi</button>
            </div>
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
