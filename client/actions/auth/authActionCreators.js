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

export function authenticate(id) {
  return {
    type: types.AUTHENTICATE,
    id
  }
}

//THUNKS

export function userSignupRequest(userData) {
  return (dispatch) => {
    // make post request to server/db
    axios.post('/users/signup', userData)
      .then((res) => {
        dispatch(authenticate(res.data._id));
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
      .then((res) => {
        //authenticate user
        dispatch(authenticate(res.data._id));
      })
      .catch((error) => {
        //display error msg 'invalid username/password'
        if (error.response) dispatch(updateErrors(error.response.data));
      });
  }
}
