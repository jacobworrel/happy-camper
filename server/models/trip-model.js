const mongoose = require('mongoose');
// import { itemSchema } from './item-model';
const Schema = mongoose.Schema;

const tripSchema = new Schema ({
  tripName: { type: String, required: true },
  // checklist: [itemSchema],
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Trip', tripSchema);
