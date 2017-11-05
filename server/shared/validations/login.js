const validator = require('validator');
const isEmpty = require('lodash/isEmpty');

const validateLoginInput = (data) => {
  let errors = {};
  //check if username and password are null
  if (validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateLoginInput;
