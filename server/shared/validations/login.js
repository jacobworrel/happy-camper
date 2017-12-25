const validator = require('validator');
const isEmpty = require('lodash/isEmpty');

const validateLoginInput = ({username = '', password = ''}) => {
  const errors = {};
  // check if username and password are null
  if (validator.isEmpty(username)) {
    errors.username = 'This field is required';
  }
  if (validator.isEmpty(password)) {
    errors.password = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateLoginInput;
