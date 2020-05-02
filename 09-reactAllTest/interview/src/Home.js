import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
export default class Home extends Component {
  render () {
    return (
      <div>
        <div>
          <Menu mode="horizontal">
            <Menu.Item key="friend">
              <Link to="/friend">friend</Link>
            </Menu.Item>
            <Menu.Item key="hookTest">
              <Link to="/hookTest">hook-Demo</Link>
            </Menu.Item>
            <Menu.Item key="nameForm">
              <Link to="/nameForm">受控组件</Link>
            </Menu.Item>
            <Menu.Item key="nameForm2">
              <Link to="/nameForm2">非受控组件</Link>
            </Menu.Item>
            <Menu.Item key="welcomeDialog">
              <Link to="/welcomeDialog">组件化方式-类Slot</Link>
            </Menu.Item>
            <Menu.Item key="calculator">
              <Link to="/calculator">状态提升</Link>
            </Menu.Item>
            <Menu.Item key="apps">
              <Link to="/apps">ContextAPI-切换主题</Link>
            </Menu.Item>
            <Menu.Item key="hook">
              <Link to="/hook">Hook测试reducer</Link>
            </Menu.Item>
          </Menu>
        </div>
        {this.props.children}
      </div>
    )
  }
}
