const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema ({
  category: {type: String, required: true},
  item: {type: String, required: true}
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
