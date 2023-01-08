import React, { memo, useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Rate, Menu } from "antd";
import Path from "../../../components/Path";
import SidebarItem from "../../../components/SideBar/SidebarItem";
import Sidebar from "../../../components/SideBar/Sidebar.json";
import ListPost from "../../../components/ListPost/ListPost";
import { getId, getToken } from "../../../libs/common";
import PropertiesService from "../../../services/properties.service";
import DashboardInfo from "../../../components/DashboardInfo/Dashboard-Info";
import DashboardPassword from "../../../components/DashboardInfo/Dashboard-Password";
import Follower from "../../../components/Follower/Follower";
import { ROUTE_HOME } from "../../../libs/constants";
import NotificationArticle from "../../../components/DashboardInfo/NotificationArticle";
import userService from "../../../services/user.service";
import Level from "./level";
import ShortVideo from "./shortVideo";

const Dashboard = () => {
  const { id } = useRouter().query;
  const [value, setValue] = useState(3);
  const [token, setToken] = useState<string | false | undefined>();
  const [key, setKey] = useState("2");
  const [data, setData] = useState();
  const [dataBookmark, setDataBookmark] = useState();
  const [dataDraft, setDataDraft] = useState([]);
  const [page, setPage] = useState(1);
  const [level, setLevel] = useState();
  const refDiv = useRef<HTMLElement>(null);

  const handleReadMore = useCallback(() => {
    setPage((pre) => pre + 1);
  }, []);
  const deleteArticle = useCallback(
    (id) => {
      PropertiesService.deleteArticle({ articleId: id }, getToken()).then(
        (data) => {
          PropertiesService.getArticleByUser(token, page).then((data) =>
            setData(data.data.data)
          );
        }
      );
    },
    [page, token]
  );

  const deleteDraft = useCallback(
    (id) => {
      PropertiesService.deleteDraft({ draftId: id }, getToken()).then(
        (data) => {
          PropertiesService.getDraftByUser(token).then((data) =>
            setDataDraft(data.data.data)
          );
        }
      );
    },
    [token]
  );
  useEffect(() => {
    if (getToken()) {
      setToken(getToken());
    }
  }, []);

  useEffect(() => {
    if (token) {
      PropertiesService.getBookMark(token).then((data) =>
        setDataBookmark(data.data.data.interactives)
      );
      PropertiesService.getDraftByUser(token).then((data) =>
        setDataDraft(data.data.data)
      );
      userService.getLevel(token).then((data) => {
        setLevel(data.data.data);
      });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      if (page === 1) {
        PropertiesService.getArticleByUser(token, page).then((data) =>
          setData(data.data.data)
        );
      } else {
        PropertiesService.getArticleByUser(token, page).then((data) => {
          setData((pre) => [...pre, ...data.data.data]);
          refDiv.scrollTop = refDiv.scrollHeight;
        });
      }
    }
  }, [page, token]);

  const onChange = (key: string) => {
    setKey(key);
  };

  const router = useRouter();
  if (getToken() === false) {
    router.push(ROUTE_HOME);
  }
  return (
    <div className="medium-container" ref={refDiv}>
      <Path data={{ title: ["Trang cá nhân"], content: id }} />
      <div className="profile-user-content">
        <div className="profile-menu dashboard-detail">
          {/* <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        items={menuItems}
                    /> */}

          {Sidebar.map((item, index) => (
            <SidebarItem
              key={index}
              item={item}
              onChange={onChange}
              count={key}
            />
          ))}
        </div>
        <div className="profile-list-post">
          {key === "1" && (
            <ListPost
              data={dataDraft}
              id={"Bài viết nháp"}
              type={"dashboard-draft"}
              setData={setDataDraft}
              deleteDraft={deleteDraft}
              handleReadMore={handleReadMore}
            />
          )}
          {key === "2" && (
            <ListPost
              data={data}
              id={"Bài viết đã đăng"}
              type={"dashboard-article"}
              setData={setData}
              deleteArticle={deleteArticle}
              handleReadMore={handleReadMore}
            />
          )}
          {key === "3" && <ShortVideo />}

          {key === "4" && <DashboardInfo />}
          {key === "4" && <DashboardInfo />}
          {key === "5" && <DashboardPassword />}
          {key === "6" && <Follower type={"2"} id={getId()} />}
          {key === "7" && <Follower type={"3"} id={getId()} />}
          {key === "8" && (
            <ListPost data={dataBookmark} id={"Bài viết đã đăng"} />
          )}
          {key === "10" && <NotificationArticle />}
          {key === "9" && <Level level={level} />}
        </div>
      </div>
    </div>
  );
};
export default memo(Dashboard);
