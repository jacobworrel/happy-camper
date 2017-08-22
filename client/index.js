import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import ChecklistContainer from './components/checklist/ChecklistContainer.jsx';
import Login from './components/auth/Login.jsx';

ReactDOM.render(
  <Provider store={store}>
    <Login />
    {/* <ChecklistContainer /> */}
  </Provider>
  , document.getElementById('root'));
