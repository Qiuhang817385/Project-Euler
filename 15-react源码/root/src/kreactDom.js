//1.把虚拟dom变成真实dom
// 2.把转换的真实dom添加到container当中
// 模拟react-dom的render方法

import { initVNode } from "./kvdom"

function render (vnode, container) {
  // 打印出来虚拟dom结构
  // container.innerHTML = `<pre>${JSON.stringify(vnode, null, 2)}</pre>`;
  // 接下来,把虚拟dom转换成真实dom
  // kvdom.js
  const node = initVNode(vnode);
  container.appendChild(node);
}
export default { render }