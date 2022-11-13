import React from "react";
import { FC, memo, useRef, useEffect, useState, useMemo } from "react";
import { Modal, Row, Col, Radio, Button, message } from "antd";
import EditorWrapper from "./editor/EditorWrapper";
import { getToken } from "../../libs/common";
import { Tabs } from "antd";
import Logo from "../../assets/icon/Logo";
import UploadVideo from "./UploadVideo";

interface IContentProps {
  isModalContentVisible: boolean | undefined;
  setIsModalContentVisible: (data) => void;
  dataContent?: {
    data: string;
    type: string;
  };
  addData?: (data) => void;
  addDataContent?: (data) => void;
  handlEditContent?: (data) => void;
  changeDataContent?: (i, data) => void;
}
const Content: FC<IContentProps> = ({
  isModalContentVisible,
  setIsModalContentVisible,
  addData,
  handlEditContent,
  dataContent,
  addDataContent,
  changeDataContent,
}) => {
  const editorRef = useRef();
  const [isMarkdownRender, setIsMarkdownRender] = useState(false);
  const [isModalUploadVisible, setIsModalUploadVisible] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
  const [data, setData] = useState("");
  const [key, setKey] = useState("normal");
  const [keyChange, setKeyChange] = useState("normal");
  const [typeUpload, setTypeUpload] = useState("");
  const [urlMedia, setUrlMedia] = useState();

  function genHexString(len) {
    const hex = "0123456789ABCDEF";
    let output = "";
    for (let i = 0; i < len; ++i) {
      output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return output;
  }

  const id = useMemo(() => genHexString(7), []);

  const handleChangeDataContent = (i, data) => {
    changeDataContent(i, data);
  };
  useEffect(() => {
    editorRef.current = {
      ClassicEditor: require("./editor/ckeditor"),
    };
    setEditorLoaded(true);
  }, []);
  console.log(data);
  useEffect(() => {
    if (data) {
      changeDataContent(id, {
        type: "content",
        data: {
          data: data.data,
          type: key,
          key: id,
        },
      });
    }
  }, [data, key]);

  useEffect(() => {
    if (dataContent) {
      setKey(dataContent.type);
    }
  }, [dataContent]);

  useEffect(() => {
    if (editorRef?.current.ClassicEditor && isModalContentVisible) {
      editorRef?.current.ClassicEditor.Editor.create(
        document.querySelector(`.editor-${id}`),
        {
          licenseKey: "",
          autosave: {
            save(editor) {
              return setData((pre) => {
                return {
                  ...pre,
                  data: editor.getData(),
                };
              });
            },
          },
          simpleUpload: {
            // The URL that the images are uploaded to.
            uploadUrl: process.env.REACT_APP_API_URL + "/articles/media",

            // Enable the XMLHttpRequest.withCredentials property.
            withCredentials: false,

            // Headers sent along with the XMLHttpRequest to the upload server.
            headers: {
              "X-CSRF-TOKEN": "CSRF-Token",
              Authorization: `Bearer ${getToken()}`,
            },
          },
        }
      )
        .then((editor) => {
          window.editor = editor;
          if (dataContent) {
            editor.setData(dataContent.data);
          }
        })
        .catch((error) => {
          console.error("Oops, something went wrong!");
          console.error(
            "Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:"
          );
          console.warn("Build id: 1lzzqnayetqo-tsu3xzcc1f0");
          console.error(error);
        });
    }
  }, [editorRef, id, editorLoaded, isModalContentVisible, dataContent]);
  
  useEffect(() => {
    if (
      editorRef?.current.ClassicEditor &&
      isModalContentVisible &&
      isMarkdownRender === false
    ) {
      editorRef?.current.ClassicEditor.EditorMarkdown.create(
        document.querySelector(`.editor-markdown-${id}`),
        {
          licenseKey: "",
          autosave: {
            save(editor) {
              return setData((pre) => {
                return {
                  ...pre,
                  data: editor.getData(),
                };
              });
            },
          },
          simpleUpload: {
            // The URL that the images are uploaded to.
            uploadUrl: process.env.REACT_APP_API_URL + "/articles/media",

            // Enable the XMLHttpRequest.withCredentials property.
            withCredentials: false,

            // Headers sent along with the XMLHttpRequest to the upload server.
            headers: {
              "X-CSRF-TOKEN": "CSRF-Token",
              Authorization: `Bearer ${getToken()}`,
            },
          },
        }
      )
        .then((editor) => {
          window.editorMarkdown = editor;
          if (dataContent) {
            editorMarkdown.setData(dataContent.data);
          }
          setIsMarkdownRender(true);
        })
        .catch((error) => {
          console.error("Oops, something went wrong!");
          console.error(
            "Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:"
          );
          console.warn("Build id: 1lzzqnayetqo-tsu3xzcc1f0");
          console.error(error);
        });
    }
  }, [editorRef, id, editorLoaded, isModalContentVisible, dataContent, key]);
  const handleOk = () => {
    if (editor) {
      editor
        .destroy()
        .then(() => {
          if (handlEditContent) {
            handlEditContent(data);
            handleChangeDataContent(dataContent.data.key, {
              type: "content",
              data: {
                data: data.data,
                type: key,
                key: id,
              },
            });
          } else {
            if (addData && data) {
              addData({
                title: "Nội dung",
                lable: (
                  <EditorWrapper
                    dataContent={{
                      data: data.data,
                      type: key,
                      key: id,
                    }}
                  />
                ),
              });
              addDataContent({
                type: "content",
                data: {
                  data: data.data,
                  type: key,
                  key: id,
                },
              });
            }
          }
          if (editor) {
            editor.setData("");
          }
          setIsModalContentVisible(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (isMarkdownRender) {
      editorMarkdown
        .destroy()
        .then(() => {
          if (editorMarkdown) {
            editorMarkdown.setData("");
          }
          setIsModalContentVisible(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleCancel = () => {
    if (editor) {
      editor
        .destroy()
        .then(() => setIsModalContentVisible(false))
        .catch((error) => {
          console.log(error);
        });
    }
    if (isMarkdownRender) {
      editorMarkdown
        .destroy()
        .then(() => setIsModalContentVisible(false))
        .catch((error) => {
          console.log(error);
        });
    }
    setIsModalContentVisible(false);
  };

  const handleCancelModalConfirm = () => {
    setIsModalConfirmVisible(false);
  };
  const handleChangeTabs = (key) => {
    if (data !== "") {
      setIsModalConfirmVisible(true);
      setKeyChange(key);
    } else {
      setKey(key);
    }
  };
  const handleModalChangeTabs = () => {
    setKey(keyChange);
    setData("");
    handleCancelModalConfirm();
    editor.setData("");
    if (isMarkdownRender) {
      editorMarkdown.setData("");
    }
  };
  const handleClickButton = (type) => {
    setTypeUpload(type);
    setIsModalUploadVisible(true);
  };
  const handleSubmitUpload = (url) => {
    if (typeUpload === "image") {
      setUrlMedia(`![image](${url})`);
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(urlMedia);
    message.success(`Sao chép thành công`);
  };
  return (
    <Modal
      visible={isModalContentVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
    >
      <Modal
        visible={isModalConfirmVisible}
        onCancel={handleCancelModalConfirm}
        footer={false}
      >
        <div className="modal-logo">
          <Logo />
        </div>
        <div className="modal-title">
          <p>Thông báo</p>
        </div>
        <div className="modal-content">
          <p>
            Bạn có muốn chuyển trình soạn thảo những nội dung của bạn sẽ bị xóa?
          </p>
        </div>
        <div className="modal-button-center">
          <div
            className="modal-button save-article"
            onClick={handleModalChangeTabs}
          >
            <p>ĐỒNG Ý</p>
          </div>
          <div
            className="modal-button save-draft"
            onClick={handleCancelModalConfirm}
          >
            <p>Ở LẠI</p>
          </div>
        </div>
      </Modal>
      <UploadVideo
        isModalVideoVisible={isModalUploadVisible}
        setIsModalVideoVisible={setIsModalUploadVisible}
        type={typeUpload}
        addUrl={handleSubmitUpload}
      />
      <div className="editor-content-wrapper">
        <Tabs onChange={handleChangeTabs} activeKey={key}>
          <Tabs.TabPane tab="Trình soạn thảo văn bản" key="normal">
            {editorLoaded ? (
              <div className={`editor-${id}`}></div>
            ) : (
              <div>Editor loading</div>
            )}
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Markdown"
            key="markdown"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {editorLoaded ? (
              <>
                <div className="editor-buttons">
                  <div
                    className="button upload-image"
                    onClick={() => handleClickButton("image")}
                  >
                    Thêm hình ảnh
                  </div>
                </div>
                {urlMedia && (
                  <div className="editor-code-block">
                    <pre>
                      <code>{urlMedia}</code>
                    </pre>
                    <div className="copy-button" onClick={handleCopy}>
                      copy
                    </div>
                  </div>
                )}
                <div className={`editor-markdown-${id}`}></div>
              </>
            ) : (
              <div>Editor loading</div>
            )}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
};
export default memo(Content);
