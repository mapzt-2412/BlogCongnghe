import React, { memo, useState, useEffect } from "react";
import io from 'socket.io-client';
import { Input } from 'antd';
import PropertiesService from "../../services/properties.service";
import { getToken, deleteToken, saveTheme, getId } from "../../libs/common";
import IconHideChatBox from "../../assets/icon/IconHideChatBox";
import IconClose from "../../assets/icon/IconClose";
import AvatarDefaultSmall from "../../assets/icon/AvatarDefaultSmall";
import IconChatBox from "../../assets/icon/IconChatBox";

const socket = io(process.env.REACT_APP_API_URL);

const ChatBox = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);
    const [content, setContent] = useState("");
    const [isShow, setIsShow] = useState(false);
    const [user, setUser] = useState();
    const [dataMessage, setDataMessage] = useState();
    const sendMessage = () => {
        PropertiesService.createMessage({content: content, receiveUserId: 3}, getToken()).then((data) => console.log(data))
    }

    useEffect(() => {
      PropertiesService.getMessage(getToken()).then((data) => setUser(data.data.Data))
    },[])

    const getMessageUser = (data) => {
      PropertiesService.getMessageByUser(data.id, getToken()).then((data) => setDataMessage(data.data.data))
    }

    useEffect(() => {
      socket.on('5 3', (data) => {
        console.log(data)
        setIsConnected(true);
      });
      socket.on('disconnect', () => {
        setIsConnected(false);
      });
  
      socket.on('pong', () => {
        setLastPong(new Date().toISOString());
      });
  
      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('pong');
      };
    }, []);
  
    const sendPing = () => {
      socket.emit('ping');
    }
    console.log(dataMessage)
    const renderChart = (value, index ) =>{
      console.log(value.sendUser == getId())
      if(value.sendUser == getId()){
        return (
          <div className="chat-send" key={index}> 
                    <div className="chat-content">{value.content}</div>
                    <div className="chat-content-user">
                      <AvatarDefaultSmall/>
                    </div>
                </div>
        )
      }else{
        return (
              <div className="chat-recieve" key={index}> 
                  <div className="chat-content-user">
                      <AvatarDefaultSmall/>
                    </div>
                    <div className="chat-content">{value.content}</div>
                </div>
        )
      }
    }
    return (
      <>
        {
          isShow ? (
            <div className="chat-box-container">
          <div className="chat-box-header" onClick = {() => setIsShow(!isShow)}>
              <div>Nhắn tin</div>
              <div className="chat-box-header-button">
                <div className="chat-box-button" onClick = {() => setIsShow(false)}>
                  <IconHideChatBox/>
                  </div>
              </div>
            </div>
          <div className={"chat-box-content " + (isShow && "show")}>
            <div className="chat-box-left-content">
              {
                user?.map((value,index) => (
                  <div className="chat-box-left-content-user" onClick={() => getMessageUser(value)} key={index}>
                    <AvatarDefaultSmall/>
                    <div>{value.nickname ? value.nickname : "Người dùng hệ thống"}</div>
                  </div>
                ))
              }
            </div>
            <div className="chat-box-main-content">
              <div className="chat-box-chat-content">
                {
                  dataMessage?.map((value,index) => renderChart(value, index))
                }
              </div>
              <div className="chat-box-input">
              <Input placeholder="Nhập nội dung tin nhắn" value = {content} onChange = {(e) => setContent(e.target.value)} />
              </div>
            </div>
          </div>
        </div> 
          )
          :
          (
            <div className="chat-box-hidden" onClick = {() => setIsShow(!isShow)}>
              <IconChatBox/>
            </div>
          )
        }
      </>
    )
}
export default memo(ChatBox);