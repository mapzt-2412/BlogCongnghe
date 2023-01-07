import React, { memo, useState, useEffect, useContext } from 'react';
import Path from "../components/Path";
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Rate, Menu, Button } from 'antd';
import AvatarDefaultSmall from "../assets/icon/AvatarDefaultSmall";
import ListPost from "../components/ListPost/ListPost";
import PropertiesService from "../services/properties.service";
import { getToken, getId } from "../libs/common";
import Follower from '../components/Follower/Follower';
import ModalReport from '../components/ModalReport/ModalReport';
import { UserInfo } from './_app.js';
import { ROUTE_HOME } from '../libs/constants';

const Profile = (props) => {
    const { userInfo, setUserInfo } = useContext(UserInfo);
    const { id } = useRouter().query;
    const [value, setValue] = useState(3);
    const [token, setToken] = useState();
    const [data, setData] = useState();
    const [listPost, setListPost] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reportContent, setReportContent] = useState("");
    const [key, setKey] = useState("1");
    const [placement, SetPlacement] = useState('');

    const placementChange = (e: RadioChangeEvent) => {
        SetPlacement(e.target.value);
      };

    const handleChangeInput = (e) => {
        setReportContent(e.target.value);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        if(getToken()){
          setToken(getToken())
        }
      },[])
    
    const handleOpenChatBox = () => {
        setUserInfo({
            nickname: data?.nickname,
            id: data.id,
        })
    }
    useEffect(()=>{
        if(token){
            if(id){
                PropertiesService.getUserInfo(id, token).then(data => setData(data.data.data))
                PropertiesService.getArticleByUserId(id).then(data => setListPost(data.data.data))
            }
            
        }
    },[token, id])

    const handleReport = () => {
        PropertiesService.sendReportUser({userBeingReport: id, description: reportContent, type: placement}, getToken()).then((data) => {
          alert("Báo cáo thành công");
          handleCancel();
        })
      }
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

    const router = useRouter();
if(getToken()===false) {
  router.push(ROUTE_HOME);
}
    return (
        <div className="medium-container">
            <Path data={{ title: ["Trang cá nhân"], content: data?.username}}/>
            <div className="profile-user-info">
                <div className="profile-user-info-avatar" >
                {
                    data?.avatar ?
                    <div> <Image src={ data?.avatar } width={104} height={104} layout="responsive" alt="avatar"/> </div>
                     :
                    <AvatarDefaultSmall width={104} height={104} white/>

                }
                </div>
                {
                    id !== getId() && <div className='profile-user-button'>
                        <Button onClick={handleOpenChatBox}>Nhắn tin</Button>
                        <Button onClick={showModal}>Báo cáo người dùng</Button>
                        <ModalReport isModalOpen={isModalOpen} handleCancel={handleCancel} handleReport={handleReport} reportContent={reportContent} handleChangeInput={handleChangeInput} placement={placement} placementChange={placementChange}/>
                    </div>
                }
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