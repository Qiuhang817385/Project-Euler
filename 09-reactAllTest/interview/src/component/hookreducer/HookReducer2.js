/* 
  为什么要惰性初始化
  你可以选择惰性地创建初始 state。
  为此，需要将 init 函数作为 useReducer 的第三个参数传入，
  这样初始 state 将被设置为 init(initialArg)。

这么做可以
1.将用于计算 state 的逻辑提取到 reducer 外部，

2.这也为将来对重置 state 的 action 做处理提供了便利

功能是二选一的存在
可以选择初始化值
也可以选择实现一个其他功能

对state做加工，比如反转字符串
其实之前也可以做到，但是现在的话可以抽取出来当成一个单独的函数

 */
import React, { useReducer } from 'react'

const init = (initialCount) => {
  return { count: initialCount }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return { count: state.count + 1 };
    case 'sub':
      return { count: state.count - 1 };
    case 'reset':
      return init(action.payload);
    default:
      return state;
  }
}

export default function HookReducer2 ({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init)
  return (
    <>
      Count: {state.count}
      <br />
      <button
        onClick={() => dispatch({ type: 'reset', payload: initialCount })}>
        Reset
      </button>
      <button onClick={() => dispatch({ type: 'sub' })}>-</button>
      <button onClick={() => dispatch({ type: 'add' })}>+</button>
    </>
  )
}
/**
|--------------------------------------------------
| 这个惰性初始化,就是,父组件传递给子组件一个初始的值,
然后子组件内部就可以对这个数据进行响应的操作

并且这样的话,就不用给state了

之前的操作是,父组件给子组件,然后子组件存到自己的state当中,现在就不用这么做了
|--------------------------------------------------


如果 Reducer Hook 的返回值与当前 state 相同，React 将跳过子组件的渲染及副作用的执行。
（React 使用 Object.is 比较算法 来比较 state。）

需要注意的是，React 可能仍需要在跳过渲染前再次渲染该组件。
不过由于 React 不会对组件树的“深层”节点进行不必要的渲染，所以大可不必担心。
如果你在渲染期间执行了高开销的计算，则可以使用 useMemo 来进行优化。

selector
*/
