import request, { extend } from 'umi-request';
import { message } from 'antd';
import { FormValues } from './data.d';
/* 
  分页+删除是get和delete请求,都直接在地址栏当中使用url的形式传递参数
 */
const errorHandler = function(error: any) {
  if (error.response) {
    if (error.response.status > 400) {
      message.error(error.data.message ? error.data.message : error.data);
    }
  } else {
    // The request was made but no response was received or error occurs when setting up the request.
    // console.log(error.message);
    message.error('Network Error.');
  }

  throw error; // If throw. The error will continue to be thrown.

  // return {some: 'data'}; If return, return the value as a return. If you don't write it is equivalent to return undefined, you can judge whether the response has a value when processing the result.
  // return {some: 'data'};
};

const extendRequest = extend({ errorHandler });

export const getRemoteList = async ({
  page,
  per_page,
}: {
  page: number;
  per_page: number;
}) => {
  return extendRequest(
    `http://public-api-v1.aspirantzhang.com/users?page=${page}&per_page=${per_page}`,
    {
      method: 'get',
    },
  )
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return false;
    });
};

export const editRecord = async ({
  id,
  values,
}: {
  id: number;
  values: FormValues;
}) => {
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'put',
    data: values,
  })
    .then(function(response) {
      return true;
    })
    .catch(function(error) {
      return false;
    });
};
export const addRecord = async ({ values }: { values: FormValues }) => {
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users/`, {
    method: 'post',
    data: values,
  })
    .then(function(response) {
      return true;
    })
    .catch(function(error) {
      return false;
    });
};

export const deleteRecord = async ({ id }: { id: number }) => {
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'delete',
  })
    .then(function(response) {
      return true;
    })
    .catch(function(error) {
      return false;
    });
};
/* 
增post  http://public-api-v1.aspirantzhang.com/users/ data=values
改put  http://public-api-v1.aspirantzhang.com/users/${id} data=values
删delete http://public-api-v1.aspirantzhang.com/users/${id}
查get  `http://public-api-v1.aspirantzhang.com/users?page=${page}&per_page=${per_page}` 
 */
/* 
增post  http://public-api-v1.aspirantzhang.com/users/ data=values
改put  http://public-api-v1.aspirantzhang.com/users/${id} data=values
删delete http://public-api-v1.aspirantzhang.com/users/${id}
查get  `http://public-api-v1.aspirantzhang.com/users?page=${page}&per_page=${per_page}` 
 */
/* 
增post  http://public-api-v1.aspirantzhang.com/users/ data=values
改put  http://public-api-v1.aspirantzhang.com/users/${id} data=values
删delete http://public-api-v1.aspirantzhang.com/users/${id}
查get  `http://public-api-v1.aspirantzhang.com/users?page=${page}&per_page=${per_page}` 
 */

// https://github.com/dvajs/dva/blob/master/packages/dva-core/test/effects.test.js
// https://github.com/dvajs/dva/blob/master/packages/dva-core/test/effects.test.js
// https://github.com/dvajs/dva/blob/master/packages/dva-core/test/effects.test.js
// https://github.com/dvajs/dva/blob/master/packages/dva-core/test/effects.test.js
// https://github.com/dvajs/dva/blob/master/packages/dva-core/test/effects.test.js
