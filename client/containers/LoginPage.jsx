import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as actionCreators from './../actions/auth/authActionCreators';
import LoginForm from './../components/auth/login/LoginForm';
import validateLoginInput from './../../server/shared/validations/login';

class LoginPage extends Component {
  isValid() {
    const { username, password } = this.props;
    const { errors, isValid } = validateLoginInput({ username, password });
    if (!isValid) this.props.updateErrors(errors);
    return isValid;
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.isValid()) {
      this.props.toggleLoading();
      this.props.updateErrors({});
      const { username, password } = this.props;
      this.props.userLoginRequest({ username, password });
    }
  };

  render() {
    return this.props.isAuthenticated ? (
      <Redirect to="/profile" />
    ) : (
      <div>
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
          <Link to="/signup">Sign Up</Link>
        </span>
      </div>
    );
  }
}

// called whenever store is updated
function mapStateToProps(state) {
  return { ...state.auth };
}

// wraps actionCreators in dispatch() call and merges them into component's props
// action creators can be invoked at component level without needing to call dispatch()
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

// connects component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
