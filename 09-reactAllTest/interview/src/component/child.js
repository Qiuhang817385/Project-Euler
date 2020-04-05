import React, { Component } from 'react'
import { ThemeContext, useThemesContext } from '../context.js'
import { observer } from 'mobx-react';
export default class Child extends Component {
  constructor(props) {
    super(props)
    this.state = {
      childNmu: 0
    }
  }
  componentDidMount () {
    console.log('C-didmount');
    console.log('this.context :', this.context);
    // 这种情况,可以不经过最顶级的组件的Provider,直接挂载就可以了
    // 但是我想用light怎么办?
  }
  componentWillMount () {
    console.log('C-willmount')
  }
  componentWillUpdate () {
    console.log('C-willupdate')
  }
  componentDidUpdate () {
    console.log('this.context :', this.context);
    console.log('C-didupdate')
  }
  bindClick = () => {
    this.setState({
      childNmu: 10
    })
  }
  // static contextType = ThemeContext;

  render () {
    console.log('this:', this);
    console.log(this.context)
    let themes = this.context;
    console.log('C-render');
    return (
      // 这是第二种写法
      <ThemeContext.Consumer>
        {
          (theme) => (
            <div>
              {/* 两种方式都可以使用
                1.把需要的数据从this.context当中取出来
                2.利用consumer直接传递一个theme的参数,然后在函数体当中使用它
               */}
              这里是consumer的用法theme:{themes}/{theme}
              <br />
              child
              <br />
              {/* {this.context} */}
              {this.state.childNmu}
              <br />
              {/* <button onClick={this.bindClick}>child</button> */}
            </div>
          )
        }
      </ThemeContext.Consumer>
    )
  }
}
// child.contextType = ThemeContext;
// 就算父元素没有provider  也可以拿到ThemeContext的默认值
// 5
Child.contextType = ThemeContext;
// Child.contextType = useThemesContext;
//  因为上面导入了


// API

// React.createContext
// Context.Provider
// Class.contextType
// Context.Consumer
// Context.displayName