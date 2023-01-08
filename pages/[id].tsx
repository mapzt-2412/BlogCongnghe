import React, {
  memo,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import Path from "../components/Path";
import { useRouter } from "next/router";
import Image from "next/image";
import { Rate, Menu, Button } from "antd";
import AvatarDefaultSmall from "../assets/icon/AvatarDefaultSmall";
import ListPost from "../components/ListPost/ListPost";
import PropertiesService from "../services/properties.service";
import { getToken, getId, renderLevel } from "../libs/common";
import Follower from "../components/Follower/Follower";
import ModalReport from "../components/ModalReport/ModalReport";
import { UserInfo } from "./_app.js";
import { ROUTE_HOME } from "../libs/constants";
import userService from "../services/user.service";

const Profile = (props) => {
  const { userInfo, setUserInfo, setChatBox } = useContext(UserInfo);
  const { id } = useRouter().query;
  const [value, setValue] = useState(3);
  const [token, setToken] = useState();
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const [listPost, setListPost] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const [key, setKey] = useState("1");
  const [placement, SetPlacement] = useState("");
  const [isFollow, setIsFollow] = useState(false);

  const placementChange = (e) => {
    SetPlacement(e.target.value);
  };

  const handleChangeInput = (e) => {
    setReportContent(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (getToken()) {
      setToken(getToken());
    }
  }, []);

  const handleOpenChatBox = () => {
    setChatBox((pre) => ({
      nickname: userInfo?.data.nickname,
      id: userInfo?.data.id,
    }));
  };

  useEffect(() => {
    if (token) {
      if (id) {
        PropertiesService.getUserInfo(id, token).then((data) => {
          setUserInfo((pre) => ({ ...pre, data: data.data.data }));
          setIsFollow(data.data.data.isFollow);
        });
        PropertiesService.getArticleByUserId(id, page).then((data) =>
          setListPost((pre) => [...pre, ...data.data.data])
        );
      }
    }
  }, [token, id, setUserInfo, page]);
  const handleReadMore = useCallback(() => {
    setPage((pre) => pre + 1);
  }, []);
  const handleReport = () => {
    PropertiesService.sendReportUser(
      { userReportedId: id, description: reportContent, type: placement },
      getToken()
    ).then((data) => {
      alert("Báo cáo thành công");
      handleCancel();
    });
  };
  const handleClick = (key) => {
    setKey(key.key);
  };
  const contact = [
    {
      title: "Email:",
      value: userInfo?.data?.email,
    },
    {
      title: "Điện thoại:",
      value: userInfo?.data?.phone ? userInfo?.data.phone : "Chưa có thông tin",
    },
  ];
  const info = [
    {
      title: "Bài đã đăng:",
      value: userInfo?.data.articleNum ? userInfo?.data.articleNum : 0,
    },
    {
      title: "Người theo dõi:",
      value: userInfo?.data.followedNum ? userInfo?.data.followedNum : 0,
    },
    {
      title: "Người đang theo dõi:",
      value: userInfo?.data.followingNum ? userInfo?.data.followingNum : 0,
    },
  ];
  const menuItems = [
    {
      label: "Danh sách bài viết:",
      key: "1",
    },
    {
      label: "Người theo dõi:",
      key: "2",
    },
    {
      label: "Người đang theo dõi:",
      key: "3",
    },
  ];

  const router = useRouter();
  if (getToken() === false) {
    router.push(ROUTE_HOME);
  }
  const handleToggleFollow = useCallback(() => {
    if (isFollow) {
      userService
        .userUnFollow({ userFollowedId: id }, getToken())
        .then(() => setIsFollow(false));
      return;
    }
    userService
      .userFollow({ userFollowedId: id }, getToken())
      .then(() => setIsFollow(true));
  }, [id, isFollow]);
  return (
    <div className="medium-container">
      <Path data={{ title: ["Trang cá nhân"], content: data?.username }} />
      <div className="profile-user-info">
        <div className="profile-user-info-avatar">
          {userInfo?.data.avatar ? (
            <div className="avatar-large">
              <Image
                src={userInfo?.data.avatar}
                width={104}
                height={104}
                layout="responsive"
                alt="avatar"
              />
            </div>
          ) : (
            <AvatarDefaultSmall width={104} height={104} white />
          )}
        </div>
        {id !== getId() && (
          <div className="profile-user-button">
            <Button onClick={handleToggleFollow}>
              {isFollow ? "Bỏ theo dõi" : "Theo dõi"}
            </Button>
            <Button onClick={handleOpenChatBox}>Nhắn tin</Button>
            <Button onClick={showModal}>Báo cáo người dùng</Button>
            <ModalReport
              isModalOpen={isModalOpen}
              handleCancel={handleCancel}
              handleReport={handleReport}
              reportContent={reportContent}
              handleChangeInput={handleChangeInput}
              placement={placement}
              placementChange={placementChange}
            />
          </div>
        )}
        <p>
          {userInfo?.data.nickname
            ? userInfo?.data.nickname
            : userInfo?.data.username}
        </p>
        <p>
          <span className="slash">Cấp độ thành viên:</span>{" "}
          {renderLevel(userInfo?.data.score)}
        </p>
        <div className="profile-user-contact">
          {contact.map((value, index) => (
            <div key={index} className="profile-user-contact-item">
              <span className="slash">{value.title}</span>
              {value.value}
            </div>
          ))}
        </div>
        <div className="profile-user-post">
          {info.map((value, index) => (
            <div
              key={index}
              className={
                index === 0
                  ? "profile-user-post-item first"
                  : "profile-user-post-item"
              }
            >
              <span className="slash">{value.title}</span>
              {value.value}
            </div>
          ))}
        </div>
      </div>
      <div className="profile-user-content">
        <div className="profile-menu">
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            items={menuItems}
            onClick={handleClick}
          />
        </div>
        <div className="profile-list-post">
          {key === "1" && (
            <ListPost
              data={listPost}
              id={"Danh sách bài viết"}
              handleReadMore={handleReadMore}
            />
          )}
          {key === "2" && <Follower type={"2"} id={id} />}
          {key === "3" && <Follower type={"3"} id={id} />}
        </div>
      </div>
    </div>
  );
};
export default memo(Profile);
