import React, { memo, useState, useEffect } from "react";
import io from 'socket.io-client';
import { Input } from 'antd';
import PropertiesService from "../../services/properties.service";
import { getToken, deleteToken, saveTheme, getTheme } from "../../libs/common";

const socket = io("https://fb02-2402-800-63af-ebd9-1821-1bc9-69b5-343d.ngrok.io");

const ChatBox = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);
    const [content, setContent] = useState("");
    
    const sendMessage = () => {
        PropertiesService.createMessage({content: content, receiveUserId: 3}, getToken()).then((data) => console.log(data))
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
    return (
        <div>
            <Input placeholder="Basic usage" value = {content} onChange = {(e) => setContent(e.target.value)} />
            <button onClick={ sendMessage }>Send message</button>
        </div>
    )
}
export default memo(ChatBox);