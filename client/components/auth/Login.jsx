import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth/authActionCreators';
import { Link } from 'react-router-dom';
import Form from './Form';

class Login extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('in login submit')
    // if (!this.props.username || !this.props.password) alert('please enter a valid username/password');
    // else {
    //   //make post request to server/db
    //   axios.post('/login', { username: this.props.username,
    //                          password: this.props.password })
    //     .then(response => {
    //       if (!response.data) alert('please enter a valid username/password');
    //     });
    // }
  }

  render() {
    return (
     <div>
      <div className='header'>
        <h1>Login</h1>
        <img src="./assets/logo.jpg" height="67.5" width="85" />
          <Form
            buttonText={'Login'}
            username={this.props.username}
            password={this.props.password}
            handleSubmit={this.handleSubmit}
            updateUsername={this.props.updateUsername}
            updatePassword={this.props.updatePassword}
          />
          <span>Don't have an account?</span>
          <span>
            <Link to='/signup'>Sign Up</Link>
          </span>
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
