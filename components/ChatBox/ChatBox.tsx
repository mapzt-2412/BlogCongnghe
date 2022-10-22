import React, { memo, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { Input } from "antd";
import PropertiesService from "../../services/properties.service";
import { getToken, deleteToken, saveTheme, getId } from "../../libs/common";
import IconHideChatBox from "../../assets/icon/IconHideChatBox";
import IconClose from "../../assets/icon/IconClose";
import AvatarDefaultSmall from "../../assets/icon/AvatarDefaultSmall";
import IconChatBox from "../../assets/icon/IconChatBox";
import { UserInfo } from '../../pages/_app.js'

const socket = io(process.env.REACT_APP_API_URL);

const ChatBox = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [content, setContent] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [user, setUser] = useState([]);
  const [idReceive, setIdReceive] = useState(0);
  const [dataMessage, setDataMessage] = useState([]);
  const { userInfo } = useContext(UserInfo);

  console.log(user)
  useEffect(() => {
    if(userInfo){
      if(user.find(value => value.id === userInfo.id)){
        getMessageUser(userInfo);
        setIdReceive(userInfo.id);
        setIsShow(true);
      }else{
        setIsShow(true);
        setUser((pre) => [...pre, userInfo]);
        setIdReceive(userInfo.id);
      }
    }
  },[userInfo])

  const sendMessage = () => {
    PropertiesService.createMessage(
      { content: content, receiveUserId: idReceive },
      getToken()
    ).then((data) => setDataMessage((pre) => [...pre, data.data.data]));
  };

  const handleKeyDown = (e) => {
    if(e.keyCode === 13){
      sendMessage();
      setContent("");
    }
  }

  useEffect(() => {
    PropertiesService.getMessage(getToken()).then((data) =>
      {
        setUser(data.data.Data);
        setIdReceive(data.data.Data[0].id);
        PropertiesService.getMessageByUser(data.data.Data[0].id, getToken()).then((data) =>
        setDataMessage(data.data.data)
      );
      }
    );
  }, []);

  const getMessageUser = (data) => {
    setIdReceive(data.id);
    PropertiesService.getMessageByUser(data.id, getToken()).then((data) =>
      setDataMessage(data.data.data)
    );
  };

  useEffect(() => {
    if(idReceive > getId()){
      socket.on(idReceive + " " + getId(), (data) => {
        if(data.id !== getId()){
          setDataMessage(data.content);
        }
        setIsConnected(true);
      });
    }else{
      socket.on(getId() + " " + idReceive, (data) => {
        if(data.id !== getId()){
          setDataMessage(data.content);
        }
        setIsConnected(true);
      });
    }
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, [idReceive]);

  const sendPing = () => {
    socket.emit("ping");
  };

  const renderChart = (value, index) => {
    if (value.sendUser == getId()) {
      return (
        <div className="chat-send" key={index}>
          <div className="chat-content">{value.content}</div>
          <div className="chat-content-user">
            <AvatarDefaultSmall />
          </div>
        </div>
      );
    } else {
      return (
        <div className="chat-recieve" key={index}>
          <div className="chat-content-user">
            <AvatarDefaultSmall />
          </div>
          <div className="chat-content">{value.content}</div>
        </div>
      );
    }
  };
  return (
    <>
      {isShow ? (
        <div className="chat-box-container">
          <div className="chat-box-header" onClick={() => setIsShow(!isShow)}>
            <div>Nhắn tin</div>
            <div className="chat-box-header-button">
              <div className="chat-box-button" onClick={() => setIsShow(false)}>
                <IconHideChatBox />
              </div>
            </div>
          </div>
          <div className={"chat-box-content " + (isShow && "show")}>
            <div className="chat-box-left-content">
              {user?.map((value, index) => (
                <div
                  className={"chat-box-left-content-user " + (value.id === idReceive && "active")}
                  onClick={() => getMessageUser(value)}
                  key={index}
                >
                  <AvatarDefaultSmall />
                  <div>
                    {value.nickname ? value.nickname : "Người dùng hệ thống"}
                  </div>
                </div>
              ))}
            </div>
            <div className="chat-box-main-content">
              <div className="chat-box-chat-content">
                {dataMessage?.map((value, index) => renderChart(value, index))}
              </div>
              <div className="chat-box-input">
                <Input
                  placeholder="Nhập nội dung tin nhắn"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
        {
          getToken() !== false
        &&  
        <div className="chat-box-hidden" onClick={() => setIsShow(!isShow)}>
          <IconChatBox />
        </div>
        }
        </>
      )}
    </>
  );
};
export default memo(ChatBox);
