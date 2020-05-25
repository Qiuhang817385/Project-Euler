import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getRemoteList } from './service';
// Modal就是一个对象
// export interface IndexModelState {
//   name: string;
// }
// export interface IndexModelType {
//   namespace: 'index';
//   state: IndexModelState;
//   effects: {
//     query: Effect;
//   };
//   reducers: {
//     save: Reducer<IndexModelState>;
//     // 启用 immer 之后
//     // save: ImmerReducer<IndexModelState>;
//   };
//   subscriptions: { setup: Subscription };
// }
interface UserModelType {
  namespace: 'users';
  // state: [];
  state: {};
  reducers: {
    save: Reducer;
  };
  effects: {
    getRemote: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}
const UserModel: UserModelType = {
  namespace: 'users',
  // 这里的结构类型定义成对象的话,那么返回的时候就是一个对象的形式数据
  state: {},
  effects: {
    *getRemote(action, { put, call }) {
      const res = yield call(getRemoteList);
      // 为什么这里是undefined?? service函数必须返回一个返回值

      res.data.forEach(ele => {
        ele.key = ele + '';
      });
      yield put({
        type: 'save',
        payload: res,
      });
    },
  },
  reducers: {
    save(state, action) {
      console.log('action', action.payload.data);
      return action.payload;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // 正确完整的写法
      // https://github.com/ReactTraining/history/blob/master/docs/GettingStarted.md
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'getRemote',
          });
        }
      });
    },
  },
};
export default UserModel;
