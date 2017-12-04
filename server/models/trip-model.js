const mongoose = require('mongoose');

const { Schema } = mongoose;

const tripSchema = new Schema({
  tripName: { type: String, required: true },
  checklist: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Trip', tripSchema);
