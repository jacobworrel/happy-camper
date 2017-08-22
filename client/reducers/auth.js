import * as types from './../actions/auth/authActionTypes.js';

const initialState = {
  username: '',
  password: ''
}

const auth = (state = initialState, action) => {
  console.log('action -->', action)
  switch (action.type) {
    case types.UPDATE_USERNAME : {
      return { ...state, username: action.value };
    }
    case types.UPDATE_PASSWORD : {
      return { ...state, password: action.value }
    }
    default:
      return state;
  }
}

export default auth;