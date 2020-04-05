import React from 'react';
import { ThemeContext, themes } from './theme-context';
import ThemeTogglerButton from './theme-toggler-button';

// 如果传递对象的话,必须把整个state传递进去了
export default class Apps extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };

    // State 也包含了更新函数，因此它会被传递进 context provider。
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render () {
    // 整个 state 都被传递进 provider
    return (
      // 把整个state传递进去
      <ThemeContext.Provider value={this.state}>
        <Content />
      </ThemeContext.Provider>
    );
  }
}
function Content () {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}