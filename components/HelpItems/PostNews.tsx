import React, { memo } from "react";

const PostNews = () => {
  return (
    <>
      <div className="list-post-container">
        <div className="list-post-content">
          <div className="list-post-content-header">
            <div className="list-post-topic">
              <p>VỀ VIỆC ĐƯA TIN TRÊN DIỄN ĐÀN</p>
            </div>
          </div>
          <div className="list-post-content-body">
            <p>1. Không spam bài, up bài.</p>
            <p>2. Không gửi bài với nội dung bóc tem, xé tem, tem,...</p>
            <p>3. Không gửi một nội dung ở nhiều nơi.</p>
            <p>4. Không chửi nhau, xúc phạm nhau (sẽ bị xử lý nặng).</p>
            <p>5. Trước khi viết bài vui lòng xem qua diễn đàn xem đã đề cập chưa.</p>
            <p>6. Không được chia sẻ, phổ biến nội dung vi phạm bản quyền, các phần mềm cr@ck, ha@ck, key phần mềm, và cũng không được đăng bài xin các nội dung này.</p>
            <p>7. Không gửi bài activate hộ các phần mềm Windows, Office.</p>
            <p>8. Không được gửi bài xin key, xin phần mềm.</p>
            <p>9. Không được gửi bài cho key, cho phần mềm, chia sẻ key, ngoại trừ trường hợp Developer cần tặng phần mềm vui lòng liên hệ và phải được sự cho phép của BQT.</p>
            <p>10. Đối với các chuyên mục có sẵn mẫu, thành viên phải gởi bài theo mẫu qui định.</p>
            <p>11. Khi muốn cám ơn người gởi bài, chỉ cần nhấn nút lệnh “Thích".</p>
            <p>12. Bài trả lời không lạc đề, phải có tính xây dựng, nội dung rõ ràng.</p>
            <p>13. Thành viên Không được tự ý gửi bài viết có nội dung Khuyến mãi, Khuyến mại, hỗ trợ khách hàng tại tất cả các khu vực trên Diễn đàn mà chưa được phép của Ban Quản Trị. Tất cả các bài thuộc loại này muốn đưa lên Diễn đàn hay trang tin thành viên phải liên hệ với Ban Quản Trị để được hỗ trợ, xử lý.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(PostNews);
