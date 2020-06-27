import React from 'react'
import B from './../../components/B';
import C from './../../components/C';
import CE from './../../components/CE';
import PropsC from './../../components/propsC';
import PropsP from './../../components/propsP';
export default function Page1 () {
  return (
    <div>
      <B name="邱航" />
      <hr />
      <C />
      <CE />
      <hr />
      <PropsP>
        <PropsC></PropsC>
      </PropsP>
    </div>
  )
}
