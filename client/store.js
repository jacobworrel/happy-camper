import { createStore, compose } from 'redux';
import rootReducer from './reducers/rootReducer';

//hook up redux dev tools
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(rootReducer, enhancers);

export default store;
