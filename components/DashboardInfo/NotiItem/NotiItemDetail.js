import { memo } from "react";
import Image from "next/image";
const NotiItemDetail = ({ content }) => {
  console.log(content);
  return (
    <div className="noti-item-detail-container">
      {/* <div className="title">Nguyên nhân duyệt bài không thành công</div> */}
      {content.result?.map((value, index) => (
        <div key={index}>
          {value.type === "Image fault" &&
            value.result?.map((value, index) => (
              <>
                {/* <div className="sub-title">Hình ảnh vi phạm</div> */}
                <div className="noti-item-detail image-fault" key={index}>
                  <div className="image-fault-image">
                    <Image
                      src={value.link}
                      layout="responsive"
                      width={300}
                      height={200}
                      alt=""
                    />
                  </div>
                  <div className="image-fault-title">
                    Ảnh thuộc phạm vi bị cấm: {value.prediction}
                  </div>
                </div>
              </>
            ))}
          {value.type === "Copyright fault" && (
            <>
              {/* <div className="sub-title">Nội dung vi phạm bản quyền</div> */}
              <div className="noti-item-detail">
                <div className="noti-item-detail-title">
                  {`Mức độ tương đồng ${value.result?.score}%`}
                </div>
                <div className="noti-item-detail-content">
                  <div className="label">Danh sách bài viết gốc</div>
                  <ul key={index}>
                    {value.result?.sources.map((value, index) => (
                      <li key={index}>{value}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
          {value.type === "Video fault" &&
            value.result?.map((value, index) => (
              <>
                {/* <div className="sub-title"> Video vi phạm </div> */}
                <div className="noti-item-detail image-fault" key={index}>
                  <div className="image-fault-image">
                    <video src={value.link} muted controls/>
                  </div>
                  <div className="image-fault-title">
                    Video thuộc phạm vi bị cấm: {value.prediction}
                  </div>
                </div>
              </>
            ))}
            {value.type === "Bad word fault" &&
            value.result?.map((value, index) => (
              <>
                {/* <div className="sub-title"> Video vi phạm </div> */}
                <div className="noti-item-detail word-fault" key={index}>
                  {/* <div className="image-fault-image">
                    <video src={value.link} muted controls/>
                  </div> */}
                  <div className="noti-item-detail-content">
                    Từ, ngữ thuộc phạm vi bị cấm: {value}
                  </div>
                </div>
              </>
            ))}
        </div>
      ))}
    </div>
  );
};
export default memo(NotiItemDetail);
