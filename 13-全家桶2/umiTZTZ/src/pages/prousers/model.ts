import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getRemoteList, editRecord, addRecord, deleteRecord } from './service';
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
interface UserState {
  data: [];
  meta: {
    total: Number;
    per_page: Number;
    page: Number;
  };
}
interface UserModelType {
  namespace: 'prousers';
  // state: [];
  state: UserState;
  reducers: {
    save: Reducer;
  };
  effects: {
    getRemote: Effect;
    edit: Effect;
    delete: Effect;
    add: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}
const UserModel: UserModelType = {
  namespace: 'prousers',
  // 这里的结构类型定义成对象的话,那么返回的时候就是一个对象的形式数据
  state: {},
  effects: {
    *getRemote(action, { put, call }) {
      const res = yield call(getRemoteList);
      // 为什么这里是undefined?? service函数必须返回一个返回值
      res.data.forEach((ele: any) => {
        ele.key = ele.id + '';
      });
      yield put({
        type: 'save',
        payload: res,
      });
    },
    *add({ type, payload }, { put, call }) {
      //id+values
      const { id, ...values } = payload;
      yield call(addRecord, { values });
      // 重新刷新列表
      yield put({
        type: 'getRemote',
      });
    },
    *edit({ type, payload }, { put, call }) {
      //id+values
      // console.log('payload', payload);
      const { id, ...values } = payload;
      yield call(editRecord, { id, values });
      // 重新刷新列表
      yield put({
        type: 'getRemote',
      });
    },
    *delete({ type, payload }, { put, call }) {
      const { id } = payload;
      yield call(deleteRecord, { id });
      // 重新刷新列表
      yield put({
        type: 'getRemote',
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
        if (pathname === '/prousers') {
          dispatch({
            type: 'getRemote',
          });
        }
      });
    },
  },
};
export default UserModel;
