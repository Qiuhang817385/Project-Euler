// 编写一个React.createElement
// 为什么是这种导出方式
// 因为,源码里面是React.createElement
// 在index导入的时候,就导入import React from './Kreact';
// 这样,在使用的时候就是React.createElement了
// function createElement () {
//   console.log('arguments', arguments)
// }

import { createVNode } from "./kvdom";

function createElement (type, props, ...children) {
  // 对应源码参数里面的,
  // 参数1.类型,参数2.自身的属性,参数3以上,若干孩子元素
  // 源码的children就是这么干的,收集成一个数组,单独放到props当中
  // 因为最终返回的虚拟dom  的children就是在props上面,并且是一个数组


  // 这一步就已经把children放到props里面了
  props.children = children

  // 去除冗余结构
  delete props.__source;
  // delete props.;

  // 需要写一个分析文件,用以判断dom是什么类型,给下面创建虚拟dom做进一步的操作,也就是
  // 虚拟dom是什么类型的,vType,是原生标签?还是一个组件??组件的话需要递归继续判断了吧
  let vtype;
  // 这里的操作就是调用的reactElement方法
  // 原生标签,1.是一个字符串
  if (typeof type === 'string') {
    vtype = 1;
  } else if (typeof type === 'function') {
    if (type.isClassComponent) {
      vtype = 2;
    } else {
      vtype = 3;
    }
  }

  // type:标签类型,div

  // return { type, props }

  return createVNode(vtype, type, props)

  /* 
    return ReactElement(
        type,
        key,
        ref,
        self,
        source,
        ReactCurrentOwner.current,
        props,
    )
   */
}
export default { createElement }


export class Component {
  // 默认含有一个静态属性
  // 区分某个组件是class还是function
  static isClassComponent = true;
  // 新建一个构造器接收属性和方法,保存到需要继承的组件
  constructor(props) {
    this.props = props;
    this.state = {};
  }
  // 还有一个setStat方法
  // setState(){}
}
