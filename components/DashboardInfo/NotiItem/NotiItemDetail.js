import { memo } from "react";
import Image from "next/image";
const NotiItemDetail = ({ content }) => {
  console.log(content);
  return (
    <div className="noti-item-detail-container">
    <div className="title">Nguyên nhân duyệt bài không thành công</div>
      {content.result?.map((value, index) => (
        <div key={index}>
          {value.type === "Image fault" &&
            value.result?.map((value, index) => (
              <>
                <div className="sub-title">Hình ảnh vi phạm</div>
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
        </div>
      ))}
    </div>
  );
};
export default memo(NotiItemDetail);
