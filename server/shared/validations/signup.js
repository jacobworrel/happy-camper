const validator = require('validator');
const isEmpty = require('lodash/isEmpty');

const validateSignupInput = ({
  username = '',
  email = '',
  password = '',
  passwordConfirmation = '',
}) => {
  const errors = {};

  // check for valid email via validator
  if (!validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }
  // check that password === passwordConfirmation
  if (!validator.equals(password, passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  // check if username, email, password or passwordConfirmation are null
  if (validator.isEmpty(username)) {
    errors.username = 'This field is required';
  }
  if (validator.isEmpty(email)) {
    errors.email = 'This field is required';
  }
  if (validator.isEmpty(password)) {
    errors.password = 'This field is required';
  }
  if (validator.isEmpty(passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateSignupInput;
