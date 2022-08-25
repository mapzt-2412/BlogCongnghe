import { Carousel } from 'antd';
import React, { memo } from 'react';
import Image from 'next/image';

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const slideContent = [
    {
        title: "Netflix có kế hoạch mua lại Next Games, trị giá khoảng 71 triệu USD",
        image: "/Slide1.jpg",
    },
    {
        title: "Netflix có kế hoạch mua lại Next Games, trị giá khoảng 71 triệu USD",
        image: "/Slide2.jpg",
    },
    {
        title: "Netflix có kế hoạch mua lại Next Games, trị giá khoảng 71 triệu USD",
        image: "/Slide3.jpg",
    },
    {
        title: "Netflix có kế hoạch mua lại Next Games, trị giá khoảng 71 triệu USD",
        image: "/Slide4.jpg",
    },
    {
        title: "Netflix có kế hoạch mua lại Next Games, trị giá khoảng 71 triệu USDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        image: "/Slide5.jpg",
    },
]
const Slide = () => {
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
      };
    return (
        <Carousel afterChange={onChange} dotPosition="top" >
            {
                slideContent.map((value, index) => (
                    <div className="carousel-item" key={index}>
                        <Image src={value.image} height={480} width={966} layout="responsive" alt="slide"/>
                        <div className="carousel-title"><p>{value.title}</p></div>
                    </div>
                    
                ))
            }
        </Carousel>
    )
}
export default memo(Slide);