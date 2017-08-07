import * as types from './actionTypes';

export function populateStore(data) {
  return {
    type: types.POPULATE_STORE,
    data
  }
}

export function updateInput(value) {
  return {
    type: types.UPDATE_INPUT,
    value
  }
}

export function updateSelectedCategory(value) {
  return {
    type: types.UPDATE_SELECTED_CATEGORY,
    value
  }
}

export function addItem(id) {
  return {
    type: types.ADD_ITEM,
    id
  }
}

export function removeItem(index, category) {
  return {
    type: types.REMOVE_ITEM,
    index,
    category
  }
}
