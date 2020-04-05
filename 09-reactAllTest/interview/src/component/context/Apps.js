import React from 'react';
import { useThemesContext, themes } from '../../context';
import Toolbar from './Toolbar'
export default class Apps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };
    this.toggleTheme = () => {
      this.setState(state => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark,
      }));
    };
  }
  render () {
    // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
    // 而外部的组件使用默认的 theme 值
    return (
      <>
        {/* 当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。
              value发生改变之后 
         */}
        <useThemesContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </useThemesContext.Provider>
        <div>
          <Toolbar />
        </div>
      </>
    );
  }
}