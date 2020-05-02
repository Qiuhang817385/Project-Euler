import React, { useReducer } from 'react'
import Reducer from './reducer'
import * as Types from './actionTypes'
import HookReducer2 from './HookReducer2'
export default function Hookreducer (props) {
  const [state, dispatch] = useReducer(Reducer, { count: 0 })
  return (
    <>
      <button onClick={() => dispatch({ type: Types.ADD })}>+</button>---
      <button onClick={() => dispatch({ type: Types.SUB })}>-</button>
      <p>Count: {state.count}</p>
      <hr />
      <h2>惰性初始化</h2>
      <HookReducer2 initialCount={0}></HookReducer2>
    </>
  )
}
/*
  指定初始 state
  有两种不同初始化 useReducer state 的方式，你可以根据使用场景选择其中的一种。
  将初始 state 作为第二个参数传入 useReducer 是最简单的方法：
  const [state, dispatch] = useReducer(
    reducer,
    {count: initialCount}
  );


  注意

React 不使用 state = initialState 这一由 Redux 推广开来的参数约定。
有时候初始值依赖于 props，因此需要在调用 Hook 时指定。
如果你特别喜欢上述的参数约定，
可以通过调用 useReducer(reducer, undefined, reducer) 来模拟 Redux 的行为，
但我们不鼓励你这么做。

惰性初始化
你可以选择惰性地创建初始 state。
为此，需要将 init 函数作为 useReducer 的第三个参数传入，
这样初始 state 将被设置为 init(initialArg)。


 */
