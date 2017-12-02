import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import NavBar from './components/profile/NavBar';
import ProfilePage from './components/profile/ProfilePage';
import ChecklistContainer from './components/checklist/ChecklistContainer';
import LoginPage from './components/auth/login/LoginPage';
import SignupPage from './components/auth/signup/SignupPage';
import './styles.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path='/' component={ProfilePage} />
        <Route exact path='/profile' component={NavBar} />
        <Route exact path='/profile' component={ProfilePage} />
        <Route exact path='/profile/checklist' component={NavBar} />
        <Route exact path='/profile/checklist' component={ChecklistContainer} />
        <Route path='/signup' component={SignupPage} />
        <Route path='/login' component={LoginPage} />
      </div>
    </Router>
  </Provider>
  , document.getElementById('root'));
