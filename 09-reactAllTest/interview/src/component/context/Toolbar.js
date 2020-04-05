import React from 'react';
import ThemedButton from './themed-button.js';
// 一个使用 ThemedButton 的中间组件
export default function Toolbar (props) {
  console.log('Toolbar-props', props)
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}