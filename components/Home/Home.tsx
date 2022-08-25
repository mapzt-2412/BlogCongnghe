import Slide from "./Slide/Slide";
import {Row, Col} from "antd";
import React from "react";
import RightBar from "./RightBar/RightBar";
import Image from 'next/image';
import Link from 'next/link';
import { ROUTE_TREND } from '../../libs/constants';
import Topic from "./Topic/Topic";

const trends = [
    {
        title: "Trong tương lai, mô hình kinh doanh chuyển sang online", 
        image: "/slide1.jpg",
    },
    {
        title: "Trong tương lai, mô hình kinh doanh chuyển sang online", 
        image: "/slide2.jpg",
    },
    {
        title: "Trong tương lai, mô hình kinh doanh chuyển sang online", 
        image: "/slide3.jpg",
    },
    {
        title: "Trong tương lai, mô hình kinh doanh chuyển sang online", 
        image: "/slide4.jpg",
    },
];

const Tags = [
    {
        title: "#IOS", 
        link: "/",
    },
    {
        title: "#IOS", 
        link: "/",
    },
    {
        title: "#IOS", 
        link: "/",
    },
    {
        title: "#IOS", 
        link: "/",
    },
    {
        title: "#IOS", 
        link: "/",
    },
    {
        title: "#IOádasdasdS", 
        link: "/",
    },
    {
        title: "#IOádasdS", 
        link: "/",
    },
    {
        title: "#IOSấdasd", 
        link: "/",
    },
]

const data = [
    {
        topic: "TECHNOLOGY",
        data: [
            {
                title: "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
                author: "_vphlinh",
                image: "/slide1.jpg",
                time: "20220620",
            },
            {
                title: "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
                author: "_vphlinh",
                image: "/slide2.jpg",
                time: "20220620",
            },
            {
                title: "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
                author: "_vphlinh",
                image: "/slide3.jpg",
                time: "20220620",
            },
        ]
    },
    {
        topic: "BLOCKCHAIN",
        data: [
            {
                title: "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
                author: "_vphlinh",
                image: "/slide1.jpg",
                time: "20220620",
            },
            {
                title: "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
                author: "_vphlinh",
                image: "/slide2.jpg",
                time: "20220620",
            },
            {
                title: "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
                author: "_vphlinh",
                image: "/slide3.jpg",
                time: "20220620",
            },
        ]
    },
    {
        topic: "PROGRAMMING",
        data: [
            {
                title: "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
                author: "_vphlinh",
                image: "/slide1.jpg",
                time: "20220620",
            },
            {
                title: "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
                author: "_vphlinh",
                image: "/slide2.jpg",
                time: "20220620",
            },
            {
                title: "Đây là các mẫu ốp lưng Pela thân thiện với môi trường dành cho dòng Google ...",
                author: "_vphlinh",
                image: "/slide3.jpg",
                time: "20220620",
            },
        ]
    },

]

const Home = () => {

    return (
        <div className="main-container">
            <Row>
                <Col span={16}>
                    <div className = "home-slide">
                        <Slide />
                    </div>
                    {
                        data.map((value, index) => (
                            <Topic data={value} key={index}/> 
                        ))
                    }

                </Col>
                <Col span={8}>
                    <RightBar title="Xu Hướng">
                        {
                            trends.map((value,index)=> (
                                <div className="trend-item" key={index}>
                                    <div className="trend-image">
                                    <Image src={value.image} height={75} width={122} layout="responsive" alt="trend"/>
                                    </div>
                                    <div className="trend-title">
                                        <p>{value.title}</p>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="link see-more"> 
                            <Link href={ROUTE_TREND}>Xem thêm</Link>
                        </div>
                    </RightBar>
                    <RightBar title="TAG NỔI BẬT">
                        <div className="tags">
                        {
                            Tags.map((value,index)=> (
                                <div className="link tag" key={ index }> 
                                    <Link href={value.link}>{ value.title }</Link>
                                </div>
                            ))
                        }
                        </div>
                    </RightBar>
                    <RightBar title="TIN TỨC">
                        <Row>
                        {
                            trends.map((value,index)=> (
                                <Col span={12} key={index}>
                                    <div className={"news-item " + (index%2 === 0 ? "left" : "")} >
                                        <div className="news-image">
                                        <Image src={value.image} height={120} width={191} layout="responsive" alt="trend"/>
                                        </div>
                                        <div className="news-title">
                                            <p>{value.title}</p>
                                        </div>
                                    </div>
                                </Col>
                            ))
                        }
                        </Row>
                        <div className="link see-more"> 
                            <Link href={ROUTE_TREND}>Xem thêm</Link>
                        </div>
                    </RightBar>
                    <RightBar title="BÀI VIẾT LIÊN QUAN">
                        {
                            trends.map((value,index)=> (
                                    <div className={"post-item "} key={index}>
                                        <span>{index + 1 + "."}</span>
                                        <div className="post-title">
                                            <p>{value.title}</p>
                                        </div>
                                    </div>
                            ))
                        }
                        <div className="link see-more"> 
                            <Link href={ROUTE_TREND}>Xem thêm</Link>
                        </div>
                    </RightBar>
                </Col>
            </Row>
        
        </div>
    )
}
export default Home;