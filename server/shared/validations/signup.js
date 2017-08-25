import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  let errors = {};

  //check for valid email via Validator
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  //check that password === passwordConfirmation
  if (!Validator.equals (data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  //check if username, email, password or passwordConfirmation are null
  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default validateInput;
