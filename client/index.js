/* eslint-disable react/jsx-filename-extension, no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerObserver from 'react-perf-devtool';
import store from './store';
import NavBar from './components/NavBar';
import ProfilePage from './containers/ProfilePage';
import ChecklistContainer from './containers/ChecklistContainer';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import './styles.global.css';

registerObserver();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={NavBar} />
        <Route exact path="/" component={ProfilePage} />
        <Route exact path="/profile" component={NavBar} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/profile/checklist" component={NavBar} />
        <Route exact path="/profile/checklist" component={ChecklistContainer} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
