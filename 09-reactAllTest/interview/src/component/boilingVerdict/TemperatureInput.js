import React from 'react';
// 一份组件,但是分割成两个来用了
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};
export default class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    // 状态提升遇见的问题
    // 两个 TemperatureInput 组件均在各自内部的 state 中相互独立地保存着各自的数据。
    // this.state = { temperature: '' };
    // 在 React 中，将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，
    // 便可实现共享 state。
    // 这就是所谓的“状态提升”。
    // 但是现在只能通过porps来传递温度，temperature
    // 这个显示的子组件失去了对temperature的控制权
    // props是只读的，不可更改
    // 解决办法？
    // 调用父类的方法进行自身props的修改
  }
  handleChange = (e) => {
    this.props.onTemperatureChange(e.target.value);
  }
  render () {
    const { temperature, scale } = this.props;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
          onChange={this.handleChange} />
      </fieldset>
    );
  }
}

/*
  在 React 中，这个问题通常是通过使用“受控组件”来解决的。
  与 DOM 中的 <input> 接受 value 和 onChange 一样，
  自定义的 TemperatureInput 组件接受 temperature 和 onTemperatureChange 这两个来自父组件 Calculator 的 props。

  也就是,父子组件,修改子组件值的时候调用父组件的方法来进行修改

  受控组件的进一步含义--->不仅是state,还是props
 */