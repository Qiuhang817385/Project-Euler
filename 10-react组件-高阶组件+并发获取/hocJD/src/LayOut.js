import React from 'react'
import Header from './components/Header/Header'
export default function Admin (props) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  )
}
