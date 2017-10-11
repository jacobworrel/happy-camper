import { combineReducers } from 'redux';
//import individual reducers here and then pass them into combineReducers()
import checklists from './checklists';
import auth from './auth';
import trips from './trips';

const rootReducer = combineReducers({ checklists, auth, trips });

export default rootReducer;
