import { combineReducers } from 'redux';
//import individual reducers here and then pass them into combineReducers()
import checklists from './checklists.js';
import auth from './auth.js';

const rootReducer = combineReducers({ checklists, auth });

export default rootReducer;
