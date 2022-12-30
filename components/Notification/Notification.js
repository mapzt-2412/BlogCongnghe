import { Popover, Button } from "antd";
import { memo, useEffect, useState } from "react";
import { getToken } from "../../libs/common";
import NotificationService from "../../services/notification.service";

const Notification = () => {
  const [listNoti, setListNoti] = useState();
  useEffect(() => {
    NotificationService.getNotifications(getToken()).then((data) => {
      setListNoti(data.data.data);
    });
  }, []);
  return (
    <div className="noti-wrapper">
      {listNoti?.map((value, index) => (
        <div className="noti-item" key={index}>
          {JSON.parse(value.content).type === "success" ? (
            <>
              <div className="noti-item-title success">
                {JSON.parse(value.content).message}
              </div>
            </>
          ) : (
            <>
              <div className="noti-item-title error">
                {JSON.parse(value.content).message}
              </div>
            </>
          )}
          {
            !JSON.parse(value.content).read && <div className="noti-item-seen"></div>
          }
        </div>
      ))}
    </div>
  );
};
export default Notification;
