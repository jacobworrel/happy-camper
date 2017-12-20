/* eslint-disable no-underscore-dangle, no-undef */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import throttle from 'lodash/throttle';
import rootReducer from './reducers/rootReducer';
import { loadState, saveState } from './utils/localStorage';


// hook up redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// load persisted state from local storage
const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk, logger)),
);

store.subscribe(throttle(() => {
  const state = store.getState();
  saveState({
    auth: {
      isAuthenticated: state.auth.isAuthenticated,
      username: state.auth.username,
      userId: state.auth.userId,
    },
    checklists: state.checklists,
    trips: {
      trips: state.trips.trips,
    },
  });
}, 1000));

export default store;
