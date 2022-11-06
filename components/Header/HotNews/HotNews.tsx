import React from "react";
import { memo, useState, useEffect } from "react";
import IconInform from './../../../assets/icon/IconInform';
import IconWarning from './../../../assets/icon/IconWarning';
import Link from 'next/link';
import Marquee from "react-fast-marquee";
import PropertiesService from "../../../services/properties.service";

const hotNews = [
    "Triển lãm di động toàn cầu MWC 2022",
    "Samsung cũng là nạn nhân của nhóm tin tặc vừa tấn công NVIDIA - LAPSUS$",
    "Netflix có kế hoạch mua lại Next Games, trị giá khoảng 71 triệu USD",
]
const HotNews = () => {
    const [data, setData] = useState();
    useEffect(()=>{
        PropertiesService.getArticlesByTopic("News").then((data) => setData(data.data.data))
    },[])
    return (
        <div className="hotnews-container">
            <div className="hotnews-title">
                <p>TIN NÓNG</p>
                <IconInform/>
            </div>
            <div className="hotnews-contents">
                <Marquee>
                    {
                        data?.map((value, index)=> (
                            <div className="hotnews-content" key={index}>
                                <IconWarning/>
                                <Link href={"/"}>{value.title}</Link>
                            </div>
                        ))
                    }
                    
                </Marquee>
            </div>
        </div>
    )
}
export default memo(HotNews);