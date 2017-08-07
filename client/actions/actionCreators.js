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

export function toggleChecked(index, category, checked) {
  return {
    type: types.TOGGLE_CHECKED,
    index,
    category,
    checked
  }
}

export function toggleEditing(index, category, editing) {
  return {
    type: types.TOGGLE_EDITING,
    index,
    category,
    editing
  }
}

export function updateItemName(index, category, editing, value) {
  return {
    type: types.UPDATE_ITEM_NAME,
    index,
    category,
    editing,
    value
  }
}
