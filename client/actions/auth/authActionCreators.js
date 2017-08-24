import * as types from './authActionTypes';

export function updateField(field, value) {
  return {
    type: types.UPDATE_FIELD,
    field,
    value
  }
}

export function authenticate(value) {
  return {
    type: types.AUTHENTICATE,
    value
  }
}
