import {
  REQUEST_CHECKLISTS,
  RECEIVE_CHECKLISTS
} from './../actions/checklist/checklistActionTypes';
import {
  REQUEST_TRIPS,
  RECEIVE_TRIPS
} from './../actions/trips/tripsActionTypes';

const isFetching = (state = false, action) => {
  switch(action.type) {
    case REQUEST_CHECKLISTS:
    case REQUEST_TRIPS: {
      return true;
    }
    case RECEIVE_CHECKLISTS:
    case RECEIVE_TRIPS: {
      return false;
    }
    default:
      return state;
  }
}

export default isFetching;
