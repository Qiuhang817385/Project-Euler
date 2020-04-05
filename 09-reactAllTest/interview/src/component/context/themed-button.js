import React from 'react';
import { useThemesContext } from '../../context';


// 当Provider发生改变的时候,监听到value值的变化并且使用哪个value值
// 虽然这里写的是使用的context 但是仍然需要使用provider来进行数据的更新

// 另外,如果不写provider,那么这个依然可以生效,就是是默认的状态而已

class ThemedButton extends React.Component {
  render () {
    console.log('this:', this);
    let props = this.props;
    let theme = this.context;
    return (
      <button
        {...props}
        style={{ backgroundColor: theme.background }}
      />
    );
  }
}
ThemedButton.contextType = useThemesContext;

export default ThemedButton;