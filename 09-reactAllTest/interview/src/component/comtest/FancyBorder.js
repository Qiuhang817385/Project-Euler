import React, { Component } from 'react'

export default function FancyBorder (props) {
  return (
    // 我们建议这些组件使用一个特殊的 children prop 来将他们的子组件传递到渲染结果中：
    // 相当于vue的slot
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
