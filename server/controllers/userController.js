const User = require('./../models/user-model.js');
const validateSignupInput = require('../shared/validations/signup');
const validateLoginInput = require('../shared/validations/login');

/**
* @module userController
* @description Handles user authentication and contains
* business logic dealing with database operations on users.
*/

const userController = {};

/**
* @function authenticateUser
* @description Authenticates user by using comparePassword() method
* accessible on all User instances to compare candidate password
* with bcrypted password stored in database.
*
*/

userController.authenticateUser = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (isValid) {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
      if (err) res.status(500).send(err);
      else if (user) {
        user.comparePassword(password, (err, authenticated) => {
          if (err) res.status(500).send(err);
          else if (authenticated) res.status(200).send(user);
          else {
            const error = { invalid: 'Invalid username/password' };
            res.status(400).json(error);
          }
        });
      } else {
        const error = { invalid: 'Invalid username/password' };
        res.status(400).json(error);
      }
    });
  } else {
    res.status(400).json(errors);
  }
};

/**
* @function addUser
* @description Adds a new user to the database.
*
* Uses validateSignupInput() helper to validate form input.
*
*/

userController.addUser = (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);
  if (isValid) {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    user.save((err) => {
      if (err) res.status(500).send(err);
      res.send(user);
    });
  } else {
    res.status(400).json(errors);
  }
};

module.exports = userController;
