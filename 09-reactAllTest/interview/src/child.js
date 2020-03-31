import React, { Component } from 'react'
import { ThemeContext } from './context'
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
    // console.log('ThemeContext', ThemeContext)
    let value = this.context;
    console.log("value", value)
  }
  componentWillMount () {
    console.log('C-willmount')
  }
  componentWillUpdate () {
    console.log('C-willupdate')
  }
  componentDidUpdate () {
    console.log('C-didupdate')
  }
  bindClick = () => {
    this.setState({
      childNmu: 10
    })
  }
  // static contextType = ThemeContext;

  render () {
    // console.log(this.context)
    console.log('C-render');
    return (
      <div>
        child
        <br />
        {/* {this.context} */}
        {this.state.childNmu}
        <br />
        <button onClick={this.bindClick}>child</button>
      </div>
    )
  }
}
// child.contextType = ThemeContext;
Child.contextType = ThemeContext