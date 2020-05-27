import { Modal, Button, Form, Input } from 'antd';
import React, { useState, useEffect } from 'react';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function UserModal(props) {
  const { records, modalVisibal, onFinish } = props;
  // 这个form还必须放到里面来使用
  console.log('records', records);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(records);
    return () => {
      form.resetFields();
    };
  }, [modalVisibal, records]);

  // console.log('props.records', props.records);

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const onOk = () => {
    props.setVisible(false);
    form.submit();
  };

  return (
    <>
      <Modal
        forceRender
        title="Basic Modal"
        visible={modalVisibal}
        // 子组件执行父组件的函数,通过父组件来改变子组件的显示
        // 本质是父组件改变自己的数据
        onOk={onOk}
        onCancel={() => {
          props.setVisible(false);
        }}
      >
        <Form
          {...layout}
          name="basic"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Id" name="id">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Create_time" name="create_time">
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      ;
    </>
  );
}
