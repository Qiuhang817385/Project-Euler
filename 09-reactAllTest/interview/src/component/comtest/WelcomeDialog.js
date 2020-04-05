import React, { Component } from 'react'
import FancyBorder from './FancyBorder'
import './bar.css'
export default function WelcomeDialog () {
  return (
    <>
      {/* <FancyBorder> JSX 标签中的所有内容
        都会作为一个 children prop 
        传递给 FancyBorder 组件。

        因为 FancyBorder 将 {props.children} 渲染在一个 <div> 中，
        被传递的这些子组件最终都会出现在输出结果中。


        少数情况下，你可能需要在一个组件中预留出几个“洞”。
        这种情况下，我们可以不使用 children，而是自行约定：将所需内容传入 props，并使用相应的 prop。
        也就是具名插槽
     */}
      <FancyBorder color="red">
        <h1 className="Dialog-title">
          Welcome
      </h1>
        <p className="Dialog-message">
          Thank you for visiting our spacecraft!
      </p>
        <p>
          相当于vue当中的slot插槽操作
      </p>
      </FancyBorder>
      <hr />
      <h2 style={{ margin: "0 auto" }}>匿名插槽---不需要传递属性</h2>
      <SlotModel name="qiuhang">
        <h1>这里是手写的匿名slot</h1>
      </SlotModel>
      <hr />
      <h2 style={{ margin: "0 auto" }}>具名插槽---把left和right当做属性来进行传递</h2>
      {/* 按照顺序,填充进去 */}
      <SlotNameModel
        left={
          <h1>左侧</h1>
        }
        right={
          <h2>右侧</h2>
        }
      />
      <hr />
      <h2 style={{ margin: "0 auto" }}>特例关系?</h2>

      {/* 实例的其中之一 */}
      {/* 这个组件 可以说是 Dialog 的特殊实例。 */}
      <Dialog
        title="Welcome"
        message="Thank you for visiting our spacecraft!" />
    </>
  );
}

function SlotModel (props) {
  return (
    <div className={props.name}>
      {props.children}
    </div>
  )
}

{/* 名字随意起 */ }
function SlotNameModel (props) {
  return (
    <div>
      <div className="left">
        {props.left}
      </div>
      <div className="right">
        {props.right}
      </div>
      {/* {props.children} */}
    </div>
  )
}

// 这个跟具名插槽没有什么区别,工具插槽
// DiaLog和welcomeDialog  也就是WelcomeDialog的关系
// 这个Dialog相当于爸爸,功能少
// WelcomeDialog相当于儿子,使用了dialog的基础上功能更多了
function Dialog (props) {
  return (
    <>
      {/* 下面的只是其中一个组件而已 */}
      <FB color="blue">
        <h1 className="Dialog-title">
          {props.title}
        </h1>
        <p className="Dialog-message">
          {props.message}
        </p>
      </FB>
    </>
  );
}

function FB (props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

// 组件可以接受任意 props，包括基本数据类型，React 元素以及函数。