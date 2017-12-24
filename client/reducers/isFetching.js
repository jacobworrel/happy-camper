import * as types from './../actions/checklist/checklistActionTypes';

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.REQUEST_CHECKLISTS: {
      return true;
    }
    case types.RECEIVE_CHECKLISTS: {
      return false;
    }
    default:
      return state;
  }
}

export default isFetching;
