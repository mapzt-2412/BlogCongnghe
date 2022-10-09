import { Input } from "antd";
import Search from "antd/lib/transfer/search";
import React, { memo } from "react";
import AvatarDefaultSmall from "../../assets/icon/AvatarDefaultSmall";
import IconUploadArticle from "../../assets/icon/IconUploadArticle";

const DashboardInfo = () => {
  const onSearch = (value: string) => console.log(value);
  return (
    <div className="list-post-container">
      <div className="list-post-content">
        <div className="list-post-content-header">
          <div className="list-post-topic">
            <p>THÔNG TIN CÁ NHÂN</p>
          </div>
          {/* <div className="list-post-sort search-field">
            <Search
              placeholder="Tìm nhanh"
              onSearch={onSearch}
              style={{ width: 100 }}
            />
          </div> */}
        </div>
        <div className="dashboard-info-center">
          <div className="dashboard-info">
            {/* <div className="followerCard">
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
            </div> */}
            <div className="dashboard-info-username">
              <p>Họ và tên</p>
              <Input />
            </div>
            <div className="dashboard-info-username">
              <p>Ngày sinh</p>
              <Input />
            </div>
            <div className="dashboard-info-username">
              <p>Điện thoại</p>
              <Input />
            </div>
            <div className="dashboard-info-username">
              <p>Địa chỉ</p>
              <Input />
            </div>
          </div>
          <div className="dashboard-info-btn">
            <button>LƯU THAY ĐỔI</button>
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

export default memo(DashboardInfo);