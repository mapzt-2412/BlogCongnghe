import { useRouter } from "next/router";
import React, { memo, useEffect, useState } from "react";
import ListPost from "../../components/ListPost/ListPost";
import PropertiesService from "../../services/properties.service";
const searchField = () => {
    const {keyword} = useRouter().query;
    const [data, setData] = useState();
    useEffect(() => {
        if(keyword) {
            console.log(keyword);
            PropertiesService.search(keyword).then((data) => {setData(data.data.data)})
        }
    },[keyword])
    return<>
        <div className="post-detail-container">
            <ListPost data={data} id={"Kết quả tìm kiếm"} />
        </div>
    </>
}

export default memo(searchField);