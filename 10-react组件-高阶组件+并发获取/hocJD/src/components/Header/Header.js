import React, { useState } from 'react'
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
const Item = Menu.Item;
export default function Header () {
  const [current, setCurrent] = useState('Page1')
  const handleClick = (e) => {
    setCurrent(e.key)
  }

  return (
    <div>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="Page1">
          <NavLink to="Page1">Page1</NavLink>
        </Item>
      </Menu>
    </div>
  )
}
