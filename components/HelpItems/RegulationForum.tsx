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
            <p>2. Quy định về bài viết</p>
            <span>Mỗi bài viết đều phải đáp ứng những tiêu chuẩn về bài viết trên nền tảng. Nếu vi phạm những tiêu chuẩn này thì tác giả có thể bị hạn chế tài khoản, cấm đăng bài và tạm ngưng tài khoản.</span>
            <span> Một số nội dung vi phạm về bài viết:</span>
            <ul>
              <li>Đe dọa bạo lực.</li>
              <li>Nội dung căm thù.</li>
              <li>Quấy rối.</li>
              <li>Quyền riêng tư.</li>
              <li>Nội dung hình ảnh vi phạm thuần phong mỹ tục của Việt Nam.</li>
              <li>Bóc lột trẻ vị thành niên.</li>
              <li>Vi phạm bản quyền.</li>
              <li>Hành vi lừa đảo.</li>
              <li>Quảng cáo, khuyến mại, tiếp thị.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(RegulationForum);
