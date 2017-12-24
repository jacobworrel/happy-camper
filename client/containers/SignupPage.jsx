import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreators from './../actions/auth/authActionCreators';
import AuthForm from './../components/auth/AuthForm';
import validateSignupInput from './../../server/shared/validations/signup';
import styles from './SignupPage.css';

class SignupPage extends Component {
  isValid() {
    // implement client side validation
    const { username, email, password, passwordConfirmation } = this.props;
    const userData = { username, email, password, passwordConfirmation };
    const { errors, isValid } = validateSignupInput(userData);
    if (!isValid) this.props.updateErrors(errors);
    return isValid;
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.isValid()) {
      // disable button to keep user from submitting multiple forms
      this.props.toggleLoading();
      // empty errors object in redux store so old error messages aren't rendered
      this.props.updateErrors({});
      const { username, email, password, passwordConfirmation } = this.props;
      const userData = { username, email, password, passwordConfirmation };
      // make post request to server using redux thunk
      this.props.userSignupRequest(userData);
    }
  };

  render() {
    return this.props.isAuthenticated ? (
      <Redirect to="/profile" />
    ) : (
      <div className={styles.container}>
        <AuthForm
          fields={['username', 'email', 'password', 'passwordConfirmation']}
          labels={['Username', 'Email', 'Password', 'Password Confirmation']}
          errors={this.props.errors}
          handleSubmit={this.handleSubmit}
          updateField={this.props.updateField}
          buttonText="Signup"
          isLoading={this.props.isLoading}
        />
      </div>
    );
  }
}

// makes state in redux store accessible as props at componenent level
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
export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
