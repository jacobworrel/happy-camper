import * as types from './authActionTypes';
import axios from 'axios';

export function updateField(field, value) {
  return {
    type: types.UPDATE_FIELD,
    field,
    value
  }
}

export function userSignupRequest(userData) {
  return (dispatch) => {
    return axios.post('/users/signup', userData);
  }
}

export function updateErrors(errors) {
  return {
    type: types.UPDATE_ERRORS,
    errors
  }
}

export function toggleLoading() {
  return {
    type: types.TOGGLE_LOADING
  }
}

// export function authenticate(value) {
//   return {
//     type: types.AUTHENTICATE,
//     value
//   }
// }
