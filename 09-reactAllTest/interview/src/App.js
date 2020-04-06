import React, { useState } from 'react';
// import 'antd/dist/antd.css';
import './App.css';
import './a.scss';
import Header from './component/Header.js'
import { ThemeContext, useThemesContext, themes } from './context.js';
import Apps from './component/context/Apps'
// 组件的导入命名必须使用   首字母大写      的形式来使用
import FancyBorder from './component/comtest/FancyBorder';
import WelcomeDialog from './component/comtest/WelcomeDialog'
import NameForm from './component/nameForm/NameForm'
import NameForm2 from './component/nameForm/NameForm2'
import Calculator from './component/boilingVerdict/Calculator';
import HookTest from './component/hookTest/HookTest'
import Friend from './component/hookTest/Friend'
function App () {
  // 3
  const [a, setA] = useState("dark");
  // 4
  let handclick = () => {
    // OK实验成功,所有的子组件都可以被渲染掉
    if (a === 'dark') {
      setA("light")
    } else {
      setA("dark")
    }
  }
  return (
    <div className="App">
      <h1 style={{ margin: "0 auto" }}>effectHook</h1>
      {/* <HookTest></HookTest> */}
      <Friend></Friend>
      <hr />
      <h1 style={{ margin: "0 auto" }}>受控组件</h1>
      <NameForm></NameForm>
      <br />
      <h1 style={{ margin: "0 auto" }}>非受控组件</h1>
      <NameForm2></NameForm2>
      <br />
      <hr />
      {/* 2 */}
      {/* a:{a} */}
      {/* 1 */}
      {/* <ThemeContext.Provider value={a}>
        <Header></Header>
      </ThemeContext.Provider> */}
      {/* <button onClick={handclick}>App里面的点击切换</button> */}
      {/* <Apps></Apps> */}
      <hr />
      <h1 style={{ margin: "0 auto" }}>组件化方式</h1>
      {/* <FancyBorder /> */}
      <hr />
      {/* <WelcomeDialog /> */}
      <hr />
      <h1 style={{ margin: "0 auto" }}>状态提升</h1>
      <Calculator></Calculator>
    </div>
  );
}

export default App;
