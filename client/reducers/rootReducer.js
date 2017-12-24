import { combineReducers } from 'redux';

// import individual reducers here and then pass them into combineReducers()
import checklists from './checklists';
import auth from './auth';
import trips from './trips';
import forms from './forms';
import isFetching from './isFetching';

const rootReducer = combineReducers({
  checklists,
  auth,
  trips,
  forms,
  isFetching,
});

export default rootReducer;
