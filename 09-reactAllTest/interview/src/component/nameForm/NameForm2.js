import React from 'react'
class NameForm2 extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
    this.fileInput = React.createRef();
  }
  handleSubmit (event) {
    alert('A name was submitted: ' + this.input.current.value);
    alert(
      `Selected file - ${this.fileInput.current.files[0].name}`
    );
    event.preventDefault();
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        {/* <input type="file"> 可以让用户选择一个或多个文件上传到服务器，
      或者通过使用 File API 进行操作 */}

        {/* 在 React 中，<input type="file" /> 始终是一个非受控组件，
      因为它的值只能由用户设置，而不能通过代码控制。 */}
        <br />
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default NameForm2
/*
  在一个受控组件中，表单数据是由 React 组件来管理的。
  另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。

  非受控组件
  使用ref.value值来直接获取

  this.input.current.value
  this.input = React.createRef();

  不清楚在某个特殊场景中应该使用哪种组件
  文章会有帮助


  因为非受控组件将真实数据储存在 DOM 节点中，
  所以在使用非受控组件时，有时候反而更容易同时集成 React 和非 React 代码


  非受控组件指定默认值

  defaultValue
  <input
          defaultValue="Bob"
          type="text"
          ref={this.input} />

<input type="text"> 支持 defaultValue

<input type="checkbox"> 和 <input type="radio"> 支持 defaultChecked，

<select> 和 <textarea> 支持 defaultValue。

 */