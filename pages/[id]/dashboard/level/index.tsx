import React from "react";
import { memo } from "react";
import { renderLevel } from "../../../../libs/common";

const Level = ({ level }) => {
  return (
    <div className="list-post-container">
      <div className="list-post-content">
        <div className="list-post-content-header">
          <div className="list-post-topic">
            <p>Cấp độ người dùng</p>
          </div>
        </div>
        <div className="dashboard-info-center">
          <div className="dashboard-item">
            <div className="dashboard-item-title">Cấp độ:</div>
            <div className="dashboard-item-content">
              {renderLevel(level?.userScore)}
            </div>
          </div>
          <div className="dashboard-item">
            <div className="dashboard-item-title">Số điểm thành viên:</div>
            <div className="dashboard-item-content">{level?.userScore}</div>
          </div>
          <div className="dashboard-item">
            <div className="dashboard-item-title">Số lượt bài viết:</div>
            <div className="dashboard-item-content">{level?.articleNum}</div>
          </div>
          <div className="dashboard-item">
            <div className="dashboard-item-title">Số lượt thích:</div>
            <div className="dashboard-item-content">{level?.likeNum}</div>
          </div>
          <div className="dashboard-item">
            <div className="dashboard-item-title">Số lượt bình luận:</div>
            <div className="dashboard-item-content">{level?.commentNum}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Level);
