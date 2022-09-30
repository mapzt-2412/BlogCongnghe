import React, {memo, useState} from 'react';
import Path from '../components/Path';
import Image from 'next/image';
import AboutPage1 from "../components/About/AboutPage1";

const About = () => {
    const [page, setPage] = useState(0);
    return (
        <>
        <div className="medium-container">
            <Path data={{ content: "Giới thiệu "}}/>
        </div>
        <div className="full-screen-container">
            {page === 0 ? 
            <>
            <div className='about-item' onClick={() => setPage(1)}>
                <p>1</p>
                <Image src={"/about.jpg"} layout="responsive" width={341} height={450} alt='about'/>
            </div>
            <div className='about-item' onClick={() => setPage(2)}>
                <p>2</p>
                <Image src={"/about.jpg"} layout="responsive" width={341} height={450} alt='about'/>
            </div>
            <div className='about-item' onClick={() => setPage(3)}>
                <p>3</p>
                <Image src={"/about.jpg"} layout="responsive" width={341} height={450} alt='about'/>
            </div>
            <div className='about-item' onClick={() => setPage(4)}>
                <p>4</p>
                <Image src={"/about.jpg"} layout="responsive" width={341} height={450} alt='about'/>
            </div>
            </>
            :
            <AboutPage1 page={page}/>
        }
            
        </div>
        </>
    )
}
export default memo(About)