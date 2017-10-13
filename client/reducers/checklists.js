import * as types from './../actions/checklist/checklistActionTypes';

const initialState = {
  categories: {
    Sleeping: [],
    Cooking: [],
    Shelter: [],
    Clothing: [],
    Miscellaneous: [],
    Food: []
  }
};

const checklists = (state = initialState, action) => {
  switch (action.type) {
    case types.POPULATE_CHECKLISTS : {
      const data = action.data;
      const obj = {};
      const categories = Object.keys(data);
      categories.forEach((category) => {
        //get stored item properties and add editing: false property to every item
        obj[category] = data[category].map((item) => ({ ...item, editing: false }));
      })
      return { ...state, categories: obj };
    }
    case types.ADD_ITEM : {
      //check for invalid input
      if (!action.itemInput || !action.category) {
        alert('please choose a category and/or enter an item');
        return state;
      }
      const categories = state.categories;
      const category = action.category;
      const item = { name: action.itemInput, checked: false, editing: false, id: action.id  };
      return {
        ...state,
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
      const categories = state.categories;
      const category = action.category;
      const index = action.index;
      const checked = action.checked;
      return {
        ...state,
        categories: { ...categories,
                      [category]: [...categories[category].slice(0, index),
                                   { ...categories[category][index], checked },
                                   ...categories[category].slice(index + 1)]
                    }
      }
    }
    case types.TOGGLE_EDITING : {
      const categories = state.categories;
      const category = action.category;
      const index = action.index;
      return {
        ...state,
        categories: { ...categories,
                      [category]: [...categories[category].slice(0, index),
                                   { ... categories[category][index], editing: !action.editing },
                                   ...categories[category].slice(index + 1)]
                    }
      }
    }
    case types.UPDATE_ITEM_NAME : {
      const categories = state.categories;
      const category = action.category;
      const index = action.index;
      return {
        ...state,
        categories: { ...categories,
                      [category]: [...categories[category].slice(0, index),
                                   { ... categories[category][index], name: action.value, editing: !action.editing },
                                   ...categories[category].slice(index + 1)]
                    }
      };
    }
    default:
      return state;
  }
}

export default checklists;
