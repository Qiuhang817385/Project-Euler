import React from 'react'
import A from './A';
export default A(function B (props) {
  return (
    <>
      <input type="text" {...props} />
      {/* 操作props */}
      B组件
      名字:{props.name}\
      作用:{props.common}
    </>
  )
})
