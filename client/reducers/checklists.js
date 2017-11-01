import * as types from './../actions/checklist/checklistActionTypes';

const initialState = {
    Sleeping: [],
    Cooking: [],
    Shelter: [],
    Clothing: [],
    Miscellaneous: [],
    Food: []
};

const checklists = (state = initialState, action) => {
  switch (action.type) {
    case types.POPULATE_CHECKLISTS : {
      const data = action.data;
      const checklists = {};
      const categories = Object.keys(data);
      categories.forEach((category) => {
        //get stored item properties and add editing: false property to every item
        checklists[category] = data[category].map((item) => ({ ...item, editing: false }));
      })
      return { ...checklists };
    }
    case types.ADD_ITEM : {
      //check for invalid input
      if (!action.itemInput || !action.category) {
        alert('please choose a category and/or enter an item');
        return state;
      }
      const category = action.category;
      const item = {
        name: action.itemInput,
        checked: false,
        editing: false,
        id: action.id,
        owner: action.username
      }
      return {
        ...state,
        [category]: [
          ...state[category],
          item
        ]
      };
    }
    case types.REMOVE_ITEM : {
      return {
        ...state,
        [action.category]: [
          ...state[action.category].slice(0, action.index),
          ...state[action.category].slice(action.index + 1)
        ]
      }
    }
    case types.TOGGLE_CHECKED : {
      const category = action.category;
      const index = action.index;
      const checked = action.checked;
      return {
        ...state,
        [category]: [
          ...state[category].slice(0, index),
          { ...state[category][index], checked },
          ...state[category].slice(index + 1)
        ]
      }
    }
    case types.TOGGLE_EDITING : {
      const category = action.category;
      const index = action.index;
      return {
        ...state,
        [category]: [
          ...state[category].slice(0, index),
          { ... state[category][index], editing: !action.editing },
          ...state[category].slice(index + 1)
        ]
      }
    }
    case types.UPDATE_ITEM_NAME : {
      const category = action.category;
      const index = action.index;
      return {
        ...state,
        [category]: [
          ...state[category].slice(0, index),
          { ... state[category][index], name: action.value, editing: !action.editing },
          ...state[category].slice(index + 1)
        ]
      }
    }
    default:
      return state;
  }
}

export default checklists;
