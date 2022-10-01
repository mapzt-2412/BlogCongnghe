import React, {memo, useState, useEffect} from 'react';
import Path from '../components/Path';
import Image from 'next/image';
import AboutPage1 from "../components/About/AboutPage1";

const About = () => {
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const handleClick = (page) => {
        setLoading(true);
        setTimeout(() => setPage(page), 1000)
    }
    useEffect(() => {
        setLoading(false)
    },[page])
    return (
        <>
        <div className="medium-container">
            <Path data={{ content: "Giới thiệu "}}/>
        </div>
        <div className="full-screen-container">
            {page === 0 ? 
            <>
            <div className={`about-item page${1} ${loading && "show"}`} onClick={() => handleClick(1)}>
                {
                    !loading && <>
                    <p>1</p>
                    <Image src={"/about1.png"} layout="responsive" width={341} height={450} alt='about'/>
                    </>
                }
            </div>
            
            <div className={`about-item page${2} ${loading && "hidden"}`} onClick={() => handleClick(2)}>
                <p>2</p>
                <Image src={"/about2.png"} layout="responsive" width={341} height={450} alt='about'/>
            </div>
            <div className={`about-item page${3} ${loading && "hidden"}`} onClick={() => handleClick(3)}>
                <p>3</p>
                <Image src={"/about3.png"} layout="responsive" width={341} height={450} alt='about'/>
            </div>
            <div className={`about-item page${4} ${loading && "hidden"}`} onClick={() => handleClick(4)}>
                <p>4</p>
                <Image src={"/about4.png"} layout="responsive" width={341} height={450} alt='about'/>
            </div>
            </>
            :
            <AboutPage1 page={page} setPage={setPage}/>
        }
            
        </div>
        </>
    )
}
export default memo(About)