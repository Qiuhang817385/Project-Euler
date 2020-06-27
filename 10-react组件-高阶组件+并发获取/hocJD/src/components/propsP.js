import React from 'react'

export default function propsP (props) {
  return (
    <div className="a-container">
      <div className="header">
        <div>提示</div>
        <div>×</div>
      </div>
      <div className='props'>
        {props.children}
      </div>
    </div>
  )
}
