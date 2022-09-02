import { Select, Input, Row, Col } from "antd";
import React, { memo } from "react";
import Path from "../components/Path";
import IconContent from './../assets/icon/IconContent';
import IconRating from './../assets/icon/IconRating';
import IconMovie from './../assets/icon/IconMovie';
import IconTable from './../assets/icon/IconTable';
import IconPoll from './../assets/icon/IconPoll';
import IconMap from './../assets/icon/IconMap';
import IconQuestion from './../assets/icon/IconQuestion';
import IconLink from './../assets/icon/IconLink';
import IconCancel from './../assets/icon/IconCancel';
import Content from "../components/CreatePost/Content";

const { Option } = Select;
const { TextArea } = Input;

const topic = [
  "TECHNOLOGY",
  "PROGRAMMING",
  "CRYPTOCURRENCY",
  "PYTHON",
  "JAVASCRIPT",
  "BLOCKCHAIN",
  "GAMING",
  "AI",
  "REACT",
  "SECURITY",
  "SOFTWARE DEVELOPMENT",
  "MACHINE LEARNING",
  "REVIEWS",
];

const memu =[
  {
    lable: <IconContent/>,
    title: "Nội dung",
  },
  {
    lable: <IconMovie/>,
    title: "Video",
  },
  {
    lable: <IconPoll/>,
    title: "Bình chọn",
  },
  {
    lable: <IconTable/>,
    title: "Bảng",
  },
  {
    lable: <IconMap/>,
    title: "Bảng đồ",
  },
  {
    lable: <IconQuestion/>,
    title: "Câu hỏi",
  },
  {
    lable: <IconRating/>,
    title: "Đánh giá",
  },
]
const CreatePost = () => {
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  return (
    <div className="medium-container">
      <Path data={{ content: "Tạo bài viết" }} />
      <div className="create-post-container">
      <div className="create-post-content">
        <div className="create-post-content-item">
          <div className="create-post-content-left">Chủ đề</div>
          <div className="create-post-content-right">
            <Select
              showSearch
              placeholder="Chọn chủ đề cho bài viết của bạn"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              style={{ width: '100%' }}
              filterOption={(input, option) =>
                (option!.children as unknown as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {topic.map((value, index) => (
                <Option value={value} key={index}>
                  {value}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="create-post-content-item">
          <div className="create-post-content-left">Tag</div>
          <div className="create-post-content-right">
            <Select
              mode="multiple"
              allowClear
              placeholder="Hãy gắn tag cho bài viết của bạn"
              style={{ width: '100%' }}
              onChange={onChange}
            >
              {topic.map((value, index) => (
                <Option value={value} key={index}>
                  {value}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="create-post-content-item">
            <div className="create-post-content-left">Tiêu đề</div>
            <div className="create-post-content-right">
            <TextArea rows={2} placeholder="Vui lòng nhập tiêu đề" maxLength={200} />
            </div>
        </div>
        <div className="create-post-content-item">
            <div className="create-post-content-left">Mô tả</div>
            <div className="create-post-content-right">
            <TextArea rows={4} placeholder="Mô tả sẽ được xuất hiện trong kết quả tìm kiếm" maxLength={200} />
            </div>
        </div>
        <div className="create-post-content-item item">
          <div className = "create-post-content-title">
            Nội dung
          </div>
          <Content/>
          <div className="delete-item"> <IconCancel/> </div>
        </div>
      </div>
        <div className="create-post-memu">
            <div className="create-post-memu-title">
                THÊM TIỆN ÍCH
            </div>
            <div className="create-post-memu-content">
                <Row gutter={[16, 16]}>
                  {
                    memu.map((value, index) => 
                    (
                      <Col className="create-post-memu-item" span={12} key={index}>
                        <div className="memu-item-icon-wrapper">
                          <div className="memu-item-icon" >{ value.lable }</div>
                          <p>{value.title}</p>
                        </div>
                    </Col>
                    ))
                  }
                </Row>
            </div>
        </div>
      </div>
    </div>
  );
};
export default memo(CreatePost);
