import { Col, Row, Carousel } from "antd";
import React from "react";
import { memo, useRef } from "react";
import IconAddShortVideo from './../../assets/icon/IconAddShortVideo';
import IconNext from './../../assets/icon/IconNext';
import ShortVideoCard from "./ShortVideoCard";

const ListShortVideo = ({ data }) => {
    const ref = useRef(null);
    return (
        <>
        <Carousel dots={false} ref={ref}>
            <>
                <div className="list-short-video-wrapper">
                    <div className="create-short-video short-video">
                        <IconAddShortVideo/>
                        <span>Tạo bảng tin</span>
                    </div>
                    {
                        data.map((value, index) => (
                            <ShortVideoCard value={value} key={index}/>
                        ))
                    }
                </div>
            </>
            <div className="list-short-video-wrapper">
                {
                        data.map((value, index) => (
                            <ShortVideoCard value={value} key={index}/>
                        ))
                    }
                </div>
        </Carousel>
        <div className="carousel-next" onClick={() => ref?.current.next()}> <IconNext/> </div>
        </>
    )
}
export default memo(ListShortVideo);