import * as types from './../actions/forms/formsActionTypes';

const initialState = {
  itemInput: '',
  tripInput: '',
  selectedChecklist: '',
  autocompleteValue: '',
  autocompleteItems: [],
};

const forms = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_INPUT: {
      return { ...state, [action.input]: action.value };
    }
    case types.UPDATE_SELECTED_CATEGORY: {
      return { ...state, [action.selectedType]: action.value };
    }
    case types.CLEAR_INPUT: {
      return { ...state, [action.input]: '' };
    }
    case types.UPDATE_AUTOCOMPLETE_ITEMS: {
      return { ...state, autocompleteItems: [...action.items] };
    }
    case types.UPDATE_AUTOCOMPLETE_VALUE: {
      return { ...state, autocompleteValue: action.value };
    }
    default:
      return state;
  }
};

export default forms;
