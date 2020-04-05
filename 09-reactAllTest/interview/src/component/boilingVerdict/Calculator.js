import React from 'react'
import BoilingVerdict from './BoilingVerdict';
import TemperatureInput from './TemperatureInput'
export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: '',
      scale: 'c'
    }

  }
  handleChange = (e) => {
    this.setState({
      temperature: e.target.value
    })
  }

  // 传递给子组件的时候不需要参数,子组件回调的时候才传递的参数  
  handleCelsiusChange = (temperature) => {
    this.setState({ scale: 'c', temperature });
  }
  handleFahrenheitChange = (temperature) => {
    this.setState({ scale: 'f', temperature });
  }
  render () {
    const { scale, temperature } = this.state;
    // 转换,输入华氏转成摄氏
    // const celsius = scale==='f'? 转换成摄氏 : 摄氏
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={this.state.temperature}
          onChange={this.handleChange} />
        <BoilingVerdict celsius={parseInt(this.state.temperature)} />
        <h1 style={{ margin: "0 auto" }}>需求拓展-华氏/摄氏(可以做成汇率转换)</h1>
        <div>
          {/* 
            我们现在有了两个输入框，但当你在其中一个输入温度时，另一个并不会更新。
            这与我们的要求相矛盾：我们希望让它们保持同步。
            我们希望让它们保持同步。
            我们希望让它们保持同步。
            我们希望让它们保持同步。
            另外，我们也不能通过 Calculator 组件展示 BoilingVerdict 组件的渲染结果。

            因为 Calculator 组件并不知道隐藏在 TemperatureInput 组件中的当前温度是多少。
            
            父组件不知道子组件现在是多少
           */}
          <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}></TemperatureInput>
          <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}></TemperatureInput>
          <BoilingVerdict
            celsius={parseFloat(celsius)} />
        </div>
      </div>
    );
  }
  // tryConvert
  // 接受字符串类型的 temperature 和转换函数作为参数并返回一个字符串。

  // 我们将使用它来依据一个输入框的值计算出另一个输入框的值。
  /* 
    例如，tryConvert('abc', toCelsius) 返回一个空字符串，
          tryConvert('10.22', toFahrenheit) 返回 '50.396'。
   */

}
/*
  在已有摄氏温度输入框的基础上，我们提供华氏度的输入框，并保持两个输入框的数据同步。

  先从 Calculator 组件中抽离出 TemperatureInput 组件，

  然后为其添加一个新的 scale prop，它可以是 "c" 或是 "f"：


  在 React 中，将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，
  便可实现共享 state。这就是所谓的“状态提升”。

  什么叫做状态提升???
 */
function toCelsius (fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit (celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert (temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}