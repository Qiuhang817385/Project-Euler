import request, { extend } from 'umi-request';
import { message } from 'antd';
import { FormValues } from './data.d';

export const getRemoteList = async ({
  page,
  per_page,
}: {
  page: number;
  per_page: number;
}) => {
  return request('url', {
    method: 'get',
  })
    .then(_ => _)
    .catch(e => {
      console.log(e);
    });
};

export const addRecord = async ({ values }: { values: FormValues }) => {
  return request('url', {
    method: 'post',
    data: values,
  })
    .then(res => {
      message.success('添加成功');
    })
    .catch(e => {
      message.success('添加失败');
    });
};

export const editRecord = async ({
  id,
  values,
}: {
  id: number;
  values: FormValues;
}) => {
  return request('url', {
    method: 'post',
    data: values,
  })
    .then(res => {
      message.success('修改成功');
    })
    .catch(e => {
      message.success('修改失败');
    });
};

export const deleteRecord = async ({ id }: { id: number }) => {
  return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'delete',
  })
    .then(res => {
      message.success('删除成功');
    })
    .catch(e => {
      message.success('删除失败');
    });
};
