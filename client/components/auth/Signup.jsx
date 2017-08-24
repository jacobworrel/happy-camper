import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth/authActionCreators.js';
import Form from './Form.jsx';

class Signup extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('in signup submit')
    this.props.authenticate(true);
    // if (!this.props.username || !this.props.password) alert('please enter a valid username/password');
    // else {
    //   //make post request to server/db
    //   axios.post('/signup', { username: this.props.username,
    //                          password: this.props.password })
    //     .then(response => {
    //
    //     });
    // }
  }

  render() {
    return (
      <div>
        <div className='header'>
          <h1>Signup</h1>
          <img src="./assets/logo.jpg" height="67.5" width="85" />
          <Form
            buttonText={'Sign Up'}
            username={this.props.username}
            password={this.props.password}
            handleSubmit={this.handleSubmit}
            updateUsername={this.props.updateUsername}
            updatePassword={this.props.updatePassword}
          />
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
export default connect(mapStateToProps, mapDispatchToProps)(Signup);