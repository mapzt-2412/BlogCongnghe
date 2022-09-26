import React, { useState } from "react";
import { memo } from "react";
import { Input, Modal, Button } from "antd";
import IconCancel from "../../assets/icon/IconCancel";
import VoteWrapper from "./Vote/VoteWrapper"

const Vote = ({isModalVoteVisible, setIsModalVoteVisible, addData }) => {
    const renderVote = (index) =>  {
        return (
            <div className="vote-wrapper" key={index}>
                    <p>{ `Lựa chọn ${index + 1 }`}</p>
                    <Input placeholder = "Nhập nội dung cho lựa chọn này" onChange={(e) => handleChangeInput(e)} name={`input${index + 1}`}/>
                    <Button onClick = { () => deleteVote(index)}> <IconCancel/> </Button>
                </div>
        )
    }
        
    const [listVote, setListVote] = useState([renderVote]);
    const [data, setData] = useState();

    const handleChangeInput = (e) => {
        setData({
            ...data,
            [e.target.name]: [e.target.value]
        })
    }

    const handleOk = () => {
        addData({
            lable: <VoteWrapper data={data}/>,
            title: "Bình chọn",
          });
        setIsModalVoteVisible(false);
    }
    const handleCancel = () => {
        setIsModalVoteVisible(false);
    }

    const addNewVote = () => {
        setListVote([...listVote,renderVote])
    }
    const deleteVote = (index) => {
        const newList = [] 
        for(let i = 0; i < listVote.length; i++ ) {
            if(i !== index){
                console.log(listVote.length)
                newList.push(listVote[i])
            }
        }
        setListVote(newList);
    }
    return (
        
        <Modal title="Tạo bình chọn" visible={isModalVoteVisible} onOk={handleOk} onCancel={handleCancel}>
            <div className="vote-container">
        {
            listVote.map((value,index)=> value(index))
        }
        <Button onClick={addNewVote}>Thêm lựa chọn mới</Button>
        </div>
      </Modal>
      
    )
}
export default memo(Vote)