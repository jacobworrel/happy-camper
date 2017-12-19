import * as types from './../actions/auth/authActionTypes';

const initialState = {
  username: '',
  userId: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  errors: {},
  isLoading: false,
  isAuthenticated: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_FIELD: {
      return { ...state, [action.field]: action.value };
    }
    case types.UPDATE_ERRORS: {
      return { ...state, errors: action.errors };
    }
    case types.TOGGLE_LOADING: {
      return { ...state, isLoading: !state.isLoading };
    }
    case types.AUTHENTICATE: {
      return { ...state, isAuthenticated: true, userId: action.id };
    }
    case types.RESET_AUTH_STATE: {
      return {
        username: '',
        userId: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: {},
        isLoading: false,
        isAuthenticated: false,
      };
    }
    default:
      return state;
  }
};

export default auth;
