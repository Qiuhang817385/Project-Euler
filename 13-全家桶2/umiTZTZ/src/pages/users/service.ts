import { request } from 'umi';
export const getRemoteList = async () => {
  // 这里必须加return
  return request('http://public-api-v1.aspirantzhang.com/users', {
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
