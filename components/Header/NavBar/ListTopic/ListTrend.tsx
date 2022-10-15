import React, { memo } from "react";
import { useRouter } from "next/router";
import { Dropdown, Menu, Space } from "antd";

const ListTrend = ({ title, data }) => {
  const router = useRouter();
  const handleClick = (name) => {
    router.push(`/list-post/${name}`);
  };
  // const menu = (
  //   <Menu
  //     onClick={handleClick}
  //     items={[
  //       {
  //         key: "1",
  //         label: <div>Tài khoản cá nhân</div>,
  //       },
  //       {
  //         key: "2",
  //         label: <div>Đăng xuất</div>,
  //       },
  //     ]}
  //   />
  // );
  return (
    <div className="dropdown-navbar-item">
      {/* <div className="dropdown-navbar-item-title">
                <p>{title}</p>
            </div> */}
      <div className="dropdown-navbar-item-content">
                {
                    data.map((value, index) => (
                        <div className="dropdown-navbar-item-content-item" onClick ={() => handleClick(value.name)}>
                            <p> {value.name}</p>
                        </div>
                    ))
                }
            </div>
      {/* <Dropdown overlay={menu} placement="bottom" className="dropdown-navbar-item-content">
      {
                    data.map((value, index) => (
                        <div className="dropdown-navbar-item-content-item" onClick ={() => handleClick(value.name)}>
                            <p> {index + 1 + ". " + value.name}</p>
                        </div>
                    ))
                }
      </Dropdown> */}
    </div>
  );
};
export default memo(ListTrend);
