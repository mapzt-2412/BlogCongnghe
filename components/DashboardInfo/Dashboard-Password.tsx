import { Input } from "antd";
import Search from "antd/lib/transfer/search";
import React, { memo, useState } from "react";
import AvatarDefaultSmall from "../../assets/icon/AvatarDefaultSmall";
import IconUploadArticle from "../../assets/icon/IconUploadArticle";
import PropertiesService from "../../services/properties.service";

const DashboardPassword = () => {
  const [data, setData] = useState();
  const onSearch = (value: string) => console.log(value);

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
    // console.log(data)
  }

  const handleChangePassword = () => {
    if(data?.email !== "") {
      PropertiesService.requestResetPassword(data).then((data) => {
        console.log(data)
      })
    }
  }

  return (
    <div className="list-post-container">
      <div className="list-post-content">
        <div className="list-post-content-header">
          <div className="list-post-topic">
            <p>ĐỔI MẬT KHẨU</p>
          </div>
          {/* <div className="list-post-sort search-field">
            <Search
              placeholder="Tìm nhanh"
              onSearch={onSearch}
              style={{ width: 100 }}
            />
          </div> */}
        </div>
        <div className="dashboard-info-center" style={{width: "60%", margin: "0 auto"}}>
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
            {/* <div className="dashboard-info-username">
              <p>Mật khẩu hiện tại</p>
              <Input.Password type="password" className="dashboard-password" />
            </div>
            <div className="dashboard-info-username">
              <p>Mật khẩu mới</p>
              <Input.Password type="password" className="dashboard-password" />
            </div>
            <div className="dashboard-info-username">
              <p>Xác nhận mật khẩu mới</p>
              <Input.Password type="password" className="dashboard-password" />
            </div> */}
            <div className="dashboard-info-username">
              <p>Nhập email</p>
              <Input
                type="text"
                placeholder="Email"
                // value={formValues.username}
                onChange={handleChange}
                name="email"
                required
              />
            </div>
          </div>
          <div className="dashboard-info-btn">
            <button onClick={handleChangePassword}>Đổi mật khẩu</button>
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

export default memo(DashboardPassword);
