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
      return { ...state, itemInput: action.value };
    }
    case types.UPDATE_SELECTED_CATEGORY : {
      return { ...state, selectedCategory: action.value};
    }
    case types.UPDATE_ITEM_NAME : {
      return { };
    }
    case types.ADD_ITEM : {
      //check for invalid input
      if (!state.itemInput || !state.selectedCategory) {
        alert('please choose a category and/or enter an item');
        return;
      }
      const categories = state.categories;
      const category = state.selectedCategory;
      const item = { name: state.itemInput, checked: false, editing: false, id: action.id  };
      return {
        ...state,
        itemInput: '',
        categories: { ...categories, [category]: [...categories[category], item] }
      }
    }
    case types.REMOVE_ITEM : {
      const categories = state.categories;
      return {
        ...state,
        categories: { ...categories, [action.category]: [...categories[action.category].slice(0, action.index),
                                                  ...categories[action.category].slice(action.index + 1)]
                                                }
      }
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
