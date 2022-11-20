import { Input, message } from "antd";
import Search from "antd/lib/transfer/search";
import React, { memo, useEffect, useState } from "react";
import AvatarDefaultSmall from "../../assets/icon/AvatarDefaultSmall";
import IconUploadArticle from "../../assets/icon/IconUploadArticle";
import { getToken } from "../../libs/common";
import UploadImage from "../CreatePost/UploadImage";
import PropertiesService from "../../services/properties.service";
import { Router } from "next/router";
import { ROUTE_DASHBOARD } from "../../libs/constants";

const DashboardInfo = () => {
  const onSearch = (value: string) => console.log(value);
  const [reqData, setReqData] = useState({
    nickname: "",
    phone: "",
    avatar: "",
    description: "",
    username:""
  });
  const [token, setToken] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    if (getToken()) {
      setToken(getToken());
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      PropertiesService.getProfile(token).then((data) =>
        setData(data.data.data)
      );
    }
  }, [token]);

  const handleChangeThumbnail = (value) => {
    setReqData({
      ...reqData,
      avatar: value,
    });
    // if(value) {
    //   document.getElementById("avatar-data")?.style.fontSize(small);
    // }
  };

  const handleChange = (e) => {
    setReqData({ ...reqData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (data) => {
      PropertiesService.updateUserInfo(data,getToken()).then((data) => {
        if(data){
          message.success('Thông tin đã được cập nhật');}
          // Router.push(ROUTE_DASHBOARD)}
        // setReqData(data)
        // message.success('Thông tin đã được cập nhật');
        
        // console.log("canh")
    })
    
  }
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
              <p>Tên đăng nhập</p>
              <Input
                // value={data?.nickname}
                onChange={handleChange}
                name="username"
              />
            </div>
            {data?.username ? (<><p>{data?.username}</p></>)
             : (<><p>Chưa có dữ liệu</p></>)}
            <div className="dashboard-info-username">
              <p>Biệt danh</p>
              <Input
                // value={data?.nickname}
                onChange={handleChange}
                name="nickname"
              />
            </div>
            {data?.nickname ? (<><p>{data?.nickname}</p></>)
             : (<><p>Chưa có dữ liệu</p></>)}
            <div className="dashboard-info-username">
              <p>Điện thoại</p>
              <Input onChange={handleChange} name="phone" />
            </div>
            {data?.phone ? (<><p>{data?.phone}</p></>)
             : (<><p>Chưa có dữ liệu</p></>)}
            <div className="dashboard-info-username">
              <p>Mô tả</p>
              <Input

                onChange={handleChange}
                name="description"
              />
            </div>
            {data?.description ? (<><p>{data?.description}</p></>)
             : (<><p>Chưa có dữ liệu</p></>)}
            <UploadImage handleChangeThumbnail={handleChangeThumbnail} />
            {/* {data?.avatar ? (<><p>{data?.avatar}</p></>)
             : (<><p>Chưa có dữ liệu</p></>)} */}
          </div>
          <div className="dashboard-info-btn">
            <button onClick={() => handleSubmit(reqData)}>LƯU THAY ĐỔI</button>
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
