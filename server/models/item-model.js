const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemSchema = new Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  checked: { type: Boolean, default: false },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Item', itemSchema);
