import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/auth/authActionCreators';
import SignupForm from './SignupForm';
import validateInput from '../../../../server/shared/validations/signup';

class SignupPage extends React.Component {

  isValid() {
    //implement client side validation
    const { username, email, password, passwordConfirmation } = this.props;
    const userData = { username, email, password, passwordConfirmation };
    const { errors, isValid} = validateInput(userData);
    if (!isValid) this.props.updateErrors(errors);
    return isValid;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      //disable button to keep user from submitting multiple forms
      this.props.toggleLoading();
      //empty errors object in redux store so old error messages aren't rendered
      this.props.updateErrors({});
      const { username, email, password, passwordConfirmation } = this.props;
      const userData = { username, email, password, passwordConfirmation };
      //make post request to server using redux thunk
      this.props.userSignupRequest(userData)
      .then((response) => {
        //REDIRECT HERE?
        console.log();
      })
      .catch((error) => {
        //enable button again so user can resubmit form if necessary
        this.props.toggleLoading();
        //update redux store with errors
        if (error.response) this.props.updateErrors(error.response.data);
      });
    }

    // this.props.authenticate(true);
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
        <h1>Signup</h1>
        <SignupForm
          buttonText={'Sign Up'}
          username={this.props.username}
          email={this.props.email}
          password={this.props.password}
          passwordConfirmation={this.props.passwordConfirmation}
          errors={this.props.errors}
          handleSubmit={this.handleSubmit}
          updateField={this.props.updateField}
          isLoading={this.props.isLoading}
        />
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
export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
