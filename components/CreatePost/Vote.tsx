import React, { useState } from "react";
import { memo } from "react";
import { Input, Modal, Button } from "antd";
import IconCancel from "../../assets/icon/IconCancel";
import VoteWrapper from "./Vote/VoteWrapper"

const Vote = ({isModalVoteVisible, setIsModalVoteVisible, addData }) => {
        
    const [listVote, setListVote] = useState({"input1": ""});
    const [data, setData] = useState();
    
    const handleChangeInput = (e) => {
        setListVote({
            ...listVote,
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
        console.log(listVote)
        setListVote({...listVote,[`input${Math.random()}`]:"", })
    }

    const deleteVote = (index) => {
        const newList = {}; 
        for(let i = 0; i < Object.values(listVote).length; i++ ) {
            if(i !== index){
                newList={...newList, [`input${i+1}`]:listVote[`input${i+1}`],}
            }
        }
        setListVote(newList);
    }
    return (
        
        <Modal title="Tạo bình chọn" visible={isModalVoteVisible} onOk={handleOk} onCancel={handleCancel}>
            <div className="vote-container">
        {
            Object.keys(listVote).map((value,index)=> (
                <div className="vote-wrapper" key={index}>
                    <p>{ `Lựa chọn ${index + 1 }`}</p>
                    <Input placeholder = "Nhập nội dung cho lựa chọn này" value={listVote[value]} onChange={(e) => handleChangeInput(e)} name={value}/>
                    <Button onClick = { () => deleteVote(index)}> <IconCancel/> </Button>
                </div>
            ))
        }
        <Button onClick={addNewVote}>Thêm lựa chọn mới</Button>
        </div>
      </Modal>
      
    )
}
export default memo(Vote)