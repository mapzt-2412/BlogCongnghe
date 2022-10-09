import Search from "antd/lib/transfer/search";
import React, { memo, useState, useEffect } from "react";
import AvatarDefaultSmall from "../../assets/icon/AvatarDefaultSmall";
import PropertiesService from "../../services/properties.service";
import { getToken } from "../../libs/common";

const Follower = ({type}) => {
  const [data, setData] = useState();
  
  useEffect(() => {
    if(type === "2"){
      PropertiesService.getFollowed(getToken()).then((data) => setData(data.data.data))
    }else if(type === "3"){
      PropertiesService.getFollowing(getToken()).then((data) => setData(data.data.data))
    }
    
  },[type])
  const onSearch = (value: string) => console.log(value);
  console.log(data)
  return (
    <div className="list-post-container">
      <div className="list-post-content">
        <div className="list-post-content-header">
          <div className="list-post-topic">
            <p>NGƯỜI THEO DÕI ({data?.length})</p>
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
            {
              data?.map((value, index) => (
                <div className="followerCard">
                <div className="followerCard-info">
                  <AvatarDefaultSmall width={72} height={72}/>
                  <div className="followerCard-details">
                    <p className="details-name">{ value?.nickname }</p>
                    <p>
                      <span>Cấp độ:</span> Chuyên gia
                    </p>
                  </div>
                </div>
                {
                    type === "2" && <button className="btn-subcribe">Theo dõi</button>
                }
                
              </div>
              ))
            }
            
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
