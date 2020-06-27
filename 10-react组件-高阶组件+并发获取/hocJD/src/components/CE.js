import React from 'react'
import AE from './AE';
export default AE(class componentName extends React.Component {
  render () {
    return (
      <div style={this.props.style}>
        componentName
      </div>
    )
  }
})


