import React from 'react';
import { Table, Tag, Space } from 'antd';
import { connect } from 'umi';
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
    render: (text, record) => (
      <Space size="middle">
        <button>Edit</button>
        <button>Delete</button>
      </Space>
    ),
  },
];

function index(props) {
  console.log('props', props);
  return (
    <div className="list-table">
      <Table columns={columns} dataSource={props.users.data} />
    </div>
  );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(index);
