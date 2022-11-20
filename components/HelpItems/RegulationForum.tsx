import React, { memo } from "react";

const RegulationForum = () => {
  return (
    <>
      <div className="list-post-container">
        <div className="list-post-content">
          <div className="list-post-content-header">
            <div className="list-post-topic">
              <p>NỘI QUY DIỄN ĐÀN</p>
            </div>
          </div>
          <div className="list-post-content-body">
            <p>1. Quy định về duyệt bài</p>
            <ul>
                <li>Tên và tiêu đề bài viết phải phù hợp với nội dung bài viết các nội dung liên kết không chứa nội dung lừa đảo.</li>
                <li>Nội dung bài viết không được chứa nội dung người lớn. Không có hình ảnh khỏa thân, khiêu dâm trong bài viết. Không được có những liên kết đến những trang người lớn trong bài viết.</li>
                <li>Bài viết không được chứa nội dung quảng bá cờ bạc trực tuyến. Không được có những liên kết đến những trang web bài bạc cá độ.</li>
                <li>Chỉ chấp nhận 2 loại ngôn ngữ tiếng việt và tiếng anh.</li>
                <li>Không được có nội dung sao chép từ những nội dung mà bạn không có quyền sử dụng.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(RegulationForum);
