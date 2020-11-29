import React from "react";
import { Form, Input, Icon, Button } from "antd";
import Param from "./Param";

let id = 0;

class DynamicFieldSet extends React.Component {
  constructor(props) {
    super(props);
    this.uuid = 0;
  }
  handleValueChange = (value) => {
    const { onValueChange } = this.props;
    if (onValueChange) {
      // 通过下发的 onValueChange 属性函数收集 EditFormTable 的值
      onValueChange(value);
    }
  };

  remove = (record) => {
    // const { form } = this.props;
    // const keys = form.getFieldValue("keys");
    // if (keys.length === 1) {
    //   return;
    // }
    // value在上面是传递过来的初始值。
    // const newValue = value.filter(item => item.key !== record.key);
    // form.setFieldsValue({
    //   keys: keys.filter((item) => item.id !== record.id),
    // });
    console.log('record', record)
    const { value } = this.props;
    const newValue = value.filter(item => item.key !== record.key);
    this.handleValueChange(newValue);
  };

  add = () => {
    // const { form } = this.props;
    // const { getFieldValue, getFieldsValue, getFieldDecorator } = form;
    // // can use data-binding to get
    // // 获取当前的数组长度,动态增加一个
    // const keys = getFieldValue("keys");
    // console.log('getFieldsValue()', getFieldsValue());
    // const nextKeys = keys.concat([
    //   { id: this.uuid + 1, ...{ item1: "", item2: "" } },
    // ]);
    // this.uuid++;
    // form.setFieldsValue({
    //   keys: nextKeys,
    // });
    const { value, onValueChange } = this.props;
    const record = {
      key: this.uuid + 1
    }
    this.uuid++;
    if (onValueChange) {
      // 通过下发的 onValueChange 属性函数收集 EditFormTable 的值
      onValueChange([...(value || []), record]);
    }
  };

  // value / key
  renderViewOnchange = (record) => {
    const { value } = this.props;
    const newValue = (value || []).map(item => {
      if (item.key === record.key) {
        const newsV = {
          ...item,
          ...record,
        };
        return newsV
      }
      return item;
    });
    this.handleValueChange(newValue)
  };



  render () {
    const { getFieldDecorator } = this.props.form;
    const { value } = this.props;
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

    // // 用于设置一个初始值,动态跟随表单的变化.
    // getFieldDecorator("keys", {
    // });

    const formItems = value.map((record, index) => {
      const params = {
        onChange: this.renderViewOnchange,
        record,
      };
      // key: {key: 0, item1: "1", item2: "2"}
      return (
        <Form.Item
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? "Passengers" : ""}
          required={false}
          // 同上
          key={record.key}
        >
          {getFieldDecorator(`key[${record.key}]`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "输入值",
              },
            ],
          })(<Param params={params} />)}
          {value.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(record)}
            />
          ) : null}
        </Form.Item>
      );
    });

    return (
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
            <Icon type="plus" /> 添加
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
