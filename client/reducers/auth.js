import * as types from './../actions/auth/authActionTypes';

const initialState = {
  username: '',
  password: '',
  isAuthenticated: false
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_FIELD : {
      return { ...state, [action.field]: action.value }
    }
    case types.AUTHENTICATE : {
      return { ...state, isAuthenticated: action.value }
    }
    default:
      return state;
  }
}

export default auth;
