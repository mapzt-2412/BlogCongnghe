import React, { useEffect, useState } from "react";
import { memo } from "react";
import { getToken } from "../../libs/common";
import notificationService from "../../services/notification.service";
import NotiItem from "./NotiItem/NotiItem";
import Image from "next/image";
const NotificationArticle = () => {
  const [noti, setNoti] = useState([]);

  useEffect(() => {
    notificationService.getNotifications(getToken()).then((data) => {
      setNoti(data.data.data);
    });
  }, []);

  return (
    <>
      <div className="list-post-content-header">
        <div className="list-post-topic">
          <p>Thông báo về bài viết</p>
        </div>
      </div>
      {noti?.map((value, index) => (
        <div className="noti-container" key={index}>
          <NotiItem content={JSON.parse(value?.content)}/>
        </div>
      ))}
    </>
  );
};
export default memo(NotificationArticle);
