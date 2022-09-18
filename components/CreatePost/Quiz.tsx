import React, { useState } from "react";
import { memo } from "react";
import { Input } from "antd";

const Quiz = ({ setContent, content }) => {
    return (
        <div className= "quiz-wrapper">
            <Input placeholder = "Đặt câu hỏi bạn mong muốn" onChange={(e) => setContent(e.target.value)} value={content}/>
        </div>
    )
}
export default memo(Quiz);