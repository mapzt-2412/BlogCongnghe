import React, { memo } from "react"
import ListShortVideo from "../components/ShortVideo/ListShortVideo";
import ListPost from "../components/ListPost/ListPost";

const data=[
    {
        thumbnail: "https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037-aiso/77608d3e63c3426f871381a852c8c050?x-expires=1661763600&x-signature=ipRMCwBI3Y482evXneb7Cwa66dU%3D",
        video: "https://v16-webapp.tiktok.com/2335f2a5b68652fb2127861057ba2e0f/630c8c7d/video/tos/useast2a/tos-useast2a-pve-0037-aiso/89e41acd2f554671865e06b66600b096/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2484&bt=1242&cs=0&ds=3&ft=eXd.6Hk_Myq8Z6S3-he2NGOjml7Gb&mime_type=video_mp4&qs=0&rc=aWRlOGg6ZThkNWRkZ2U4Z0BpM242ZGk6ZnY6PDMzZjgzM0A1MDRiMC1eXzAxLmIzMF5fYSNhcG5qcjRncWtgLS1kL2Nzcw%3D%3D&l=20220829035248010245040102139B17DB&btag=80000",
        author: "VanToan",
    },
    {
        thumbnail: "https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037-aiso/77608d3e63c3426f871381a852c8c050?x-expires=1661763600&x-signature=ipRMCwBI3Y482evXneb7Cwa66dU%3D",
        video: "https://v16-webapp.tiktok.com/2335f2a5b68652fb2127861057ba2e0f/630c8c7d/video/tos/useast2a/tos-useast2a-pve-0037-aiso/89e41acd2f554671865e06b66600b096/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2484&bt=1242&cs=0&ds=3&ft=eXd.6Hk_Myq8Z6S3-he2NGOjml7Gb&mime_type=video_mp4&qs=0&rc=aWRlOGg6ZThkNWRkZ2U4Z0BpM242ZGk6ZnY6PDMzZjgzM0A1MDRiMC1eXzAxLmIzMF5fYSNhcG5qcjRncWtgLS1kL2Nzcw%3D%3D&l=20220829035248010245040102139B17DB&btag=80000",
        author: "VanToan",
    },
    {
        thumbnail: "https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037-aiso/77608d3e63c3426f871381a852c8c050?x-expires=1661763600&x-signature=ipRMCwBI3Y482evXneb7Cwa66dU%3D",
        video: "https://v16-webapp.tiktok.com/2335f2a5b68652fb2127861057ba2e0f/630c8c7d/video/tos/useast2a/tos-useast2a-pve-0037-aiso/89e41acd2f554671865e06b66600b096/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2484&bt=1242&cs=0&ds=3&ft=eXd.6Hk_Myq8Z6S3-he2NGOjml7Gb&mime_type=video_mp4&qs=0&rc=aWRlOGg6ZThkNWRkZ2U4Z0BpM242ZGk6ZnY6PDMzZjgzM0A1MDRiMC1eXzAxLmIzMF5fYSNhcG5qcjRncWtgLS1kL2Nzcw%3D%3D&l=20220829035248010245040102139B17DB&btag=80000",
        author: "VanToan",
    },
    {
        thumbnail: "https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037-aiso/77608d3e63c3426f871381a852c8c050?x-expires=1661763600&x-signature=ipRMCwBI3Y482evXneb7Cwa66dU%3D",
        video: "https://v16-webapp.tiktok.com/2335f2a5b68652fb2127861057ba2e0f/630c8c7d/video/tos/useast2a/tos-useast2a-pve-0037-aiso/89e41acd2f554671865e06b66600b096/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2484&bt=1242&cs=0&ds=3&ft=eXd.6Hk_Myq8Z6S3-he2NGOjml7Gb&mime_type=video_mp4&qs=0&rc=aWRlOGg6ZThkNWRkZ2U4Z0BpM242ZGk6ZnY6PDMzZjgzM0A1MDRiMC1eXzAxLmIzMF5fYSNhcG5qcjRncWtgLS1kL2Nzcw%3D%3D&l=20220829035248010245040102139B17DB&btag=80000",
        author: "VanToan",
    },
    {
        thumbnail: "https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037-aiso/77608d3e63c3426f871381a852c8c050?x-expires=1661763600&x-signature=ipRMCwBI3Y482evXneb7Cwa66dU%3D",
        video: "https://v16-webapp.tiktok.com/2335f2a5b68652fb2127861057ba2e0f/630c8c7d/video/tos/useast2a/tos-useast2a-pve-0037-aiso/89e41acd2f554671865e06b66600b096/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2484&bt=1242&cs=0&ds=3&ft=eXd.6Hk_Myq8Z6S3-he2NGOjml7Gb&mime_type=video_mp4&qs=0&rc=aWRlOGg6ZThkNWRkZ2U4Z0BpM242ZGk6ZnY6PDMzZjgzM0A1MDRiMC1eXzAxLmIzMF5fYSNhcG5qcjRncWtgLS1kL2Nzcw%3D%3D&l=20220829035248010245040102139B17DB&btag=80000",
        author: "VanToan",
    },
    {
        thumbnail: "https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037-aiso/77608d3e63c3426f871381a852c8c050?x-expires=1661763600&x-signature=ipRMCwBI3Y482evXneb7Cwa66dU%3D",
        video: "https://v16-webapp.tiktok.com/2335f2a5b68652fb2127861057ba2e0f/630c8c7d/video/tos/useast2a/tos-useast2a-pve-0037-aiso/89e41acd2f554671865e06b66600b096/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2484&bt=1242&cs=0&ds=3&ft=eXd.6Hk_Myq8Z6S3-he2NGOjml7Gb&mime_type=video_mp4&qs=0&rc=aWRlOGg6ZThkNWRkZ2U4Z0BpM242ZGk6ZnY6PDMzZjgzM0A1MDRiMC1eXzAxLmIzMF5fYSNhcG5qcjRncWtgLS1kL2Nzcw%3D%3D&l=20220829035248010245040102139B17DB&btag=80000",
        author: "VanToan",
    },
    {
        thumbnail: "https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037-aiso/77608d3e63c3426f871381a852c8c050?x-expires=1661763600&x-signature=ipRMCwBI3Y482evXneb7Cwa66dU%3D",
        video: "https://v16-webapp.tiktok.com/2335f2a5b68652fb2127861057ba2e0f/630c8c7d/video/tos/useast2a/tos-useast2a-pve-0037-aiso/89e41acd2f554671865e06b66600b096/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2484&bt=1242&cs=0&ds=3&ft=eXd.6Hk_Myq8Z6S3-he2NGOjml7Gb&mime_type=video_mp4&qs=0&rc=aWRlOGg6ZThkNWRkZ2U4Z0BpM242ZGk6ZnY6PDMzZjgzM0A1MDRiMC1eXzAxLmIzMF5fYSNhcG5qcjRncWtgLS1kL2Nzcw%3D%3D&l=20220829035248010245040102139B17DB&btag=80000",
        author: "VanToan",
    },
    {
        thumbnail: "https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037-aiso/77608d3e63c3426f871381a852c8c050?x-expires=1661763600&x-signature=ipRMCwBI3Y482evXneb7Cwa66dU%3D",
        video: "https://v16-webapp.tiktok.com/2335f2a5b68652fb2127861057ba2e0f/630c8c7d/video/tos/useast2a/tos-useast2a-pve-0037-aiso/89e41acd2f554671865e06b66600b096/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2484&bt=1242&cs=0&ds=3&ft=eXd.6Hk_Myq8Z6S3-he2NGOjml7Gb&mime_type=video_mp4&qs=0&rc=aWRlOGg6ZThkNWRkZ2U4Z0BpM242ZGk6ZnY6PDMzZjgzM0A1MDRiMC1eXzAxLmIzMF5fYSNhcG5qcjRncWtgLS1kL2Nzcw%3D%3D&l=20220829035248010245040102139B17DB&btag=80000",
        author: "VanToan",
    },
]
const newsFeeds = () => {
    return (
        <>
            <div className="main-container">
                <ListShortVideo data={data} />
                <div className="post-detail-container">
                    <ListPost />
                </div>
            </div>
        </>
    )
}
export default memo(newsFeeds)