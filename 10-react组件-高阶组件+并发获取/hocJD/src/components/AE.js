import React from 'react'

export default function AE (WrappedComponent) {
  // 如果是函数组件,那么就没什么用了
  return class AE extends WrappedComponent {
    static displayName = `${'这样可以啊'}`
    // static displayName = `${WrappedComponent.displayName || WrappedComponent.name || '11'}`
    componentDidMount () {
      // 这个生命周期会覆盖掉子元素生命周期
    }
    render () {
      const element = super.render();
      const newStyle = {
        color: element.type === 'div' ? 'red' : 'green'
      }
      // 如果包裹的是函数组件,那么使用props就ok了
      const newProps = { ...this.props, style: newStyle };
      return React.cloneElement(element, newProps, element.props.children);
    }
  }
}
