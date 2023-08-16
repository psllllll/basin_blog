import './Header.less'
import Logo from "../../assets/logo.png"
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd'
import type { MenuProps } from 'antd';
import React, { useContext, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { MailOutlined, SettingOutlined,YuqueOutlined } from '@ant-design/icons';
import { useState } from 'react';
function useActive(currentPath: string, path: string): string {
  return currentPath === path ? "ant-menu-item-selected" : ""
}
const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: 'home',
    icon: <MailOutlined />,
  },
  {
    label: 'contact',
    key: 'contact',
    icon: <YuqueOutlined />,

  },
  {
    label: 'Goto',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
];
const Header:React.FC = function () {

  const [current, setCurrent] = useState('mail');
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <div className='header_content'>
      <div className='header_logo'>
        <img src={Logo} alt='logo' />
      </div>
      <div className='header_name'>盆子的博客</div>
      <div className='menu_content'>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item>
              <Link to="/home">主页</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/login">登录</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/register">注册</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/register">个人简历</Link>
            </Menu.Item>
        </Menu>
      </div>
    </div>
  )
}
export default Header;