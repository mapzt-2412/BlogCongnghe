import { Input } from "antd";
import React, { memo } from "react";
import IconSearch from "../../assets/icon/IconSearch";
import Logo from "../../assets/icon/Logo";

const Header = () => {
    return (
        <div className="header-container">
            <div className="header-logo">
                <Logo/>
                <div className="header-search">
                    <Input placeholder="Nhập từ khóa tìm kiếm" prefix={<IconSearch />} />
                </div>
            </div>
            <div className="header-profile">
                
            </div>

        </div>
    )
}
export default memo(Header);