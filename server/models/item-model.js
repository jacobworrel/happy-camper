const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema ({
  category: { type: String, required: true },
  name: { type: String, required: true },
  checked: { type: Boolean, default: false },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Item', itemSchema);
