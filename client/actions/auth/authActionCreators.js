import * as types from './authActionTypes';
import axios from 'axios';

export function updateField(field, value) {
  return {
    type: types.UPDATE_FIELD,
    field,
    value
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

export function authenticate() {
  return {
    type: types.AUTHENTICATE,
  }
}

//THUNKS
export function userSignupRequest(userData) {
  return (dispatch) => {
    // make post request to server/db
    axios.post('/users/signup', userData)
      .then((response) => {
        dispatch(authenticate());
      })
      .catch((error) => {
        //enable button again so user can resubmit form if necessary
        dispatch(toggleLoading());
        //update redux store with errors
        if (error.response) dispatch(updateErrors(error.response.data));
      });
  }
}

export function userLoginRequest(userData) {
  return (dispatch) => {
    axios.post('/users/login', userData)
      .then(() => {
        //authenticate user
        dispatch(authenticate());
      })
      .catch((error) => {
        //display error msg 'invalid username/password'
        if (error.response) dispatch(updateErrors(error.response.data));
      });
  }
}
