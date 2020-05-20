// vdom---转换成dom,,,,也需要加一些diff算法的东西

// 创建虚拟节点
// vtype,1,html标签,2函数组件,3class组件
export function createVNode (vtype, type, props) {
  const vnode = { vtype, type, props };
  return vnode;
}

// 把虚拟节点转换成真实节点
export function initVNode (vnode) {
  console.log('vnode', vnode)
  // 刚才Bug的原因,prop传递属性的时候单词写错了
  const { vtype } = vnode || {};
  if (!vtype) {
    // 文本节点
    return document.createTextNode(vnode);
  }
  // 原生节点
  if (vtype === 1) {
    return createElement(vnode)
    // 类
  } else if (vtype === 2) {
    return createClassComp(vnode)
    // 函数
  } else if (vtype === 3) {
    return createFuncComp(vnode)
  }
}
// 做递归,底层都应该是元素dom
function createElement (vnode) {
  // 根据type创建元素
  const { type, props } = vnode;
  // node节点是要暴露出去的节点,需要把子,孙都挂载到上面
  const node = document.createElement(type);

  // 处理属性,比如div上面的key
  const { key, children, ...rest } = props;
  //处理特殊属性名,className,htmlFor,事件没有做出来，内敛的样式也没有做处理
  Object.keys(rest).forEach(k => {
    if (k === 'className') {
      node.setAttribute('class', rest[k]);
    } else if (k === 'htmlFor') {
      node.setAttribute('for', rest[k]);
    } else if (k.startsWith('on')) {
      const event = k.toLowerCase();
      node[event] = rest[k];
    } else if (k === 'style' && typeof rest[k] === 'object') {
      const style = Object.keys(rest[k]).map(v => v + ':' + rest[k][v]).join(",");
      node.setAttribute('style', style);
    } else {
      node.setAttribute(k, rest[k]);
    }
  })
  // 递归子元素
  children.forEach(c => {
    if (Array.isArray(c)) {
      c.forEach(v => node.appendChild(initVNode(v)))
    } else {
      node.appendChild(initVNode(c));
    }
  })
  return node;
}
function createClassComp (vnode) {
  // type是class组件的声明
  const { type, props } = vnode;
  const component = new type(props);
  // 返回虚拟dom
  const vdom = component.render()
  console.log('vdom', vdom)
  return initVNode(vdom);
}
function createFuncComp (vnode) {
  // type是函数
  const { type, props } = vnode;
  // 返回虚拟dom
  const vdom = type(props);
  return initVNode(vdom);
}