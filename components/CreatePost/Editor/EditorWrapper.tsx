import { Button } from "antd";
import React, { memo, useState, useCallback } from "react";
import Content from "../Content";
import showdown from "showdown";

const converter = new showdown.Converter();
const EditorWrapper = ({ dataContent }) => {
    const [data, setData] = useState(dataContent);
    const [isModalContentVisible, setIsModalContentVisible] = useState(false);
    console.log(dataContent)
    const handlEditContent = useCallback ((data) => {
        setData(data)
      },[])

    const showModalContent = () => {
        setIsModalContentVisible(true);
    };
    const html = converter.makeHtml(data.data);
    return (
        <div className="editor-wrapper">
            <Content
                isModalContentVisible={isModalContentVisible}
                setIsModalContentVisible={setIsModalContentVisible}
                handlEditContent={handlEditContent}
                dataContent = {data}
            />
            <Button onClick={showModalContent}>Chỉnh sửa nội dung</Button>
            {
                data?.key === "normal" ? <div dangerouslySetInnerHTML={{ __html: `${data.data}` }} className={"ck-content"} /> 
                : <div dangerouslySetInnerHTML={{ __html: `${html}` }} className={"ck-markdown-content"} /> 
            }
            
        </div>
    )
}
export default memo(EditorWrapper)