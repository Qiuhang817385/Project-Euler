import { Reducer, Effect, Subscription } from 'umi';
import { message } from 'antd';
import { SingleUserType } from './data.d';
import { getRemoteList, deleteRecord } from '../users/service';

export interface UserState {
  data: SingleUserType[];
  meta: {
    total: number;
    per_page: number;
    page: number;
  };
}
/**
 * 定义一个Modal数据处理的类型
 */
interface UserModelType {
  namespace: 'users';
  state: UserState;
  reducers: {
    // 这里不甚理解
    getList: Reducer<UserState>;
  };
  effects: {
    getRemote: Effect;
    delete: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UserModel: UserModelType = {
  namespace: 'users',
  state: {
    data: [],
    meta: {
      total: 0,
      per_page: 5,
      page: 1,
    },
  },
  reducers: {
    getList(state, { payload }) {
      return payload;
    },
  },
  effects: {
    *getRemote({ payload: { page, per_page } }, { put, call }) {
      const data = yield call(getRemoteList, { page, per_page });
      if (data) {
        yield put({
          type: 'getList',
          payload: data,
        });
      }
    },
    *delete({ payload: { id } }, { put, call, select }) {
      const dataFlag = yield call(deleteRecord, { id });
      if (dataFlag) {
        message.success('Delete successfully.');
        const { page, per_page } = yield select((_: any) => _.isBuffer.meta);
        yield put({
          type: 'getRemote',
          payload: {
            page,
            per_page,
          },
        });
      } else {
        message.error('Delete failed');
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {},
  },
};
