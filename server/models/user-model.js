import mongoose from 'mongoose';
import { tripSchema } from './trip-model';
import bcrypt from 'bcryptjs';


const Schema = mongoose.Schema;

const userSchema = new Schema ({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  trips: [tripSchema],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

//must use ES5 function notation here or 'this' context will be undefined
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

userSchema.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, docs) => {
    if (err) return callback(err);
    callback(null, docs);
  });
};

const User = mongoose.model('User', userSchema);

export default User;
