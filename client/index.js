import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import ChecklistContainer from './components/checklist/ChecklistContainer';
import LoginPage from './components/auth/login/LoginPage';
import SignupPage from './components/auth/signup/SignupPage';
import NavBar from './components/NavBar';
import styles from './public/styles.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <NavBar/>
        <Route exact path='/' component={LoginPage}/>
        <Route exact path='/checklist' component={ChecklistContainer}/>
        <Route path='/signup' component={SignupPage}/>
        <Route path='/login' component={LoginPage}/>
      </div>
    </Router>
  </Provider>
  , document.getElementById('root'));
