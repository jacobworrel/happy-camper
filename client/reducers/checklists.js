import * as types from './../actions/actionTypes.js';

const initialState = {
  categories: {
    Sleeping: [],
    Cooking: [],
    Shelter: [],
    Clothing: [],
    Miscellaneous: [],
    Food: []
  },
  selectedCategory: '',
  itemInput: ''
};

const checklists = (state = initialState, action) => {
  switch (action.type) {
    case types.POPULATE_STORE : {
      const data = action.data;
      const obj = {};
      const categories = Object.keys(data);
      categories.forEach((category) => {
        //get stored item properties and add editing: false property to every item
        obj[category] = data[category].map((item) => ({ ...item, editing: false }));
      })
      return { ...state, categories: obj };
    }
    case types.UPDATE_INPUT : {
      return { };
    }
    case types.UPDATE_SELECTED_CATEGORY : {
      return { };
    }
    case types.UPDATE_ITEM_NAME : {
      return { };
    }
    case types.ADD_ITEM : {
      return { };
    }
    case types.REMOVE_ITEM : {
      return { };
    }
    case types.TOGGLE_CHECKED : {
      return { };
    }
    case types.TOGGLE_EDITING : {
      return { };
    }
    default:
      return state;
  }
}

export default checklists;
