import * as types from './authActionTypes';

export function updateUsername(value) {
  return {
    type: types.UPDATE_USERNAME,
    value
  }
}

export function updatePassword(value) {
  return {
    type: types.UPDATE_PASSWORD,
    value
  }
}
