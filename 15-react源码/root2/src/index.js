// import React from 'react';
import React, { Component } from './Kreact';
// import ReactDOM from 'react-dom';
import ReactDOM from './kreactDom';
const user = [
  {
    name: 'qiu',
    age: 123
  }, {
    name: 'hang',
    age: 23
  }
]
function Comp (props) {
  return <div>hi{props.name}
    <br />
    {user.map(v => {
      return <li>{v.name}</li>
    })}
  </div>
}
class Comp2 extends Component {
  render () {
    return (
      <div>
        Comp2
        <h2>
          {this.props.name}
          <button onClick={() => { alert(123) }}>点击</button>
        </h2>
      </div>
    )
  }
}
const jsx = (
  <div>
    <span style={{ color: 'red' }}>hi</span>
    <Comp name='函数组件' />
    {/* 这块,错一个单词都报错 */}
    <Comp2 name='类组件' />
  </div>
)
console.log('jsx', jsx)
ReactDOM.render(
  jsx
  ,
  document.getElementById('root')
);
