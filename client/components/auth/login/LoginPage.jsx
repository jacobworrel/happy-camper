import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/auth/authActionCreators';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import validateLoginInput from '../../../../server/shared/validations/login';

class LoginPage extends React.Component {

  isValid() {
    const { username, password } = this.props;
    const { errors, isValid } = validateLoginInput({ username, password });
    if (!isValid) this.props.updateErrors(errors);
    return isValid;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.props.toggleLoading();
      this.props.updateErrors({});
      const { username, password } = this.props;
      this.props.userLoginRequest({ username, password })
        .then(() => {
          //authenticate user
          this.props.authenticate();
        })
        .catch((error) => {
          //display error msg 'invalid username/password'
          if (error.response) this.props.updateErrors(error.response.data);
        });
    }
  }

  render() {
    return this.props.isAuthenticated
      ? <Redirect to='/checklist'/>
      : (
       <div>
        <h1>Login</h1>
          <LoginForm
            username={this.props.username}
            password={this.props.password}
            errors={this.props.errors}
            handleSubmit={this.handleSubmit}
            updateField={this.props.updateField}
            isLoading={this.props.isLoading}
          />
          <span>Don't have an account?</span>
          <span>
            <Link to='/signup'>Sign Up</Link>
          </span>
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
