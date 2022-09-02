import React, { memo, useState } from 'react';
import Path from "../components/Path";
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Rate, Menu } from 'antd';
import AvatarDefaultSmall from "../assets/icon/AvatarDefaultSmall";
import ListPost from "../components/ListPost/ListPost";

const Profile = (props) => {
    const { id } = useRouter().query;
    const [value, setValue] = useState(3);
    
    const onChange = (key: string) => {
        console.log(key);
      };
    
    const contact = [
        {
            title: "Email:",
            value: "vphlinh1994@gmail.com",
        },
        {
            title: "Điện thoại:",
            value: "090 123 4567",
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
                <div className="profile-user-info-avatar">
                {
                    props.avatar ? 
                    <Image src={ props.avatar } width={104} height={104} layout="responsive" alt="avatar"/> :
                    <AvatarDefaultSmall width={104} height={104} white/>

                }
                </div>
                <p>VÕ PHƯƠNG HOÀNG LINH</p>
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
                    />
                </div>
                <div className="profile-list-post">
                    <ListPost />
                </div>
            </div>
        </div>
    )
}
export default memo(Profile)