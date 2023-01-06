import React, {
  memo,
  useState,
  useRef,
  useEffect,
  InputHTMLAttributes,
} from "react";
import AvatarDefaultSmall from "../../../assets/icon/AvatarDefaultSmall";
import { formatDate } from "../../../libs/common";
import Image from "next/image";
import { Input } from "antd";
import PropertiesService from "../../../services/properties.service";
import { useRouter } from "next/router";
import { getToken } from "../../../libs/common";
import userService from "../../../services/user.service";
import IconLike from "../../../assets/icon/IconLike";
import IconLikeActive from "../../../assets/icon/IconLikeActive";
import IconReply from "../../../assets/icon/IconReply";
import IconShare from "../../../assets/icon/IconShare";

const Comment = ({ data, level, handleInteractiveLastChild }) => {
  const [isShowReply, setIsShowReply] = useState(false);
  const [isShowInput, setIsShowInput] = useState(false);
  const [like, setLike] = useState(data?.liked ? data?.liked : false);
  const [dislike, setDislike] = useState(
    data?.disliked ? data?.disliked : false
  );
  const [likeNum, setLikeNum] = useState(data?.likeNum ? data?.likeNum : 0);
  const [dislikeNum, setDislikeNum] = useState(
    data?.dislikeNum ? data?.dislikeNum : 0
  );
  const [comment, setComment] = useState(data?.children);
  const [cmtAuthor, setCmtAuthor] = useState("");
  const refInput = useRef<HTMLInputElement>();
  const CmtLevel = level ? level : 0;
  const { id } = useRouter().query;
  const [requestData, setRequestData] = useState({});
  const handleShowReply = () => {
    setIsShowReply(!isShowReply);
  };
  useEffect(() => {
    if (id) {
      setRequestData((pre) => ({ ...pre, articleId: id }));
    }
  }, [id]);

  const handleChangeInput = (e) => {
    setRequestData({ ...requestData, comment: e.target.value });
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 8 && cmtAuthor !== "" && requestData?.comment === "") {
      setCmtAuthor("");
    } else if (e.keyCode === 13) {
      PropertiesService.commentArticle(requestData, getToken()).then((data) => {
        if (comment) {
          setComment([...comment, data.data.data]);
        }
      });
      setRequestData({ ...requestData, comment: "" });
    }
  };

  const handleInteractive = (message, author) => {
    setRequestData({ ...requestData, parentsId: id });
    console.log(requestData);
    if (message === "reply") {
      if (level === 1) {
        handleInteractiveLastChild(message, author);
      } else {
        setIsShowInput(true);
        setTimeout(() => refInput?.current?.focus(), 0);
        if (comment === "") {
          setCmtAuthor(`@${author} `);
        }
      }
    }
  };

  const togglelike = () => {
    userService
      .toggleLikeCmt({ commentId: data?.id, status: !like }, getToken())
      .then((data) => {
        setLike(data.data.data.like);
        setDislike(data.data.data.dislike);
        setDislikeNum(data.data.data.dislikeNum);
        setLikeNum(data.data.data.likeNum);
      });
  };

  const toggleDislike = () => {
    userService
      .toggleDislikeCmt({ commentId: data?.id, status: !dislike }, getToken())
      .then((data) => {
        setLike(data.data.data.like);
        setDislike(data.data.data.dislike);
        setDislikeNum(data.data.data.dislikeNum);
        setLikeNum(data.data.data.likeNum);
      });
  };
  return (
    <div className={`first-level-comment comment`}>
      <div className="comment-wrapper">
        <div className="comment-avatar">
          {data.user.avatar ? (
            <div className="avatar-small">
              <Image src={data.user.avatar} width={32} height={32} alt="avatar" />
            </div>
          ) : (
            <AvatarDefaultSmall width={32} height={32} />
          )}
        </div>
        <div className="comment-content">
          <div className="comment-info">
            <p>{data?.user?.nickname}</p>
            <span className="italic">{formatDate(data?.createdAt)}</span>
          </div>
          <p>{data.content}</p>
        </div>
      </div>
      <div className="comment-interactive">
        {like ? (
          <p onClick={togglelike}>
            {`${likeNum} `}
            <IconLikeActive />{" "}
          </p>
        ) : (
          <p onClick={togglelike}>
            {`${likeNum} `}
            <IconLike />
          </p>
        )}
        {dislike ? (
          <p onClick={toggleDislike} className="dislike">
            {`${dislikeNum} `}
            <IconLikeActive />
          </p>
        ) : (
          <p onClick={toggleDislike} className="dislike">
            {`${dislikeNum} `}
            <IconLike />
          </p>
        )}
        <p onClick={() => handleInteractive("reply", data?.user.username)}>
          Phản hồi
        </p>
      </div>
      {comment?.length > 1 && !isShowReply ? (
        <>
          <div className="child-level-comment comment">
            <Comment
              data={comment[0]}
              level={CmtLevel + 1}
              handleInteractiveLastChild={handleInteractive}
            />
            <p
              className="see-more"
              onClick={handleShowReply}
            >{`Xem Thêm bình luận cũ hơn`}</p>
          </div>
        </>
      ) : (
        comment?.map((secondValue, index) => (
          <div className="child-level-comment comment" key={index}>
            <Comment
              data={secondValue}
              level={CmtLevel + 1}
              handleInteractiveLastChild={handleInteractive}
            />
          </div>
        ))
      )}
      <div className={"comment-input-reply " + (isShowInput ? "show" : "hide")}>
        <span>{cmtAuthor}</span>
        <input
          placeholder={cmtAuthor === "" ? "Viết bình luận" : ""}
          ref={refInput}
          value={requestData?.comment}
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};
export default memo(Comment);
