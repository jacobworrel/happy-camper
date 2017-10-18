import * as types from './checklistActionTypes';
import axios from 'axios';

export function populateStore(data) {
  return {
    type: types.POPULATE_CHECKLISTS,
    data
  }
}

export function addItem(id, itemInput, category) {
  return {
    type: types.ADD_ITEM,
    id,
    itemInput,
    category
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

//THUNKS

export function getChecklistData() {
  return (dispatch) => {
    axios.get('/items')
      .then((response) => {
        dispatch(populateStore(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export function postItem(category, item) {
  return (dispatch) => {
    axios.post('/items', { category,
                           name: item })
      .then((response) => {
        //update redux store
        dispatch(addItem(response.data.id, item, category));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
