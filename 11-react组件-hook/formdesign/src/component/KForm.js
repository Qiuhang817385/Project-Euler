import React, { Component } from 'react'
import { Input, Button } from 'antd'
// 创建一个高阶组件,扩展现有的组件,事件处理,数据收集,校验
// 高阶组件应该是一个函数,接受一个组件
function kFormCreate (Comp) {
  // 返回一个全新的组件
  return class extends React.Component {

    constructor(props) {
      super(props);
      // 保存一下全局选项
      this.options = {};
      this.state = {};
    }
    handleChange = (e) => {
      const { name, value } = e.target;
      // 明显看不懂
      console.log(name, value);


      this.setState({ [name]: value }, () => {
        // 确保值发送变化再校验
        this.validateField(name)
      })
      // 不能在这里直接调用校验函数
      // 这里的state可能是异步的,应该使用回调函数的形式
    }
    // 做校验的函数
    validateField = field => {
      //1.获取校验规则,在this.option当中
      const rules = this.options[field].rules;
      // some函数???,只要有一个,就不会再执行了,返回false
      console.log(rules);
      const ret = !rules.some(rule => {
        if (rule.required) {
          // 如果值不存在,就校验失败了
          if (!this.state[field]) {
            //校验失败
            this.setState({
              [field + 'Message']: rule.message
            })
            return true;
          }
        }
      })
      // 如果校验成功
      if (ret) {
        this.setState({
          [field + 'Message']: ''
        })
      }
      return ret;

    }
    // 校验所有的字段
    validate = cb => {
      const rets = Object.keys(this.options).map(field => {
        this.validateField(field)
      })
      const ret = rets.every(v => v == true);
      // 应该传递的数据
      cb(ret, this.state);
    }
    // 创建一个input包装器
    getFiledDec = (field, option) => {
      // 保存当前输入项的配置,rules
      this.options[field] = option;

      // 接受一个组件,返回一个组件
      // InputComp因为是一个vdom 不能直接扩展,需要先克隆
      // 需要给这个组件加一个扩展,onchange事件
      return InputComp => (
        <div>

          {/*当前组件会有一个状态 扩展一个onchange事件和一个name属性 */}
          {React.cloneElement(InputComp, {
            name: field,
            // 当前作用域有值,直接赋值
            value: this.state[field] || '',
            onChange: this.handleChange
          })}
          {/* 校验的错误信息 */}
          {this.state[field + 'Message'] && (
            <p >{this.state[field + 'Message']}</p>
          )}
        </div>
      )
    }

    render () {
      return <Comp getFiledDec={this.getFiledDec} validate={this.validate}></Comp>
    }
  }
}

@kFormCreate
class KForm extends Component {
  onSubmit = () => {
    // 校验所有项
    this.props.validate((isValid, data) => {
      if (isValid) {
        // 提交登录
        console.log('登录', data);
        // 后续登录逻辑

      } else {
        console.log('失败');

      }
    })
  }
  render () {
    const { getFiledDec } = this.props;
    return (
      <div>
        {/* 有很多选项,选项之一就是校验规则 */}
        {getFiledDec('uname', {
          rules: [{ required: true, message: "用户名必填" }]
        })(<Input />)}

        {getFiledDec('upassword', {
          rules: [{ required: true, message: "密码必填" }]
        })(<Input type="password" />)}


        <Button onClick={this.onSubmit}>登录</Button>
      </div>
    )
  }
}

export default KForm;