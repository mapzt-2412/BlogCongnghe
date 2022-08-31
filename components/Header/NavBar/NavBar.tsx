import React, {memo} from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ROUTE_ABOUT, ROUTE_HELP, ROUTE_HOME, ROUTE_NEWS, ROUTE_NEWSFEEDS, ROUTE_RECOMMEND, ROUTE_TREND, ROUTE_VLOG } from './../../../libs/constants';

const NavBar = () => {
    const title = [
        {
            title: "Trang chủ",
            route: ROUTE_HOME,
        },
        {
            title: "Giới thiệu",
            route: ROUTE_ABOUT,
        },
        {
            title: "Bảng tin",
            route: ROUTE_NEWSFEEDS,
        },
        {
            title: "Xu hướng",
            route: ROUTE_TREND,
        },
        {
            title: "Tin tức",
            route: ROUTE_NEWS,
        },

        {
            title: "Đề xuất",
            route: ROUTE_RECOMMEND,
        },
        {
            title: "Trợ giúp",
            route: ROUTE_HELP,
        },
        {
            title: "Vlog",
            route: ROUTE_VLOG,
        },
    ];
    
    const router = useRouter();
    return (
        <div className="navbar-container">
            {
                title.map((value)=>(
                    <Link href={value.route} key={value.title}>
                        <div className={(router?.pathname === value.route) ? "navbar-title active" : "navbar-title"}>
                            {value.title}
                        </div>
                    </Link>
                )
                )
            }
        </div>
    )
}
export default memo(NavBar);