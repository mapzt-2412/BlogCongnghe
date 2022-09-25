import { Button } from "antd";
import React, { memo, useState, useCallback } from "react";
import Content from "../Content";

const EditorWrapper = ({ dataContent }) => {
    const [data, setData] = useState(dataContent);
    const [isModalContentVisible, setIsModalContentVisible] = useState(false);

    const handlEditContent = useCallback ((data) => {
        setData(data)
      },[])

    const showModalContent = () => {
        setIsModalContentVisible(true);
    };
    return (
        <div className="editor-wrapper">
            <Content
                isModalContentVisible={isModalContentVisible}
                setIsModalContentVisible={setIsModalContentVisible}
                handlEditContent={handlEditContent}
                dataContent = {data}
            />
            <Button onClick={showModalContent}>Chỉnh sửa nội dung</Button>
            <div dangerouslySetInnerHTML={{ __html: `${data}` }} />
        </div>
    )
}
export default memo(EditorWrapper)