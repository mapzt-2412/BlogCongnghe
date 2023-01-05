import React, { useCallback } from "react";
import { FC, memo, useRef, useEffect, useState, useMemo } from "react";
import { Modal, Row, Col, Radio, Button, message } from "antd";
import EditorWrapper from "./Editor/EditorWrapper";
import { getToken, genHexString } from "../../libs/common";
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
  setListImage?: (data: string[]) => void;
  setLoadding?: (data: boolean) => void;
  id: string;
  dataEditor: string;
  setDataEditor: (data: string) => void;
}
const Content: FC<IContentProps> = ({
  isModalContentVisible,
  setIsModalContentVisible,
  dataContent,
  changeDataContent,
  id,
  dataEditor,
  setDataEditor,
}) => {
  const editorRef = useRef();
  const [isMarkdownRender, setIsMarkdownRender] = useState(false);
  const [isModalUploadVisible, setIsModalUploadVisible] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
  const [key, setKey] = useState("normal");
  const [keyChange, setKeyChange] = useState("normal");
  const [typeUpload, setTypeUpload] = useState("");
  const [urlMedia, setUrlMedia] = useState();
  const [isRenderEditor, setIsRenderEditor] = useState(false);
  const [isRenderEditorMarkdown, setIsRenderEditorMarkdown] = useState(false);
  const handleChangeDataContent = useCallback(() => {
    if (id.includes("_edit")) {
      if (dataEditor && changeDataContent && id) {
        changeDataContent(id.replace("_edit", ""), {
          type: "content",
          data: {
            data: dataEditor.data,
            type: key,
            key: id.replace("_edit", ""),
          },
          id: id.replace("_edit", ""),
        });
      }
    } else if (dataEditor && changeDataContent && id) {
      changeDataContent(id, {
        type: "content",
        data: {
          data: dataEditor.data,
          type: key,
          key: id,
        },
        id: id,
      });
    }
  }, [changeDataContent, dataEditor, id, key]);
  console.log("rerender");
  useEffect(() => {
    editorRef.current = {
      ClassicEditor: require("./Editor/ckeditor"),
    };
    setEditorLoaded(true);
  }, [isModalContentVisible]);
  useEffect(() => {
    handleChangeDataContent();
  }, [handleChangeDataContent]);

  useEffect(() => {
    if (dataContent) {
      setKey(dataContent.type);
    }
  }, [dataContent]);

  useEffect(() => {
    if (
      editorRef?.current.ClassicEditor &&
      isModalContentVisible &&
      !isRenderEditor
    ) {
      console.log(document.querySelector(`.editor-${id}`));
      editorRef?.current.ClassicEditor.Editor.create(
        document.querySelector(`.editor-${id}`),
        {
          licenseKey: "",
          autosave: {
            save(editor) {
              return setDataEditor((pre: string) => ({
                ...pre,
                data: editor.getData(),
              }));
            },
          },
          simpleUpload: {
            // The URL that the images are uploaded to`.
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
          setIsRenderEditor(true);
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
  }, [
    editorRef,
    id,
    editorLoaded,
    isModalContentVisible,
    dataContent,
    setDataEditor,
    isRenderEditor,
  ]);

  useEffect(() => {
    if (
      editorRef?.current.ClassicEditor &&
      isModalContentVisible &&
      isMarkdownRender === false &&
      !isRenderEditorMarkdown
    ) {
      editorRef?.current.ClassicEditor.EditorMarkdown.create(
        document.querySelector(`.editor-markdown-${id}`),
        {
          licenseKey: "",
          autosave: {
            save(editor) {
              return setDataEditor((pre) => {
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
          setIsRenderEditor(true);
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
  }, [
    editorRef,
    id,
    editorLoaded,
    isModalContentVisible,
    dataContent,
    key,
    isMarkdownRender,
    setDataEditor,
    isRenderEditor,
    isRenderEditorMarkdown,
  ]);
  const handleOk = () => {
    setIsModalContentVisible(false);
    if (editor) {
      editor?.destroy()
        .then(() => {
          setDataEditor("");
          setEditorLoaded(false);
          setIsModalContentVisible(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (isMarkdownRender && editorMarkdown) {
      editorMarkdown?.destroy()
        .then(() => {
          setIsModalContentVisible(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setIsRenderEditor(false);
    setIsRenderEditorMarkdown(false);
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
    if (dataEditor !== "") {
      setIsModalConfirmVisible(true);
      setKeyChange(key);
    } else {
      setKey(key);
    }
  };
  const handleModalChangeTabs = () => {
    setKey(keyChange);
    setDataEditor("");
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
        <Tabs onChange={handleChangeTabs} activeKey={key ? key : "normal"}>
          <Tabs.TabPane tab="Trình soạn thảo văn bản" key="normal">
            {editorLoaded ? (
              <div className={`editor-${id}`}></div>
            ) : (
              <div>Editor loading</div>
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Markdown" key="markdown">
            {editorLoaded ? (
              <div className={`editor-markdown-${id}`}></div>
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
