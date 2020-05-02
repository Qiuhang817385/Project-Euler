import * as Types from './actionTypes'
const initialState = {
  count: 0
}

export default (state, { type, payload }) => {
  switch (type) {

    case Types.ADD:
      return { ...state, count: state.count + 1 }
    case Types.SUB:
      return { ...state, count: state.count - 1 }

    default:
      return state
  }
}
