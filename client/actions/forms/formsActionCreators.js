import axios from 'axios';
import * as types from './formsActionTypes';

export function updateInput(input, value) {
  return {
    type: types.UPDATE_INPUT,
    input,
    value,
  };
}

export function updateSelectedCategory(selectedType, value) {
  return {
    type: types.UPDATE_SELECTED_CATEGORY,
    value,
    selectedType,
  };
}

export function clearInput(input) {
  return {
    type: types.CLEAR_INPUT,
    input,
  };
}

export function updateAutocompleteItems(items) {
  return {
    type: types.UPDATE_AUTOCOMPLETE_ITEMS,
    items,
  };
}

// THUNKS

export function getMatchingUsers(value) {
  return (dispatch) => {
    axios.get(`/users/${value}`)
      .then((response) => {
        dispatch(updateAutocompleteItems(response.data));
      })
      .catch(err => console.log(err));
  };
}
