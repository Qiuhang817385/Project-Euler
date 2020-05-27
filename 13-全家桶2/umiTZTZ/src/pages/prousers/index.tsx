import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Space, Popconfirm, message } from 'antd';
import ProTable, {
  ProColumns,
  TableDropdown,
  ActionType,
} from '@ant-design/pro-table';
import { connect } from 'umi';

import UserModal from './components/UserModal';

function index(props) {
  const [modalVisibal, setModalVisibal] = useState(false);
  const [records, setRecords] = useState(null);
  const showModal = obj => {
    console.log(obj);
  };
  const onFinish = values => {
    console.log('Success:', values);
    let id;
    if (records) {
      console.log('edit');
      id = records.id;
      props.dispatch({
        type: 'prousers/edit',
        payload: values,
        // 第二种写法
        //  payload: {...values,id},
      });
    } else {
      console.log('add');
      props.dispatch({
        type: 'prousers/add',
        payload: values,
      });
    }
  };

  function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
    // setModalVisibal(true);
    let id;
    if (records) {
      id = records.id;
    }
    props.dispatch({
      type: 'prousers/delete',
      payload: { id },
      // 第二种写法
      //  payload: {...values,id},
    });
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

  const add = () => {
    setModalVisibal(true);
    setRecords(null);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Create_time',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Update_time',
      dataIndex: 'update_time',
      key: 'update_time',
    },
    {
      title: 'Action',
      key: 'action',
      // 当前行值,数据,索引
      render: (text: any, record: any, index: any) => (
        <Space size="middle">
          <button
            onClick={() => {
              setModalVisibal(true);
              setRecords(record);
            }}
          >
            Edit
          </button>
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <button>Delete</button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  console.log('props', props);
  return (
    <div className="list-table">
      <Button type="primary" onClick={add}>
        Pro添加
      </Button>
      <Table columns={columns} dataSource={props.prousers.data} />
      <UserModal
        modalVisibal={modalVisibal}
        // 这个函数一般可以提取到上面
        setVisible={(flag: Boolean) => {
          setModalVisibal(flag);
        }}
        records={records}
        onFinish={onFinish}
      />
    </div>
  );
}

const mapStateToProps = state => {
  console.log('state', state);
  return state;
};

export default connect(mapStateToProps)(index);
