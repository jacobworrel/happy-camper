const userController = {};
import User from './../models/user-model.js';
import validateSignupInput from '../shared/validations/signup';
import validateLoginInput from '../shared/validations/login';

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
  console.log('in add user')
  const { errors, isValid } = validateSignupInput(req.body);
  if (isValid) {
    console.log('is valid')
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    user.save((err) => {
      console.log('in save')
      if (err) res.status(500).send('ERROR');
      res.send(user);
    });
  }
  else res.status(400).json(errors);
}

export default userController;
