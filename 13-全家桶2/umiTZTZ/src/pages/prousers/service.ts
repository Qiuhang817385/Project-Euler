import request, { extend } from 'umi-request';
import { message } from 'antd';

const errorHandler = function(error) {
  const codeMap = {
    '021': 'An error has occurred',
    '022': 'It’s a big mistake,',
    // ....
  };
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response.status);
    // console.log(error.response.headers);
    // console.log(error.data);
    // console.log(error.request);
    // console.log(codeMap[error.data.status]);
    if (error.response.status >= 400) {
      message.error(error.data?.message);
    }
  } else {
    // The request was made but no response was received or error occurs when setting up the request.
    // console.log(error.message);
    console.log('网络错误');
  }

  // 这里注释
  // throw error; // If throw. The error will continue to be thrown.

  // return {some: 'data'}; If return, return the value as a return. If you don't write it is equivalent to return undefined, you can judge whether the response has a value when processing the result.
  // return {some: 'data'};
};

// 1. Unified processing
const extendRequest = extend({ errorHandler });

export const getRemoteList = async () => {
  // 这里必须加return
  // 替换掉,进行错误处理
  return extendRequest('http://public-api-v1.aspirantzhang.com/users', {
    // return request('api/users', {
    method: 'get',
  })
    .then(res => {
      console.log('res', res);
      return res;
    })
    .catch(e => {
      console.log(e);
    });
};
export const addRecord = async ({ values }) => {
  // 这里必须加return
  return request(`http://public-api-v1.aspirantzhang.com/users`, {
    // return request('api/users', {
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
export const editRecord = async ({ id, values }) => {
  console.log('id', id);
  console.log('values', values);
  // 这里必须加return
  return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    // return request('api/users', {
    method: 'put',
    data: values,
  })
    .then(res => {
      // console.log('res', res);
      // return res;
      message.success('修改成功');
    })
    .catch(e => {
      message.success('修改失败');
    });
};
export const deleteRecord = async ({ id }) => {
  // 这里必须加return
  return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    // return request('api/users', {
    method: 'delete',
  })
    .then(res => {
      message.success('删除成功');
    })
    .catch(e => {
      message.success('删除失败');
    });
};
