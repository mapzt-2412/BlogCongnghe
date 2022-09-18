import { Select, Input, Row, Col } from "antd";
import React, { memo, useState } from "react";
import Path from "../components/Path";
import IconContent from "./../assets/icon/IconContent";
import IconRating from "./../assets/icon/IconRating";
import IconMovie from "./../assets/icon/IconMovie";
import IconTable from "./../assets/icon/IconTable";
import IconPoll from "./../assets/icon/IconPoll";
import IconMap from "./../assets/icon/IconMap";
import IconQuestion from "./../assets/icon/IconQuestion";
import IconLink from "./../assets/icon/IconLink";
import IconCancel from "./../assets/icon/IconCancel";
import Content from "../components/CreatePost/Content";
import Chart from "../components/CreatePost/Chart";
import dynamic from "next/dynamic";
import Quiz from "../components/CreatePost/Quiz";
import Vote from "../components/CreatePost/Vote";
import { SortableList, ItemRenderProps, SortableItemProps } from "@thaddeusjiang/react-sortable-list";

const { Option } = Select;
const { TextArea } = Input;

const MapBox = dynamic(() => import("../components/CreatePost/Map"), {
  ssr: false,
});

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

const CreatePost = () => {
  const [isModalChartVisible, setIsModalChartVisible] = useState(false);
  const [isModalVoteVisible, setIsModalVoteVisible] = useState(false);
  const [data, setData] = useState<SortableItemProps[]>([]);
  const [content, setContent] = useState<any[]>()

  const addData = (data) => {
    setData((pre) => [...pre, data]);
  };
  const showModalChart = () => {
    setIsModalChartVisible(true);
  };
  const showModalVote = () => {
    setIsModalVoteVisible(true);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const handleDelete = (index) => {
    const result = data.filter((value, i) => i !== index);
    setData(result);
  };
  const memu = [
    {
      lable: <IconContent />,
      title: "Nội dung",
      callBack: () =>
        addData({
          lable: <Content />,
          title: "Nội dung",
        }),
    },
    {
      lable: <IconMovie />,
      title: "Video",
    },
    {
      lable: <IconPoll />,
      title: "Bình chọn",
      callBack: () => showModalVote(),
    },
    {
      lable: <IconTable />,
      title: "Bảng",
      callBack: () => showModalChart(),
    },
    {
      lable: <IconMap />,
      title: "Bản đồ",
      callBack: () =>
        addData({
          lable: <MapBox />,
          title: "Bản đồ",
        }),
    },
    {
      lable: <IconQuestion />,
      title: "Câu hỏi",
      callBack: () =>
        addData({
          lable: <Quiz setContent={setContent} content={content}/>,
          title: "Câu hỏi",
        }),
    },
    {
      lable: <IconRating />,
      title: "Đánh giá",
    },
  ];
  let draggedItem;
  const onDragStart = (e, index) => {
    draggedItem = data[index];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  const onDragOver = (e, index) => {
    e.preventDefault();
    const draggedOverItem = data[index];

    // if the item is dragged over itself, ignore
    if (draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let items = data.filter((item) => item !== draggedItem);

    // add the dragged item after the dragged over item
    items.splice(index, 0, draggedItem);
    setData(items);
  };

  const onDragEnd = () => {
    draggedItem = null;
  };

  return (
    <div className="medium-container">
      <Path data={{ content: "Tạo bài viết" }} />
      <div className="create-post-container">
        <Chart
          isModalChartVisible={isModalChartVisible}
          setIsModalChartVisible={setIsModalChartVisible}
          addData={addData}
        />
        <Vote
          isModalVoteVisible={isModalVoteVisible}
          setIsModalVoteVisible={setIsModalVoteVisible}
          addData={addData}
        />
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
                style={{ width: "100%" }}
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
                style={{ width: "100%" }}
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
              <TextArea
                rows={2}
                placeholder="Vui lòng nhập tiêu đề"
                maxLength={200}
              />
            </div>
          </div>
          <div className="create-post-content-item">
            <div className="create-post-content-left">Mô tả</div>
            <div className="create-post-content-right">
              <TextArea
                rows={4}
                placeholder="Mô tả sẽ được xuất hiện trong kết quả tìm kiếm"
                maxLength={200}
              />
            </div>
          </div>
          <ul onDragOver={(e) => e.preventDefault}>
            {data.map((value, index) => (
              value && <li key={index} onDragOver={(e) => onDragOver(e, index)}>
                <div
                  className="create-post-content-item item"
                  key={index}
                  draggable
                  onDragStart={(e) => onDragStart(e, index)}
                  onDragEnd={onDragEnd}
                > 
                  <div className="create-post-content-title">{value?.title}</div>
                  {value?.lable}
                  <div
                    className="delete-item"
                    onClick={() => handleDelete(index)}
                  >
                    {" "}
                    <IconCancel />{" "}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="create-post-memu">
          <div className="create-post-memu-title">THÊM TIỆN ÍCH</div>
          <div className="create-post-memu-content">
            <Row gutter={[16, 16]}>
              {memu.map((value, index) => (
                <Col className="create-post-memu-item" span={12} key={index}>
                  <div className="memu-item-icon-wrapper">
                    <div className="memu-item-icon" onClick={value.callBack}>
                      {value.lable}
                    </div>
                    <p>{value.title}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(CreatePost);
