import React, { memo, useRef, useState, useEffect  } from 'react';
import IconClose from './../../assets/icon/IconClose';
import IconArrowLeft from './../../assets/icon/IconArrowLeft';
import IconArrowRight from './../../assets/icon/IconArrowRight';
import Image from 'next/image';
import AvatarDefaultSmall from './../../assets/icon/AvatarDefaultSmall';
import { formatDate } from './../../libs/common';
import Interactive from '../../components/Interactive/Interactive';
import ListComment from '../../components/Interactive/Comment/ListComment';
import IconPlay from './../../assets/icon/IconPlay';
import { useRouter } from 'next/router';
import { ROUTE_NEWSFEEDS } from './../../libs/constants';


const ShortVideo = () => {
    const router = useRouter();
    const ref = useRef(null);
    const [isPlay, setIsPlay] = useState(true);
    const [data, setData] = useState({
        author: "_vphlinh",
        avatar: null,
        title: "Tôi yêu Việt Nam đất nước tôi!",
        like: 218,
        share: 0,
        comment: 10,
        time: "20200202"
    });
    const handlePlay = () => {
        setIsPlay(!isPlay);
    }

    const handleClose = () => {
        router.replace(ROUTE_NEWSFEEDS);
    }
    const handleNavigation = () => {
        router.push({
            pathname: '/short-video/[pid]',
            query: { pid: "2" },
          })
    }
    return (
        <div className='short-video-container'> 
            <div className="short-video-content">
                <div className="video">
                <video 
                ref={ref}
                src="https://v16-webapp.tiktok.com/f1547ebbf00682cc41b7ae68cc9c6543/630e80e2/video/tos/useast2a/tos-useast2a-pve-0037-aiso/5ac835dde35a4fa19f8b18ef6f8cbbe1/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2882&bt=1441&cs=0&ds=3&ft=TkXt216WvjVQ9O2OqPTsddcw4i_a7uwQADy~Dvcya9&mime_type=video_mp4&qs=0&rc=ZzppPGk2OTs0ZTU2PDMzZkBpanF3ZTk6ZnFwZjMzZjgzM0AzYWFeLjZgX2IxMC5jYi1iYSNwLTZmcjQwNTJgLS1kL2Nzcw%3D%3D&l=20220830152740010244087070060D8D3F&btag=80000"
                loop
                autoPlay
                muted
                controls
                onClick={handlePlay}
                />
                </div>
                
            </div>
            <div className="short-video-button">
                <button type="button" className="close-button" onClick={handleClose}><IconClose/></button>
                <button type="button" className="pre-button" onClick={handleNavigation}><IconArrowLeft/></button>
                <button type="button" className="next-button" onClick={handleNavigation}><IconArrowRight/></button>
            </div>
            <div className="short-video-info">
                <div className='short-video-author'>
                    <div className="short-video-author-avatar">
                        {
                            data?.avatar ? 
                            <Image src={data?.avatar} width={48} height={48} alt=""/>
                            :
                            <AvatarDefaultSmall  width={48} height={48}/>
                        }
                    </div>
                    <div className="short-video-author-info">
                        <p>{data.author}</p>
                        <span>{ formatDate(data.time) }</span>
                    </div>
                </div>
                <div className="short-video-description">
                    <div className="short-video-title">
                            <span>{data.title}</span>
                    </div>
                    <Interactive like={data.like} share={data.share} comment={data.comment}/>
                </div>
                <div className="short-video-comment">
                    <ListComment/>
                </div>
            </div>
        </div>
    )
}
export default memo(ShortVideo);