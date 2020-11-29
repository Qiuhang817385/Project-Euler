import React from 'react';
import { Button, Form } from 'antd';
import StartUp from './Component/Demo1/StartUp'
import './App.css';

const FormItem = Form.Item;
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
const App = (props) => {
  const {
    form: { validateFields, getFieldDecorator },
  } = props;
  const initialPolicyLocalVal = [{
    key: 81,
    item1: '3',
    item2: '566'
  }]

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      console.log("values", values);
      if (!err) {
      }
    });
  };


  return <div className="App" >
    <Form onSubmit={handleSubmit}>
      <FormItem label="" style={{ width: '50%' }}>
        {getFieldDecorator('policyLocalList', {
          initialValue: initialPolicyLocalVal,
          trigger: 'onValueChange',
        })(
          <StartUp />
        )}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </FormItem>
    </Form>
  </div >
};

export default Form.create({})(App);