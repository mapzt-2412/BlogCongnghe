import React, { memo } from "react";

const NegotiateService = () => {
  return (
    <>
      <div className="list-post-container">
        <div className="list-post-content">
          <div className="list-post-content-header">
            <div className="list-post-topic">
              <p>THỎA THUẬN CUNG CẤP VÀ SỬ DỤNG DỊCH VỤ</p>
            </div>
          </div>
          <div className="list-post-content-body">
            <p>1. Mục đích, nội dung dịch vụ</p>
            <ul>
                <li>Mạng xã hội BeKaBlog là nơi thành viên chia sẻ, trao đổi thông tin về khoa học và công nghệ về các xu hướng, thiết bị, công cụ khoa học và công nghệ.</li>
                <li>Mạng xã hội BeKaBlog là nơi thành viên giới thiệu, tìm hiểu, chia sẻ, trao đổi
thông tin về các sản phẩm khoa học công nghệ mới trên thị trường Việt Nam và
thế giới.</li>
            </ul>
            <p>2. Điều khoản sử dụng</p>
            <ul>
              <li>Để truy cập và sử dụng Dịch vụ MXH BeKaBlog, thành viên phải đồng ý và tuân
theo các điều khoản được quy định tại thỏa thuận này và quy định, quy chế mà MXH
BeKaBlog liên kết, tích hợp, bao gồm.</li>
              <li>Khi truy cập, sử dụng MXH BeKaBlog bằng bất cứ phương tiện (máy tính, điện thoại,
tivi, thiết bị kết nối Internet) hoặc sử dụng ứng dụng MXH BeKaBlog thì thành viên cũng
phải tuân theo quy chế này.</li>
              <li>Để đáp ứng nhu cầu sử dụng của thành viên, MXH BeKaBlog không ngừng hoàn
thiện và phát triển, vì vậy các điều khoản quy định tại Thỏa thuận cung cấp và sử dụng
dịch vụ MXH BeKaBlog có thể được cập nhật, chỉnh sửa bất cứ lúc nào mà không cần phải
thông báo trước tới thành viên. MXH BeKaBlog sẽ công bố rõ trên Website, diễn đàn về những thay đổi, bổ sung đó.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(NegotiateService);
