const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

// WARNING! must use ES5 function notation here or 'this' context will be undefined
userSchema.pre('save', function(next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) next(err);
      this.password = hash;
      next();
    });
  });
});

// WARNING! must use ES5 function notation or 'this' context will be undefined
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, authenticated) => {
    if (err) return callback(err);
    callback(null, authenticated);
  });
};

module.exports = mongoose.model('User', userSchema);
