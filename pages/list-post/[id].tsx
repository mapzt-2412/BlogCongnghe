import React, { useState, useEffect, useCallback } from "react";
import ListPost from "../../components/ListPost/ListPost";
import { Col, Row } from "antd";
import HotTags from "../../components/Home/RightBar/HotTags";
import HotComments from "../../components/Home/RightBar/HotComments";
import Path from "../../components/Path";
import { useRouter } from "next/router";
import articleService from "../../services/article.service";

const tags = ["IOS", "IOS", "IOS", "IOS", "IOS", "IOS", "IOS"];
const comments = [
  {
    content:
      "Mình thích mấy mẫu của Devilcase, mà dòng P6 thì Devilcase chỉ làm có 1 mẫu, đơn điệu quá. Trên Shoppee với Lazada thì đa số toàn ốp đểu.",
    reply: "2",
  },
  {
    content:
      "Thân thiện với môi trường là cách họ.....bán hàng thôi. Sp nào trên quả đất này được sinh ra mà không ảnh hưởng đến môi trường? Sử dụng điện và thải ra chất thải... Samsung tôi nhớ lúc ra S4 thì cái hộp nó chả khác gì hộp cạc tông xấu quắc với lí do là tái chế và giảm......thân thiện với môi trường. Bây giờ thì sao? Sam nó hết thân thiện MT rồi. Hộp in có màu săc.. và bỏ củ sạc cũng viện cớ là giảm bớt rác thải.....tin nó mới lạ. Hahahaha",
    reply: "5",
  },
  {
    content:
      "Mình thích mấy mẫu của Devilcase, mà dòng P6 thì Devilcase chỉ làm có 1 mẫu, đơn điệu quá. Trên Shoppee với Lazada thì đa số toàn ốp đểu.",
    reply: "1",
  },
  {
    content:
      "Mình thích mấy mẫu của Devilcase, mà dòng P6 thì Devilcase chỉ làm có 1 mẫu, đơn điệu quá. Trên Shoppee với Lazada thì đa số toàn ốp đểu.",
    reply: "2",
  },
];

const ListTopicByPost = () => {
  const { id, name } = useRouter().query;
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const handleReadMore = useCallback(() => {
    setPage((pre) => pre + 1);
  }, []);
  console.log(useRouter());
  useEffect(() => {
    if (name) {
      articleService
        .getArticlesByTag(name, { page: page })
        .then((data) => setData((pre) => [...pre, ...data.data.data]));
    } else if (id) {
      articleService
        .getArticlesByTopic(id, { page: page })
        .then((data) => setData((pre) => [...pre, ...data.data.data]));
    }
  }, [id, name, page]);
  return (
    <div className="main-container">
      <div className="list-post-header">
        <Path data={{ content: [name ? name : id] }} />
      </div>
      <Row>
        <Col span={16}>
          <ListPost
            data={data}
            id={name ? name : id}
            handleReadMore={handleReadMore}
          />
        </Col>
        <Col span={8}>
          <HotTags tags={tags} />
          <HotComments comments={comments} />
        </Col>
      </Row>
    </div>
  );
};
export default ListTopicByPost;
