import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as actionCreators from './../actions/auth/authActionCreators';
import AuthForm from './../components/auth/AuthForm';
import validateLoginInput from './../../server/shared/validations/login';
import styles from './LoginPage.css';

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
      <div className={styles.container}>
        <AuthForm
          fields={['username', 'password']}
          labels={['Username', 'Password']}
          errors={this.props.errors}
          handleSubmit={this.handleSubmit}
          updateField={this.props.updateField}
          buttonText="Login"
          isLoading={this.props.isLoading}
        />
        <div className={styles.signup}>
          <span className={styles.span}>Don't have an account?</span>
          <span className={styles.span}>
            <Link to="/signup">Sign Up</Link>
          </span>
        </div>
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
