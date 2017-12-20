import axios from 'axios';
import * as types from './checklistActionTypes';

export function receiveChecklists(checklists) {
  return {
    type: types.RECEIVE_CHECKLISTS,
    checklists,
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

export function toggleChecked(index, category) {
  return {
    type: types.TOGGLE_CHECKED,
    index,
    category,
  };
}

export function toggleEditing(index, category) {
  return {
    type: types.TOGGLE_EDITING,
    index,
    category,
  };
}

export function updateItemName(index, category, value) {
  return {
    type: types.UPDATE_ITEM_NAME,
    index,
    category,
    value,
  };
}

// THUNKS

export function getChecklistData(selectedTrip) {
  return (dispatch) => {
    axios.get(`/items/${selectedTrip}`)
      .then((response) => {
        const { checklists } = response.data;
        dispatch(receiveChecklists(checklists));
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
