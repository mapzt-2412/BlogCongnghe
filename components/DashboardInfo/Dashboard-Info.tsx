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
    username: "",
  });

  useEffect(() => {
    if (getToken) {
      PropertiesService.getProfile(getToken()).then((data) =>
        setReqData(data.data.data)
      );
    }
  }, []);

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
    PropertiesService.updateUserInfo(data, getToken()).then((data) => {
      if (data) {
        message.success("Thông tin đã được cập nhật");
      }
      // Router.push(ROUTE_DASHBOARD)}
      // setReqData(data)
      // message.success('Thông tin đã được cập nhật');

      // console.log("canh")
    });
  };
  return (
    <div className="list-post-container">
      <div className="list-post-content">
        <div className="list-post-content-header">
          <div className="list-post-topic">
            <p>THÔNG TIN CÁ NHÂN</p>
          </div>
        </div>
        <div className="dashboard-info-center">
          <div className="dashboard-info">
            <div className="dashboard-info-username">
              <p>Tên đăng nhập</p>
              <Input
                // value={data?.nickname}
                onChange={handleChange}
                name="username"
                value={reqData?.username}
              />
            </div>
            <div className="dashboard-info-username">
              <p>Biệt danh</p>
              <Input
                // value={data?.nickname}
                onChange={handleChange}
                name="nickname"
                value={reqData?.nickname}
              />
            </div>
            <div className="dashboard-info-username">
              <p>Điện thoại</p>
              <Input
                onChange={handleChange}
                name="phone"
                value={reqData?.phone}
              />
            </div>
            <div className="dashboard-info-username">
              <p>Mô tả</p>
              <Input
                onChange={handleChange}
                name="description"
                value={reqData?.description}
              />
            </div>
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
