import React from "react";
import { Form, Input, Icon, Button } from "antd";
import Param from "./Component/Param";

let id = 0;

class DynamicFieldSet extends React.Component {

  constructor(props) {
    super(props);
    console.log('props', props)
  }

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter((key) => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    // 获取当前的数组长度,动态增加一个
    const keys = form.getFieldValue("keys");

    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };


  renderViewOnchange = (data, keyData) => {
    // data = 
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('values', values)
      if (!err) {
        const { keys, names } = values;
        console.log("Received values of form: ", values);
        console.log(
          "Merged values:",
          keys.map((key) => names[key])
        );
      }
    });
  };

  render () {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };



    // 用于设置一个初始值,动态跟随表单的变化.
    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");

    const formItems = keys.map((k, index) => {
      const params = {
        onChange: this.renderViewOnchange,
        key: k
      }

      return (
        <Form.Item
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? "Passengers" : ""}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ["onChange", "onBlur"],
            initialValue:
            {
              key: 1,
              d1: undefined,
              d2: undefined,
            },
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please input passenger's name or delete this field.",
              },
            ],
          })(<Param params={params} />)}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />
          ) : null}
        </Form.Item>
      )
    });


    return (
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
            <Icon type="plus" /> 添加
          </Button>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedDynamicFieldSet = Form.create({ name: "dynamic_form_item" })(
  DynamicFieldSet
);
export default WrappedDynamicFieldSet;
