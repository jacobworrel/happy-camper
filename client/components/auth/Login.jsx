import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth/authActionCreators.js';

class Login extends React.Component {

  handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!this.props.username || !this.props.password) alert('please enter a valid username/password');
    else {
      //make post request to server/db
      axios.post('/login', { username: this.props.username,
                             password: this.props.password })
        .then(response => {
          if (!response.data) alert('please enter a valid username/password');
        });
    }
  }

  handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!this.props.username || !this.props.password) alert('please enter a valid username/password');
    else {
      //make post request to server/db
      axios.post('/signup', { username: this.props.username,
                             password: this.props.password })
        .then(response => {

        });
    }
  }

  render() {
    return (
     <div>
      <div className='header'>
        <h1>Login</h1>
        <img src="./assets/logo.jpg" height="67.5" width="85" />
        <form className='add-form' onSubmit={this.handleLoginSubmit}>
          <input
            className="search-bar"
            type="text"
            placeholder="username"
            value={this.props.username}
            onChange={(e) => this.props.updateUsername(e.target.value)} />
            <input
              className="search-bar"
              type="text"
              placeholder="password"
              value={this.props.password}
              onChange={(e) => this.props.updatePassword(e.target.value)} />
            <button type="submit">Login</button>
          </form>
          <span>Don't have an account?</span>
          <span>Sign up</span>
        </div>
      </div>
    );
  }
}

//makes state.checklists in redux store accessible as props at componenent level
//called whenever store is updated
function mapStateToProps(state) {
  return { ...state.auth };
}

//wraps actionCreators in dispatch() call and merges them into component's props
//action creators can be invoked at component level without needing to call dispatch()
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

//connects component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(Login);
