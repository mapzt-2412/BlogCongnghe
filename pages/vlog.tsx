import { Col, Row } from "antd";
import React, { memo, useState } from "react";
import VlogCard from "../components/Vlog/VlogCard";

const Vlog = () => {
  const [data, setData] = useState([
    {
      title: "Vlog ne xem di hay lam do nha",
      content:
        "https://v16-webapp.tiktok.com/f917b994cffc7c245e1b802abc30db7b/63725533/video/tos/useast2a/tos-useast2a-pve-0037-aiso/3c5ea2322edc4e47b5878c060414339b/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=3266&bt=1633&cs=0&ds=3&ft=kLO5qy-gZmo0PCnpwBkVQi-nDiHKJdmC0&mime_type=video_mp4&qs=0&rc=NzQzZzYzOmczZDo3aDdmZkBpamtzc2c6Zmk5ZzMzZjgzM0AyLmE2LTIwXjMxNTM1XjJjYSNtLTVgcjRfNWlgLS1kL2Nzcw%3D%3D&l=2022111408480301025100915406035D8D&btag=80000",
    },
    {
      title: "Vlog ne xem di hay lam do nha",
      content:
        "https://v16-webapp.tiktok.com/f917b994cffc7c245e1b802abc30db7b/63725533/video/tos/useast2a/tos-useast2a-pve-0037-aiso/3c5ea2322edc4e47b5878c060414339b/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=3266&bt=1633&cs=0&ds=3&ft=kLO5qy-gZmo0PCnpwBkVQi-nDiHKJdmC0&mime_type=video_mp4&qs=0&rc=NzQzZzYzOmczZDo3aDdmZkBpamtzc2c6Zmk5ZzMzZjgzM0AyLmE2LTIwXjMxNTM1XjJjYSNtLTVgcjRfNWlgLS1kL2Nzcw%3D%3D&l=2022111408480301025100915406035D8D&btag=80000",
    },
    {
      title: "Vlog ne xem di hay lam do nha",
      content:
        "https://v16-webapp.tiktok.com/f917b994cffc7c245e1b802abc30db7b/63725533/video/tos/useast2a/tos-useast2a-pve-0037-aiso/3c5ea2322edc4e47b5878c060414339b/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=3266&bt=1633&cs=0&ds=3&ft=kLO5qy-gZmo0PCnpwBkVQi-nDiHKJdmC0&mime_type=video_mp4&qs=0&rc=NzQzZzYzOmczZDo3aDdmZkBpamtzc2c6Zmk5ZzMzZjgzM0AyLmE2LTIwXjMxNTM1XjJjYSNtLTVgcjRfNWlgLS1kL2Nzcw%3D%3D&l=2022111408480301025100915406035D8D&btag=80000",
    },
    {
      title: "Vlog ne xem di hay lam do nha",
      content:
        "https://v16-webapp.tiktok.com/f917b994cffc7c245e1b802abc30db7b/63725533/video/tos/useast2a/tos-useast2a-pve-0037-aiso/3c5ea2322edc4e47b5878c060414339b/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=3266&bt=1633&cs=0&ds=3&ft=kLO5qy-gZmo0PCnpwBkVQi-nDiHKJdmC0&mime_type=video_mp4&qs=0&rc=NzQzZzYzOmczZDo3aDdmZkBpamtzc2c6Zmk5ZzMzZjgzM0AyLmE2LTIwXjMxNTM1XjJjYSNtLTVgcjRfNWlgLS1kL2Nzcw%3D%3D&l=2022111408480301025100915406035D8D&btag=80000",
    },
    {
      title: "Vlog ne xem di hay lam do nha",
      content:
        "https://v16-webapp.tiktok.com/f917b994cffc7c245e1b802abc30db7b/63725533/video/tos/useast2a/tos-useast2a-pve-0037-aiso/3c5ea2322edc4e47b5878c060414339b/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=3266&bt=1633&cs=0&ds=3&ft=kLO5qy-gZmo0PCnpwBkVQi-nDiHKJdmC0&mime_type=video_mp4&qs=0&rc=NzQzZzYzOmczZDo3aDdmZkBpamtzc2c6Zmk5ZzMzZjgzM0AyLmE2LTIwXjMxNTM1XjJjYSNtLTVgcjRfNWlgLS1kL2Nzcw%3D%3D&l=2022111408480301025100915406035D8D&btag=80000",
    },
    {
      title: "Vlog ne xem di hay lam do nha",
      content:
        "https://v16-webapp.tiktok.com/f917b994cffc7c245e1b802abc30db7b/63725533/video/tos/useast2a/tos-useast2a-pve-0037-aiso/3c5ea2322edc4e47b5878c060414339b/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=3266&bt=1633&cs=0&ds=3&ft=kLO5qy-gZmo0PCnpwBkVQi-nDiHKJdmC0&mime_type=video_mp4&qs=0&rc=NzQzZzYzOmczZDo3aDdmZkBpamtzc2c6Zmk5ZzMzZjgzM0AyLmE2LTIwXjMxNTM1XjJjYSNtLTVgcjRfNWlgLS1kL2Nzcw%3D%3D&l=2022111408480301025100915406035D8D&btag=80000",
    },
    {
      title: "Vlog ne xem di hay lam do nha",
      content:
        "https://v16-webapp.tiktok.com/f917b994cffc7c245e1b802abc30db7b/63725533/video/tos/useast2a/tos-useast2a-pve-0037-aiso/3c5ea2322edc4e47b5878c060414339b/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=3266&bt=1633&cs=0&ds=3&ft=kLO5qy-gZmo0PCnpwBkVQi-nDiHKJdmC0&mime_type=video_mp4&qs=0&rc=NzQzZzYzOmczZDo3aDdmZkBpamtzc2c6Zmk5ZzMzZjgzM0AyLmE2LTIwXjMxNTM1XjJjYSNtLTVgcjRfNWlgLS1kL2Nzcw%3D%3D&l=2022111408480301025100915406035D8D&btag=80000",
    },
    {
      title: "Vlog ne xem di hay lam do nha",
      content:
        "https://v16-webapp.tiktok.com/f917b994cffc7c245e1b802abc30db7b/63725533/video/tos/useast2a/tos-useast2a-pve-0037-aiso/3c5ea2322edc4e47b5878c060414339b/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=3266&bt=1633&cs=0&ds=3&ft=kLO5qy-gZmo0PCnpwBkVQi-nDiHKJdmC0&mime_type=video_mp4&qs=0&rc=NzQzZzYzOmczZDo3aDdmZkBpamtzc2c6Zmk5ZzMzZjgzM0AyLmE2LTIwXjMxNTM1XjJjYSNtLTVgcjRfNWlgLS1kL2Nzcw%3D%3D&l=2022111408480301025100915406035D8D&btag=80000",
    },
    {
      title: "Vlog ne xem di hay lam do nha",
      content:
        "https://v16-webapp.tiktok.com/f917b994cffc7c245e1b802abc30db7b/63725533/video/tos/useast2a/tos-useast2a-pve-0037-aiso/3c5ea2322edc4e47b5878c060414339b/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=3266&bt=1633&cs=0&ds=3&ft=kLO5qy-gZmo0PCnpwBkVQi-nDiHKJdmC0&mime_type=video_mp4&qs=0&rc=NzQzZzYzOmczZDo3aDdmZkBpamtzc2c6Zmk5ZzMzZjgzM0AyLmE2LTIwXjMxNTM1XjJjYSNtLTVgcjRfNWlgLS1kL2Nzcw%3D%3D&l=2022111408480301025100915406035D8D&btag=80000",
    },
    {
      title: "Vlog ne xem di hay lam do nha",
      content:
        "https://v16-webapp.tiktok.com/f917b994cffc7c245e1b802abc30db7b/63725533/video/tos/useast2a/tos-useast2a-pve-0037-aiso/3c5ea2322edc4e47b5878c060414339b/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=3266&bt=1633&cs=0&ds=3&ft=kLO5qy-gZmo0PCnpwBkVQi-nDiHKJdmC0&mime_type=video_mp4&qs=0&rc=NzQzZzYzOmczZDo3aDdmZkBpamtzc2c6Zmk5ZzMzZjgzM0AyLmE2LTIwXjMxNTM1XjJjYSNtLTVgcjRfNWlgLS1kL2Nzcw%3D%3D&l=2022111408480301025100915406035D8D&btag=80000",
    },
  ]);
  return (
    <div className="main-container">
      <Row gutter={16}>
        {data.map((value, index) => (
          <Col className="gutter-row" span={6} key={index}>
            <VlogCard data={value} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default memo(Vlog);
