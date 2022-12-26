import React, {
  memo,
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import io from "socket.io-client";
import { Input, Spin } from "antd";
import PropertiesService from "../../services/properties.service";
import {
  getToken,
  deleteToken,
  saveTheme,
  getId,
  handleError,
} from "../../libs/common";
import IconHideChatBox from "../../assets/icon/IconHideChatBox";
import AvatarDefaultSmall from "../../assets/icon/AvatarDefaultSmall";
import IconChatBox from "../../assets/icon/IconChatBox";
import { UserInfo } from "../../pages/_app.js";
import ModalLogin from "../Header/ModalLogin/ModalLogin";

const socket = io(process.env.REACT_APP_API_URL);

const ChatBox = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [newMessage, setNewMessage] = useState(false);
  const [isModalLoginVisible, setIsModalLoginVisible] = useState(false);
  const [content, setContent] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [idReceive, setIdReceive] = useState(0);
  const [dataMessage, setDataMessage] = useState([]);
  const { userInfo } = useContext(UserInfo);
  const refContent = useRef(null);

  const resetScrollEffect = useCallback(() => {
    const collection = document.getElementsByClassName("chat-box-main-content");
    if (collection[0]) {
      collection[0].scrollTop = collection[0].scrollHeight;
    }
  }, []);
  useEffect(() => {
    resetScrollEffect();
  }, [resetScrollEffect, isShow, idReceive, isLoading, dataMessage]);

  useEffect(() => {
    if (userInfo && getToken()) {
      if (user.find((value) => value.id === userInfo.id)) {
        getMessageUser(userInfo);
        setIdReceive(userInfo.id);
        setIsShow(true);
      } else {
        setIsShow(true);
        setUser((pre) => [...pre, userInfo]);
        setIdReceive(userInfo.id);
      }
    }
  }, [userInfo, user]);

  const sendMessage = () => {
    PropertiesService.createMessage(
      { content: content, receiveUserId: idReceive },
      getToken()
    ).then((data) => {
      setDataMessage([...dataMessage, data.data.data]);
    });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
      setContent("");
    }
  };

  useEffect(() => {
    if (getToken()) {
      PropertiesService.getMessage(getToken())
        .then((data) => {
          if (data.status === 200) {
            setUser(data.data.Data);
            setIdReceive(data.data.Data[0]?.id);
            if (data.data.Data[0]?.id) {
              PropertiesService.getMessageByUser(
                data.data.Data[0]?.id,
                getToken()
              ).then((data) => setDataMessage(data.data.data));
            }
            return;
          }
          handleError(data.data.message);
        })
        .catch((data) => {
          handleError(data.response.data.message);
        });
    }
  }, []);

  const getMessageUser = (data) => {
    setIsLoading(true);
    setIdReceive(data.id);
    PropertiesService.getMessageByUser(data.id, getToken()).then((data) => {
      setDataMessage(data.data.data);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    if (getId()) {
      console.log(getId());
      socket.on(getId(), (data) => {
        setNewMessage(true);
      });
    }
    return () => {
      socket.off(getId());
    };
  }, []);

  useEffect(() => {
    if (idReceive > getId()) {
      socket.on(idReceive + " " + getId(), (data) => {
        if (data.id !== getId() && dataMessage.length !== 0) {
          setDataMessage([...dataMessage, data]);
        }
        setIsConnected(true);
      });
    } else {
      socket.on(getId() + " " + idReceive, (data) => {
        if (data.id !== getId() && dataMessage.length !== 0) {
          setDataMessage([...dataMessage, data]);
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
  }, [idReceive, dataMessage]);

  const sendPing = () => {
    socket.emit("ping");
  };

  const renderChart = (value, index) => {
    console.log(value);
    if (value.sendUser === +getId()) {
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

  const handleShowChat = () => {
    setNewMessage(false);
    if (getToken()) {
      setIsShow(true);
    } else {
      setIsModalLoginVisible(true);
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
                  className={
                    "chat-box-left-content-user " +
                    (value.id === idReceive && "active")
                  }
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
            <div className="chat-box-main-content" ref={refContent}>
              {isLoading ? (
                <div className="spin-loading">
                  {" "}
                  <Spin size="large" />{" "}
                </div>
              ) : (
                <div className="chat-box-chat-content">
                  {dataMessage?.map((value, index) =>
                    renderChart(value, index)
                  )}
                </div>
              )}

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
          <div className="chat-box-hidden" onClick={handleShowChat}>
            {newMessage && <div className="chat-box-dot"></div>}
            <IconChatBox />
          </div>
        </>
      )}
      <ModalLogin
        isModalLoginVisible={isModalLoginVisible}
        setIsModalLoginVisible={setIsModalLoginVisible}
        tabName={"Login"}
      />
    </>
  );
};
export default memo(ChatBox);
