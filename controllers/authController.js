const authController = {};
const User = require('./../models/user-model.js');

authController.verifyUser = (req, res) => {
  User.findOne(req.body, (err, user) => {
    if (err) res.status(400).send(err);
    res.status(200).send(user);
  });
}

authController.addUser = (req, res) => {

}

module.exports = authController;
