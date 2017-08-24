import { combineReducers } from 'redux';
//import individual reducers here and then pass them into combineReducers()
import checklists from './checklists';
import auth from './auth';

const rootReducer = combineReducers({ checklists, auth });

export default rootReducer;
