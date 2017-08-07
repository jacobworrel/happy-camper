import { combineReducers } from 'redux';
//import individual reducers here and then pass them into combineReducers()
import checklists from './checklists.js'

const rootReducer = combineReducers({ checklists });

export default rootReducer;
