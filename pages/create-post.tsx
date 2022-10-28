import { Select, Input, Row, Col, message } from "antd";
import React, { FC ,memo, useState, useEffect, useRef } from "react";
import Path from "../components/Path";
import PropertiesService from "./../services/properties.service";
import IconContent from "./../assets/icon/IconContent";
import IconAddDraft from "./../assets/icon/IconAddDraft";
import IconRating from "./../assets/icon/IconRating";
import IconMovie from "./../assets/icon/IconMovie";
import IconTable from "./../assets/icon/IconTable";
import IconPoll from "./../assets/icon/IconPoll";
import IconMap from "./../assets/icon/IconMap";
import IconQuestion from "./../assets/icon/IconQuestion";
import IconLink from "./../assets/icon/IconLink";
import IconCancel from "./../assets/icon/IconCancel";
import IconSaveDraft from "./../assets/icon/IconSaveDraft";
import IconUploadArticle from "./../assets/icon/IconUploadArticle";
import Content from "../components/CreatePost/Content";
import Chart from "../components/CreatePost/Chart";
import dynamic from "next/dynamic";
import Quiz from "../components/CreatePost/Quiz";
import Vote from "../components/CreatePost/Vote";
import { SortableList, ItemRenderProps, SortableItemProps } from "@thaddeusjiang/react-sortable-list";
import UploadVideo from "../components/CreatePost/UploadVideo";
import UploadImage from "../components/CreatePost/UploadImage";
import EditorWrapper from "../components/CreatePost/Editor/EditorWrapper";
import ModalConfirm from "../components/ModalConfirm/ModalConfirm";
import AreaChart from "../components/CreatePost/Chart/AreaChart";
import { getToken } from "../libs/common";
import Router, { useRouter } from 'next/router';
import Image from 'next/image';

const { Option } = Select;
const { TextArea } = Input;

const MapBox = dynamic(() => import("../components/CreatePost/Map"), {
  ssr: false,
});

const CreatePost = () => {
  const { post } = useRouter().query;
  const [isModalChartVisible, setIsModalChartVisible] = useState(false);
  const [isModalContentVisible, setIsModalContentVisible] = useState(false);
  const [isModalVoteVisible, setIsModalVoteVisible] = useState(false);
  const [isModalVideoVisible, setIsModalVideoVisible] = useState(false);
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
  const [data, setData] = useState<SortableItemProps[]>([]);
  const [dataContent, setDataContent] = useState([]);
  const [reqData, setReqData] = useState();
  const [content, setContent] = useState<any[]>();
  const [topic, setTopic] = useState([]);
  const [tag, setTag] = useState([]);
  const [dataDefault, setDataDefault] = useState();

  const renderContent = (type , data) => {
    if(type === "chart"){
      return <AreaChart dataChart = {data}/>
    }else if(type === "video"){
      return (
        <div className="video-upload">
                <video 
                src={data}
                loop
                autoPlay
                muted
                controls
                />
                </div>
      )
    }else if(type === "content"){
      return (
        <div dangerouslySetInnerHTML={{ __html: `${data}` }} className={"ck-content"}/>
      )
    }
  }
  useEffect (() => {
    PropertiesService.getTopics().then((data) => setTopic(data.data.data));
    PropertiesService.getTags().then((data) => setTag(data.data.data))
  },[])
  useEffect (() => {
    if(post){
      PropertiesService.getArticleById(post, getToken()).then((data) => 
      {
        setReqData({
          ...reqData,
          articleId: +post,
          topicId : data.data.data.topic.id,
          tags: data.data.data.tags,
          thumbnail: data.data.data.thumbnail,
          title: data.data.data.title,
          description: data.data.data.description,
          content: data.data.data.content,
        })
        if(data.data.data.content){
          JSON.parse(data.data.data.content).map((value) => {
            if(value?.type === "content"){
              addData({
                title: "Nội dung",
                lable: <EditorWrapper dataContent={value?.data}/>,
              })
            }
          })
        }
      }
      );
      
    }
  },[post])
  // const router = useRouter();
  // useEffect (()=>{
    
  //   return () => {showModalConfirm();
  //   console.log("ngu");}
  // },[])
  
  const handleSubmit = (data) => {
    if(post){
      PropertiesService.updateArticle(data,  getToken()).then((data) => {
        message.success('Lưu bài thành công'); Router.push('/')
      } )
    }else{
      PropertiesService.createArticle(data,  getToken()).then((data) => {
        message.success('Đăng bài thành công'); Router.push('/')
      } )
    }
  }
  const addData = (data) => {
    setData((pre) => [...pre, data]);
  };
  const addDataContent = (data) => {
    setDataContent((pre) => [...pre, data]);
  }
  
  const changeDataContent = (i, data) => {
    const dataValue = dataContent.findIndex((value) => value?.data.key === i);
    console.log(dataValue)
    if(dataValue !== -1){
        let arr = dataContent;
        arr[dataValue] = {
          data: data.data,
          type: data.type,
        }
      setDataContent(arr);
    }
    else{
      setDataContent((pre) => [...pre, data]);
    }
  }
  
  useEffect(() => {
    setReqData({
      ...reqData,
      content: JSON.stringify(dataContent),
    })
  },[dataContent])

  const showModalChart = () => {
    setIsModalChartVisible(true);
  };
  const showModalVote = () => {
    setIsModalVoteVisible(true);
  };
  const showModalContent = () => {
    setIsModalContentVisible(true);
  };
  const showModalVideo = () => {
    setIsModalVideoVisible(true);
  };
  const showModalConfirm = () => {
    setIsModalConfirmVisible(true);
  };

  const handleChangeTopic = (value: string) => {
    setReqData({
      ...reqData,
      topicId: value,
    })
  };
  const handleChangeTag = (value: string) => {
    setReqData({
      ...reqData,
      tags: value,
    })
  };
  const handleChangeInput = (event) => {
    setReqData({
      ...reqData,
      [event.target.name]: event.target.value,
    })
  }
  const handleChangeThumbnail = (value) => {
    setReqData({
      ...reqData,
      thumbnail: value,
    })
  }
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
      callBack: () => showModalContent(),
    },
    {
      lable: <IconMovie />,
      title: "Video",
      callBack: () => showModalVideo(),
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

  const handleKeyDown = (event) => {
    if(event.keyCode == 13){
      let tag = reqData?.tags ? reqData?.tags  : [];
      tag.push(event.target.value);
      setReqData({
        ...reqData,
        tags: tag,
      })
    }
  }

  return (
    <div className="medium-container">
      <Path data={{ content: "Tạo bài viết" }} />
      <div className="create-post-container">
        <Chart
          isModalChartVisible={isModalChartVisible}
          setIsModalChartVisible={setIsModalChartVisible}
          addData={addData}
          addDataContent={addDataContent}
        />
        <Vote
          isModalVoteVisible={isModalVoteVisible}
          setIsModalVoteVisible={setIsModalVoteVisible}
          addData={addData}
          addDataContent={addDataContent}
        />
        <Content
          isModalContentVisible={isModalContentVisible}
          setIsModalContentVisible={setIsModalContentVisible}
          addData={addData}
          addDataContent={addDataContent}
          changeDataContent={changeDataContent}
        />
        <UploadVideo
          isModalVideoVisible={isModalVideoVisible}
          setIsModalVideoVisible={setIsModalVideoVisible}
          addData={addData}
          addDataContent={addDataContent}
        />
        <ModalConfirm
          isModalConfirmVisible={isModalConfirmVisible}
          setIsModalConfirmVisible={setIsModalConfirmVisible}
        />
        <div className="create-post-content">
          <div className="create-post-content-item">
            <div className="create-post-content-left">Chủ đề</div>
            <div className="create-post-content-right">
              <Select
                showSearch
                placeholder="Chọn chủ đề cho bài viết của bạn"
                optionFilterProp="children"
                onChange={handleChangeTopic}
                value={reqData?.topicId}
                onSearch={onSearch}
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {topic.map((value, index) => (
                  <Option value={value.id} key={index}>
                    {value.name}
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
                onChange={handleChangeTag}
                onKeyDown={handleKeyDown}
                value={reqData?.tags}
              >
                {tag.map((value, index) => (
                  <Option value={value?.name} key={index}>
                    {value?.name}
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
                value={reqData?.title}
                name="title"
                onChange = {handleChangeInput}
              />
            </div>
          </div>
          <div className="create-post-content-item">
            <div className="create-post-content-left">Mô tả</div>
            <div className="create-post-content-right">
              <TextArea
                rows={4}
                placeholder="Mô tả sẽ được xuất hiện trong kết quả tìm kiếm"
                value={reqData?.description}
                name="description"
                maxLength={200}
                onChange = {handleChangeInput}
              />
            </div>
          </div>
          <div className="create-post-content-item">
            <div className="create-post-content-left">Ảnh bìa</div>
            <div className="create-post-content-right">
              <UploadImage handleChangeThumbnail={handleChangeThumbnail}/>
            </div>
          </div>
          <div className="create-post-content-item thumbnail">
            <Image src ={reqData?.thumbnail} width={500} height={200} layout="responsive"/>
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
          <div className="create-post-content-item add-content">
              <IconAddDraft/>
          </div>
          <p className="add-content-description">{"(Thêm tiện ích bằng cách chọn các thành phần ở bên phải vào khung trên)"}</p>
          <div className="create-post-content-list-button">
            <div className="create-post-content-button save-draft" onClick ={showModalConfirm}>
                <IconSaveDraft/>
                <p>LƯU BẢN NHÁP</p>
            </div>
            <div className="create-post-content-button save-article" onClick={() => handleSubmit(reqData)}>
                <IconUploadArticle/>
                {
                  post ? <p>LƯU BÀI VIẾT</p> : <p>ĐĂNG BÀI VIẾT</p>
                }
                
            </div>
          </div>
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
