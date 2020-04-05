import React, { Component } from 'react'
import Child from './child.js'
export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentNum: 0
    }
  }
  // static
  // getDerivedStateFromProps () {
  //   console.log('???')
  // }
  componentDidMount () {
    console.log('P-didmount')
  }
  componentWillMount () {
    console.log('P-willmount')
  }
  componentWillUpdate () {
    console.log('P-willupdate')
  }
  componentDidUpdate () {
    console.log('P-didupdate')
  }
  bindClick = () => {
    this.setState({
      parentNum: 20
    }, () => {
      console.log('回调')
    })
  }
  render () {
    console.log('P-render');
    const { parentNum } = this.state;
    return (
      <div>
        parentNum:{parentNum};
        <br />
        {/* <button onClick={this.bindClick}>parent点击</button> */}
        <br />
        <Child></Child>
      </div>
    )
  }
}