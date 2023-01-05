import { Select, Input, Row, Col, message, Modal, Spin } from "antd";
import React, {
  FC,
  memo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
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
import IconCancel from "./../assets/icon/IconCancel";
import IconSaveDraft from "./../assets/icon/IconSaveDraft";
import IconUploadArticle from "./../assets/icon/IconUploadArticle";
import Content from "../components/CreatePost/Content";
import Chart from "../components/CreatePost/Chart";
import dynamic from "next/dynamic";
import Quiz from "../components/CreatePost/Quiz";
import Vote from "../components/CreatePost/Vote";
import {
  SortableList,
  ItemRenderProps,
  SortableItemProps,
} from "@thaddeusjiang/react-sortable-list";
import UploadVideo from "../components/CreatePost/UploadVideo";
import UploadImage from "../components/CreatePost/UploadImage";
import EditorWrapper from "../components/CreatePost/Editor/EditorWrapper";
import ModalConfirm from "../components/ModalConfirm/ModalConfirm";
import ModalCreate from "../components/ModalConfirm/ModalCreate";
import AreaChart from "../components/CreatePost/Chart/AreaChart";
import { genHexString, getToken } from "../libs/common";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import ChartWrapper from "../components/CreatePost/Chart/ChartWrapper";
const { Option } = Select;
const { TextArea } = Input;
const MapBox = dynamic(() => import("../components/CreatePost/Map"), {
  ssr: false,
});

const CreatePost = () => {
  const { post } = useRouter().query;
  const { draft } = useRouter().query;
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [isModalChartVisible, setIsModalChartVisible] = useState(false);
  const [isModalContentVisible, setIsModalContentVisible] = useState(false);
  const [isModalVoteVisible, setIsModalVoteVisible] = useState(false);
  const [isModalVideoVisible, setIsModalVideoVisible] = useState(false);
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
  const [isModalMapVisible, setIsModalMapVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<SortableItemProps[]>([]);
  const [dataContent, setDataContent] = useState([]);
  const [listId, setListId] = useState<number[]>([]);
  const [isRender, setIsRender] = useState(false);
  const [reqData, setReqData] = useState({
    topicId: "",
    tags: [],
    thumbnail: "",
    title: "",
    description: "",
    content: "[]",
    videos: [],
    images: [],
  });
  // const [content, setContent] = useState<any[]>();
  const [topic, setTopic] = useState([]);
  const [tag, setTag] = useState([]);
  // const [dataDefault, setDataDefault] = useState();
  const [isCreateDraft, setIsCreateDraft] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loadding, setLoadding] = useState(false);
  const [listImage, setListImage] = useState([]);
  const [listVideo, setListVideo] = useState([]);
  const [key, setKey] = useState("");
  const [dataEditor, setDataEditor] = useState("");
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [draftID, setDraftID] = useState();
  const [draggedItem, setDaraggedItem] = useState<SortableItemProps>();

  const changeDataContent = useCallback((i, data) => {
    setDataContent((pre) => {
      const dataValue = pre.findIndex((value) => value?.data.key === i);
      if (dataValue !== -1) {
        let arr = pre;
        arr[dataValue] = {
          data: data.data,
          type: data.type,
          id: i,
        };
        return [...arr];
      } else {
        return [...pre, data];
      }
    });
  }, []);

  const renderContent = useCallback(
    (data) => {
      if (!data) {
        return;
      }
      if (data.type === "chart") {
        return {
          lable: (
            <ChartWrapper
              type={data.typeChart}
              dataTable={data}
              isModal={false}
            />
          ),
          title: "Biểu đồ",
          id: data.id,
        };
      } else if (data.type === "video") {
        return {
          title: "video",
          lable: (
            <div className="video-upload">
              <video src={data.data.videoUrl} loop autoPlay muted controls />
            </div>
          ),
          id: data.id,
        };
      } else if (data.type === "content") {
        return {
          title: "Nội dung",
          lable: (
            <EditorWrapper
              dataContent={{
                data: data.data.data,
                type: data.data.type,
                key: data.data.key,
                id: data.id,
              }}
              changeDataContent={changeDataContent}
            />
          ),
          id: data.id,
        };
      }
    },
    [changeDataContent]
  );

  useEffect(() => {
    if (reqData.content !== '"{}"' && !isRender) {
      console.log(JSON.parse(reqData.content));
      setData(
        JSON.parse(reqData.content)?.map((value) => renderContent(value))
      );
    }
  }, [isRender, renderContent, reqData]);

  useEffect(() => {
    setData((pre) =>
      pre.filter(function (element) {
        return element !== undefined;
      })
    );
  }, [reqData]);
  const deleteDataContent = useCallback((id, data) => {
    return data.filter((_, index) => index !== id);
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleChangeListId = useCallback((data: number) => {
    setListId((pre) => [...pre, data]);
  }, []);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const sortReqDataByid = useCallback(
    (listId) => {
      console.log("listId", listId);
      return listId.map((idx) => {
        return JSON.parse(reqData.content).find((value) => value?.id === idx);
      });
    },
    [reqData.content]
  );

  useEffect(() => {
    setReqData((pre) => ({
      ...pre,
      videos: listVideo,
    }));
  }, [listVideo]);

  useEffect(() => {
    if (draft || post) {
      setIsCreateDraft(true);
    }
  }, [draft, post]);

  useEffect(() => {
    if (isCreateDraft === false && isFirstRender === false) {
      if (reqData.topicId !== "" && reqData.title !== "") {
        PropertiesService.createDraft(reqData, getToken()).then((data) => {
          if (data.data.data) {
            setDraftID(data.data.data.id);
          } else {
            message.error("Đã có lỗi xảy ra");
            setIsCreateDraft(false);
          }
        });
        setIsCreateDraft(true);
      }
    }
    setIsFirstRender(false);
  }, [isCreateDraft, isFirstRender, reqData]);

  useEffect(() => {
    const countInterval = setInterval(() => {
      if (isCreateDraft === true && draftID && post === undefined) {
        PropertiesService.updateDraft(
          { ...reqData, draftId: draftID },
          getToken()
        ).then((data) => {
          console.log(data);
        });
      }
    }, 30000);

    return () => clearInterval(countInterval);
  }, [draftID, isCreateDraft, post, reqData]);

  const addData = useCallback((data) => {
    setData((pre) => [...pre, data]);
  }, []);
  const addDataContent = useCallback(
    (data) => {
      setDataContent([...dataContent, data]);
    },
    [dataContent]
  );

  const setEditData = useCallback(
    (data) => {
      setReqData((pre) => {
        return {
          ...pre,
          articleId: post && +post,
          topicId: data.data.data?.topic?.id,
          tags: data.data.data?.tags,
          thumbnail: data.data.data?.thumbnail,
          title: data.data.data?.title,
          description: data.data.data?.description,
          content: data.data.data?.content,
        };
      });
      setListImage((pre) => [...pre, data.data.data?.thumbnail]);
      if (data.data.data.content) {
        JSON.parse(data.data.data.content).map((value) => {
          if (value?.type === "content") {
            addData({
              title: "Nội dung",
              lable: <EditorWrapper dataContent={value?.data} changeDataContent={changeDataContent}/>,
            });
          } else if (value?.type === "video") {
            addData({
              title: "video",
              lable: (
                <div className="video-upload">
                  <video src={value?.data} loop autoPlay muted controls />
                </div>
              ),
            });
          } else if (value?.type === "chart") {
            addData({
              lable: (
                <ChartWrapper
                  type={value.data.typeChart}
                  dataTable={value.data}
                  isModal={false}
                />
              ),
              title: "Biểu đồ",
            });
          }
        });
      }
      setDataContent(data.data.data);
    },
    [addData, changeDataContent, post]
  );

  const handleSubmit = useCallback(() => {
    const listImage = Array.from(
      new DOMParser()
        .parseFromString(reqData.content, "text/html")
        .querySelectorAll("img")
    ).map((img) => img.getAttribute("src"));
    const listImageFormatter = listImage
      .map((img) => img?.replace('\\"', ""))
      .map((img) => img?.replace('\\"', ""));
    if (post) {
      PropertiesService.updateArticle(
        { ...reqData, images: [...listImage, ...listImageFormatter] },
        getToken()
      ).then((data) => {
        message.success("Lưu bài thành công");
        Router.push("/");
      });
    } else {
      PropertiesService.createArticle(
        { ...reqData, images: [...reqData.images, ...listImageFormatter] },
        getToken()
      ).then((data) => {
        message.success("Đăng bài thành công");
        Router.push("/");
      });
    }
  }, [post, reqData]);

  useEffect(() => {
    setReqData((pre) => ({
      ...pre,
      content: JSON.stringify(dataContent),
    }));
  }, [dataContent]);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
      window.addEventListener("resize", (event) => {
        if (window.innerWidth <= 768) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      });
    }
  }, []);

  const showModalChart = () => {
    setIsModalChartVisible(true);
  };
  const showModalContent = () => {
    setKey(genHexString(7));
    setIsModalContentVisible(true);
  };
  const showModalVideo = () => {
    setIsModalVideoVisible(true);
  };
  const showModalConfirm = () => {
    setIsModalConfirmVisible(true);
  };
  const showModalMap = () => {
    setIsModalMapVisible(!isModalMapVisible);
  };

  const handleChangeTopic = useCallback(
    (value: string) => {
      setReqData({
        ...reqData,
        topicId: value,
      });
    },
    [reqData]
  );
  const handleChangeTag = useCallback(
    (value: string) => {
      setReqData({
        ...reqData,
        tags: value,
      });
    },
    [reqData]
  );
  const handleChangeInput = useCallback(
    (event) => {
      setReqData({
        ...reqData,
        [event.target.name]: event.target.value,
      });
    },
    [reqData]
  );
  const handleChangeThumbnail = useCallback(
    (value) => {
      setListImage((pre) => [...pre, value]);
      setReqData({
        ...reqData,
        thumbnail: value,
      });
    },
    [reqData]
  );
  const onSearch = useCallback((value: string) => {
    console.log("search:", value);
  }, []);

  const handleDelete = useCallback(
    (index) => {
      const result = data.filter((value, i) => i !== index);
      setReqData((pre) => ({
        ...pre,
        content: JSON.stringify(
          sortReqDataByid(result.map((value) => value?.id))
        ),
      }));
    },
    [data, sortReqDataByid]
  );

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
    // {
    //   lable: <IconPoll />,
    //   title: "Bình chọn",
    //   callBack: () => showModalVote(),
    // },
    {
      lable: <IconTable />,
      title: "Bảng",
      callBack: () => showModalChart(),
    },
    {
      lable: <IconMap />,
      title: "Bản đồ",
      callBack: () => showModalMap(),
    },
    // {
    //   lable: <IconQuestion />,
    //   title: "Câu hỏi",
    //   callBack: () =>
    //     addData({
    //       lable: <Quiz setContent={setContent} content={content} />,
    //       title: "Câu hỏi",
    //     }),
    // },
  ];
  // let draggedItem;
  const onDragStart = (e, index) => {
    setIsRender(true);
    setDaraggedItem(data[index]);
    console.log("start", draggedItem?.id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };
  const onDragOver = (e, index) => {
    e.preventDefault();
    const draggedOverItem = data[index];
    console.log("over", draggedItem);
    if (!draggedItem) {
      return;
    }
    // if the item is dragged over itself, ignore
    if (draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let items = data.filter((item) => item?.id !== draggedItem?.id);
    console.log("index", items);
    // add the dragged item after the dragged over item
    items.splice(index, 0, draggedItem);

    setReqData((pre) => ({
      ...pre,
      content: JSON.stringify(sortReqDataByid(items.map((value) => value?.id))),
    }));
    // setData(items);
  };

  const onDragEnd = () => {
    setIsRender(false);
    setDaraggedItem(null);
    // draggedItem = null;
  };

  const handleKeyDown = (event) => {
    if (reqData?.tags.length >= 4) {
      return;
    }
    if (event.keyCode == 13) {
      let tag = reqData?.tags ? reqData?.tags : [];
      tag.push(event.target.value);
      setReqData({
        ...reqData,
        tags: tag,
      });
    }
  };

  useEffect(() => {
    PropertiesService.getTopics().then((data) => setTopic(data.data.data));
    PropertiesService.getTags().then((data) => setTag(data.data.data));
  }, []);

  useEffect(() => {
    if (post) {
      PropertiesService.getArticleById(post, getToken()).then((data) =>
        setEditData(data)
      );
    } else if (draft) {
      PropertiesService.getDraftById(draft, getToken()).then((data) =>
        setEditData(data)
      );
    }
  }, [post, draft, setEditData]);

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
          setLoadding={setLoadding}
          id={key}
          setDataEditor={setDataEditor}
          dataEditor={dataEditor}
          // deleteDataContent={deleteDataContent}
        />
        <UploadVideo
          isModalVideoVisible={isModalVideoVisible}
          setIsModalVideoVisible={setIsModalVideoVisible}
          addData={addData}
          addDataContent={addDataContent}
          setListVideo={setListVideo}
        />
        <MapBox
          isModalMapVisible={isModalMapVisible}
          setIsModalMapVisible={setIsModalMapVisible}
        />
        <ModalConfirm
          isModalConfirmVisible={isModalConfirmVisible}
          setIsModalConfirmVisible={setIsModalConfirmVisible}
          reqData={reqData}
          draftID={draftID}
        />
        <ModalCreate
          isModalCreateVisible={isModalCreateVisible}
          setIsModalCreateVisible={setIsModalCreateVisible}
          setReqData={setReqData}
          handleSubmit={handleSubmit}
        />
        {/* {loadding && <div className="loadding-screen"><Spin /></div>} */}
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
                  <Option
                    value={value?.name}
                    key={index}
                    disabled={
                      reqData.tags.length > 3
                        ? reqData.tags.includes(value?.name)
                          ? false
                          : true
                        : false
                    }
                  >
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
                onChange={handleChangeInput}
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
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="create-post-content-item">
            <div className="create-post-content-left">Ảnh bìa</div>
            <div className="create-post-content-right">
              <UploadImage handleChangeThumbnail={handleChangeThumbnail} />
            </div>
          </div>
          {reqData?.thumbnail && (
            <div className="create-post-content-item thumbnail">
              <Image
                src={reqData?.thumbnail}
                width={500}
                height={200}
                layout="responsive"
                alt="thumbnail"
              />
            </div>
          )}
          <ul onDragOver={(e) => e.preventDefault}>
            {data.map(
              (value, index) =>
                value && (
                  <li key={value?.id} onDragOver={(e) => onDragOver(e, index)}>
                    <div
                      className="create-post-content-item item"
                      key={index}
                      draggable
                      onDragStart={(e) => onDragStart(e, index)}
                      onDragEnd={onDragEnd}
                    >
                      <div className="create-post-content-title">
                        {value?.title}
                      </div>
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
                )
            )}
          </ul>
          <div
            className="create-post-content-item add-content"
            onClick={showModal}
          >
            <IconAddDraft />
          </div>

          <p className="add-content-description">
            {isMobile
              ? "(Thêm tiện ích bằng cách nhấn vào khung trên)"
              : "(Thêm tiện ích bằng cách rê các thành phần ở bên phải vào khung trên)"}
          </p>
          <div className="create-post-content-list-button">
            <div
              className="create-post-content-button save-draft"
              onClick={showModalConfirm}
            >
              <IconSaveDraft />
              <p>LƯU BẢN NHÁP</p>
            </div>
            <div
              className="create-post-content-button save-article"
              onClick={() => setIsModalCreateVisible(true)}
            >
              <IconUploadArticle />
              {post ? <p>LƯU BÀI VIẾT</p> : <p>ĐĂNG BÀI VIẾT</p>}
            </div>
          </div>
        </div>
        {isMobile ? (
          <Modal visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div
              className="create-post-memu"
              // style={{ display: isMobile ? "none" : "" }}
            >
              <div className="create-post-memu-title">THÊM TIỆN ÍCH</div>
              <div className="create-post-memu-content">
                <Row gutter={[16, 16]}>
                  {memu.map((value, index) => (
                    <Col
                      className="create-post-memu-item"
                      span={12}
                      key={index}
                    >
                      <div className="memu-item-icon-wrapper">
                        <div
                          className="memu-item-icon"
                          onClick={value.callBack}
                        >
                          {value.lable}
                        </div>
                        <p>{value.title}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </Modal>
        ) : (
          <div
            className="create-post-memu"
            // style={{ display: isMobile ? "none" : "" }}
          >
            <div className="create-post-memu-title">THÊM TIỆN ÍCH</div>
            <div className="create-post-memu-content">
              <Row gutter={[16, 16]}>
                {memu.map((value, index) => (
                  <Col className="create-post-memu-item" span={12} key={index}>
                    <div className="memu-item-icon-wrapper" s>
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
        )}
      </div>
    </div>
  );
};
export default memo(CreatePost);
