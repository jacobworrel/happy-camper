const validator = require('validator');
const isEmpty = require('lodash/isEmpty');

const validateSignupInput = (data) => {
  let errors = {};

  //check for valid email via validator
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  //check that password === passwordConfirmation
  if (!validator.equals (data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  //check if username, email, password or passwordConfirmation are null
  if (validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateSignupInput;
