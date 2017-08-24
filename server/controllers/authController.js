const authController = {};
import User from './../models/user-model.js';
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

authController.verifyUser = (req, res) => {
  User.findOne(req.body, (err, user) => {
    if (err) res.status(400).send(err);
    else if (user) res.status(200).send(user);
    else res.status(400).send('invalid username/password');
  });
}

authController.addUser = (req, res) => {
  const { errors, isValid } = validateInput(req.body);
  if (!isValid) res.status(400).json(errors);
}

export default authController;
