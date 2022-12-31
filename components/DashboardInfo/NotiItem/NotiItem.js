import { memo, useState } from "react";
import NotiItemDetail from "./NotiItemDetail";
import Image from "next/image";
const NotiItem = ({ content }) => {
  const [viewDetail, setViewDetail] = useState(false);
  console.log(content);
  return (
    <>
      <div className="post-card-horizontal-container">
        <div className="post-card-horizontal-image">
          <Image
            src={content.thumbnail}
            width={282}
            height={175}
            layout="responsive"
            alt="post-image"
          />
        </div>
        <div className="post-card-horizontal-content">
          <div className="notification-item">
            <div className="notification-title">{content.message}</div>
            <div className="notification-content">
              {content.type === "error" && (
                <div
                  className="view-detail"
                  onClick={() => setViewDetail(!viewDetail)}
                >
                  {viewDetail ? "Ẩn" : "Xem chi tiết"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {viewDetail && <NotiItemDetail content={content} />}
    </>
  );
};
export default memo(NotiItem);
