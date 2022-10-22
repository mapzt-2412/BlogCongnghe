import React, { memo, useState, useEffect, useContext } from 'react';
import Path from "../components/Path";
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Rate, Menu } from 'antd';
import AvatarDefaultSmall from "../assets/icon/AvatarDefaultSmall";
import ListPost from "../components/ListPost/ListPost";
import PropertiesService from "../services/properties.service";
import { getToken } from "../libs/common";
import Follower from '../components/Follower/Follower';
import { UserInfo } from './_app.js';

const Profile = (props) => {
    const { userInfo, setUserInfo } = useContext(UserInfo);
    const { id } = useRouter().query;
    const [value, setValue] = useState(3);
    const [token, setToken] = useState();
    const [data, setData] = useState();
    const [listPost, setListPost] = useState();
    const [key, setKey] = useState("1");

    useEffect(() => {
        if(getToken()){
          setToken(getToken())
        }
      },[])
    
    const handleOpenChatBox = () => {
        setUserInfo({
            nickname: id,
            id: data.id,
        })
    }
    useEffect(()=>{
        if(token){
            PropertiesService.getProfile(token).then(data => setData(data.data.data))
            PropertiesService.getArticleByUser(token).then(data => setListPost(data.data.data))
        }
    },[token])


    const handleClick = (key) => {
        setKey(key.key);
      };
    const contact = [
        {
            title: "Email:",
            value: data?.email,
        },
        {
            title: "Điện thoại:",
            value: data?.phone ? data?.phone : "Chưa có thông tin",
        },
    ]
    const info = [
        {
            title: "Bài đã đăng:",
            value: "100",
        },
        {
            title: "Bài đã đăng:",
            value: "100",
        },
        {
            title: "Người theo dõi:",
            value: "88",
        },
        {
            title: "Người đang theo dõi:",
            value: "96",
        },
    ]
    const menuItems = [
        {
            label: "Danh sách bài viết:",
            key: "1",
        },
        {
            label: "Người theo dõi:",
            key: "2",
        },
        {
            label: "Người đang theo dõi:",
            key: "3",
        }
    ]
    return (
        <div className="medium-container">
            <Path data={{ title: ["Trang cá nhân"], content: id}}/>
            <div className="profile-user-info">
                <div className="profile-user-info-avatar" onClick={handleOpenChatBox}>
                {
                    props.avatar ? 
                    <Image src={ props.avatar } width={104} height={104} layout="responsive" alt="avatar"/> :
                    <AvatarDefaultSmall width={104} height={104} white/>

                }
                </div>
                <p>{data?.username}</p>
                <Rate defaultValue={value} disabled={true} />
                <div className="profile-user-contact">
                    {
                        contact.map((value, index)=> (
                            <div key={index} className="profile-user-contact-item">
                                <span className="slash">{value.title}</span>
                                {value.value}
                            </div>
                        ))
                    }
                </div>
                <div className="profile-user-post">
                    {
                        info.map((value, index)=> (
                            <div key={index} className={ index === 0 ? "profile-user-post-item first" : "profile-user-post-item"}>
                                <span className="slash">{value.title}</span>
                                {value.value}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="profile-user-content">
                <div className="profile-menu">
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        items={menuItems}
                        onClick={handleClick}
                    />
                </div>
                <div className="profile-list-post">
                    {
                        key === "1" && <ListPost data={listPost} id={"Danh sách bài viết"}/>
                    }
                    {
                        key === "2" && <Follower type={"2"}/>
                    }
                    {
                        key === "3" && <Follower type={"3"}/>
                    }
                </div>
            </div>
        </div>
    )
}
export default memo(Profile)