import * as types from './../actions/checklist/checklistActionTypes';
import item from './item';

const initialState = {
  Sleeping: [],
  Cooking: [],
  Shelter: [],
  Clothing: [],
  Miscellaneous: [],
  Food: [],
};

const checklists = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_CHECKLISTS: {
      return { ...action.checklists };
    }
    case types.ADD_ITEM: {
      // check for invalid input
      if (!action.itemInput || !action.category) {
        alert('please choose a category and/or enter an item');
        return state;
      }
      const { category } = action;
      return {
        ...state,
        [category]: [
          ...state[category],
          item(undefined, action)
        ],
      };
    }
    case types.REMOVE_ITEM: {
      const { category } = action;
      return {
        ...state,
        [category]: [
          ...state[category].slice(0, action.index),
          ...state[category].slice(action.index + 1),
        ],
      };
    }
    case types.TOGGLE_CHECKED:
    case types.TOGGLE_EDITING:
    case types.UPDATE_ITEM_NAME: {
      const { category, index } = action;
      return {
        ...state,
        [category]: [
          ...state[category].slice(0, index),
          item(state[category][index], action),
          ...state[category].slice(index + 1),
        ],
      };
    }
    default:
      return state;
  }
};

export default checklists;
