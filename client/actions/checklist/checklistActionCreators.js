import axios from 'axios';
import * as types from './checklistActionTypes';

export function receiveChecklists(data) {
  return {
    type: types.RECEIVE_CHECKLISTS,
    data,
  };
}

export function addItem(id, itemInput, category, username) {
  return {
    type: types.ADD_ITEM,
    id,
    itemInput,
    category,
    username,
  };
}

export function removeItem(index, category) {
  return {
    type: types.REMOVE_ITEM,
    index,
    category,
  };
}

export function toggleChecked(index, category, checked) {
  return {
    type: types.TOGGLE_CHECKED,
    index,
    category,
    checked,
  };
}

export function toggleEditing(index, category, editing) {
  return {
    type: types.TOGGLE_EDITING,
    index,
    category,
    editing,
  };
}

export function updateItemName(index, category, editing, value) {
  return {
    type: types.UPDATE_ITEM_NAME,
    index,
    category,
    editing,
    value,
  };
}

// THUNKS

export function getChecklistData(selectedTrip) {
  return (dispatch) => {
    axios.get(`/items/${selectedTrip}`)
      .then((response) => {
        dispatch(receiveChecklists(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function postItem(tripId, category, item, userId, username) {
  return (dispatch) => {
    axios.post(
      '/items',
      {
        tripId,
        category,
        name: item,
        userId,
      },
    )
      .then((response) => {
        // update redux store
        dispatch(addItem(response.data.id, item, category, username));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
