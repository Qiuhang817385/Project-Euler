import React, { useEffect, FC } from 'react';
import { FormValue, SingleUserType } from './data.d';
import moment from 'moment';
import { Form, Modal } from 'antd';

interface TestInterface {
  visible: boolean;
  record: SingleUserType | undefined;
  closeHandler: () => void;
  //
  onFinish: (value: FormValue) => void;
  confirmLoading: boolean;
}

const Test: FC<TestInterface> = props => {
  const [form] = Form.useForm();

  const { visible, record, closeHandler, onFinish, confirmLoading } = props;

  useEffect(() => {
    if (record === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue({
        ...record,
        create_time: moment(record.create_time),
        status: Boolean(record.status),
      });
    }
  }, [visible]);

  return (
    <div>
      <Modal></Modal>
    </div>
  );
};

export default Test;
