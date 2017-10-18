import * as types from './formsActionTypes';

export function updateInput(input, value) {
  return {
    type: types.UPDATE_INPUT,
    input,
    value
  }
}

export function updateSelectedCategory(selectedType, value) {
  return {
    type: types.UPDATE_SELECTED_CATEGORY,
    value,
    selectedType
  }
}

export function clearInput(input) {
  return {
    type: types.CLEAR_INPUT,
    input
  }
}
