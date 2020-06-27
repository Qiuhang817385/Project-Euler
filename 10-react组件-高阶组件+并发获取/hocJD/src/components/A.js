import React, { createRef } from 'react'

export default function A (WrappedComponent) {
  // 如果是函数组件,那么就没什么用了
  const wrap = createRef();
  return class A extends React.Component {
    state = {
      value: ''
    }
    onInputChange = (e) => {
      this.setState({ value: e.target.value })
    }
    render () {
      // 状态提取
      const { value, } = this.props
      const { onInputChange } = this
      const newProps = {
        value,
        onInput: onInputChange
      }
      return (
        <div className="a-container">
          <div className="header">
            <div>提示</div>
            <div>×</div>
          </div>
          <div className='hoc'>
            <WrappedComponent ref={wrap} {...newProps} common="复用" {...this.props}></WrappedComponent>
          </div>
        </div>
      )
    }
  }
}
