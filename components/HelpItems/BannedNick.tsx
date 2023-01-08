import React, { memo } from "react";

const BannedNick = () => {
  return (
    <>
      <div className="list-post-container">
        <div className="list-post-content">
          <div className="list-post-content-header">
            <div className="list-post-topic">
              <p>CHỬI NHAU, XÚC PHẠM NHAU SẼ LẬP TỨC BỊ TREO NICK</p>
            </div>
          </div>
          <div className="list-post-content-body">
            <span>- Thân chào toàn thể các thành viên BeKaBlog!</span> <br />
            <span>- Để đảm bảo mức độ tập trung thảo luận, đảm bảo tính lịch sự, văn minh, ôn hoà và khoa học trong các thảo luận, bình luận tại BeKaBlog. BQT quyết định xử phạt nặng các hành vi cố tính xúc phạm nhau, chửi nhau. Các nick gửi bài, bình luận hay gửi bất cứ nội dung nào với ý định cố tình xúc phạm nhau, chửi nhau thông qua các từ ngữ xúc phạm, chửi nhau (không phân biệt là xúc phạm hay chửi đúng sai) đều sẽ bị nhận một xử lý xử phạt vi phạm và nick sẽ bị treo ngay lập tức.</span><br />
            
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(BannedNick);
