import { Button } from "antd";
import React, { memo, useState, useCallback, useMemo, useEffect } from "react";
import Content from "../Content";
import showdown from "showdown";


const converter = new showdown.Converter();
const EditorWrapper = ({ dataContent, changeDataContent }) => {
  const [data, setData] = useState(dataContent);
  const [isModalContentVisible, setIsModalContentVisible] = useState(false);
  const [dataEditor, setDataEditor] = useState("");
  
  const showModalContent = () => {
    setIsModalContentVisible(true);
  };

  useEffect(() => {
    if(dataContent){
        setData(dataContent);
    }
  },[dataContent])
  
  const html = converter.makeHtml(data?.data);
  return (
    <div className="editor-wrapper">
      <Content
        isModalContentVisible={isModalContentVisible}
        setIsModalContentVisible={setIsModalContentVisible}
        dataContent={data}
        id={data.id + "_edit"}
        dataEditor={dataEditor}
        setDataEditor={setDataEditor}
        changeDataContent={changeDataContent}
      />
      <Button onClick={showModalContent}>Chỉnh sửa nội dung </Button>
      {data?.key === "normal" ? (
        <div
          dangerouslySetInnerHTML={{ __html: `${data.data}` }}
          className={"ck-content"}
        />
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: `${html}` }}
          className={"ck-markdown-content"}
        />
      )}
    </div>
  );
};
export default memo(EditorWrapper);
