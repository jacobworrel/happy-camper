const userController = {};
const User = require('./../models/user-model.js');
const validateSignupInput = require('../shared/validations/signup');
const validateLoginInput = require('../shared/validations/login');

userController.authenticateUser = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (isValid) {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
      if (err) res.status(500).send(err);
      else if (user) res.status(200).send(user);
      else {
        const error = { invalid: 'Invalid username/password'};
        res.status(400).json(error);
      }
    });
  }
  else res.status(400).json(errors);
}

userController.addUser = (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);
  if (isValid) {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    user.save((err) => {
      if (err) res.status(500).send(err);
      res.send(user);
    });
  }
  else res.status(400).json(errors);
}

module.exports = userController;
