const authController = {};
import User from './../models/user-model.js';

authController.verifyUser = (req, res) => {
  User.findOne(req.body, (err, user) => {
    if (err) res.status(400).send(err);
    else if (user) res.status(200).send(user);
    else res.status(400).send('invalid username/password');
  });
}

authController.addUser = (req, res) => {

}

export default authController;
