import { memo } from "react";
import { notification } from "antd";

const PopupNoti = () => {
    const openNotification = (placement) => {
        api.info({
          message: `Notification ${placement}`,
          description: 'Toan',
          placement,
        });
      };
    return (
        <div className=""></div>
    )
}
export default memo(PopupNoti)