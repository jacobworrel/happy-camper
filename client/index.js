import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ChecklistContainer from './components/checklist/ChecklistContainer.jsx';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path='/' component={ChecklistContainer}/>
        {/* <Route path='/signup' component={Signup}/>
        <Route path='/checklist' render={() => {
          console.log('we in this')
          const state = store.getState();
          if (state.auth.isAuthenticated) return <ChecklistContainer/>
          else return <Login/>
        }}/> */}
      </div>
    </Router>
  </Provider>
  , document.getElementById('root'));
