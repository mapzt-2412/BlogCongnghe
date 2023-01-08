import React, { memo, useState } from "react";
import Path from "../components/Path";
import SidebarItem from "../components/SideBar/SidebarItem";
import HelpItems from "../components/SideBar/HelpItems.json";
import RegulationForum from "../components/HelpItems/RegulationForum";
import NegotiateService from "../components/HelpItems/NegotiateService";
import PostNews from "../components/HelpItems/PostNews";
import BannedNick from "../components/HelpItems/BannedNick";

const Help = () => {
  const [key, setKey] = useState("1");
  const onChange = (key: string) => {
    setKey(key);
  };
  return (
    <>
      <div className="medium-container">
        <Path data={{ content: "Trợ giúp " }} />
        <div className="profile-user-content">
          <div className="profile-menu dashboard-detail">
            {HelpItems.map((item, index) => (
              <SidebarItem
                key={index}
                item={item}
                onChange={onChange}
                count={key}
              />
            ))}
          </div>
          <div className="profile-list-post">
            {key === "1" && <RegulationForum />}
            {key === "2" && <NegotiateService />}
            {key === "3" && <PostNews />}
            {key === "4" && <BannedNick />}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Help);
