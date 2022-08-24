import React from "react";
import { memo } from "react";
import IconInform from './../../../assets/icon/IconInform';
import IconWarning from './../../../assets/icon/IconWarning';
import Link from 'next/link';
import Marquee from "react-fast-marquee";

const hotNews = [
    "Triển lãm di động toàn cầu MWC 2022",
    "Samsung cũng là nạn nhân của nhóm tin tặc vừa tấn công NVIDIA - LAPSUS$",
    "Netflix có kế hoạch mua lại Next Games, trị giá khoảng 71 triệu USD",
    "Netflix có kế hoạch mua lại Next Games, trị giá khoảng 71 triệu USD",
]
const HotNews = () => {
    return (
        <div className="hotnews-container">
            <div className="hotnews-title">
                <p>TIN NÓNG</p>
                <IconInform/>
            </div>
            <div className="hotnews-contents">
                <Marquee>
                    {
                        hotNews.map((value)=> (
                            <div className="hotnews-content" key="value">
                                <IconWarning/>
                                <Link href={"/"}>{value}</Link>
                            </div>
                        ))
                    }
                    
                </Marquee>
            </div>
        </div>
    )
}
export default memo(HotNews);