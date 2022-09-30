import type { MenuProps, MenuTheme } from 'antd';
import { Menu, Switch } from 'antd';
import React, { useState, memo } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const ListTopic = () => {
    const [theme, setTheme] = useState<MenuTheme>('light');
  const [current, setCurrent] = useState('1');

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
  };

  const items: MenuItem[] = [
    getItem(
      'Navigation One',
      'sub1',
      "",
      [getItem('Option 1', '1'), getItem('Option 2', '2'), getItem('Option 3', '3')],
    ),
    getItem(
      'Navigation One',
      'sub2',
      "",
      [getItem('Option 1', '1'), getItem('Option 2', '2'), getItem('Option 3', '3')],
    ),
    getItem(
      'Navigation One',
      'sub3',
      "",
      [getItem('Option 1', '1'), getItem('Option 2', '2'), getItem('Option 3', '3')],
    ),
  ];
  return (
    <div className="dropdown-navbar-item">
      <div className="dropdown-navbar-item-title">
        <p>Danh sách chủ đề</p>
      </div>
    <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="vertical"
        items={items}
      />
    </div>
  )
  }
  export default memo(ListTopic)