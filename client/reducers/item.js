import * as types from './../actions/checklist/checklistActionTypes';

const item = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_ITEM: {
      return {
        name: action.itemInput,
        checked: false,
        editing: false,
        id: action.id,
        owner: action.username,
      };
    }
    case types.TOGGLE_CHECKED: {
      return {
        ...state,
        checked: !state.checked,
      }
    }
    case types.TOGGLE_EDITING: {
      return {
        ...state,
        editing: !state.editing,
      }
    }
    case types.UPDATE_ITEM_NAME: {
      return {
        ...state,
        name: action.value,
        editing: !state.editing,
      }
    }
    default:
      return state;
  }
};

export default item;
