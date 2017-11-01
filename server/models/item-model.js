import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const itemSchema = new Schema ({
  category: { type: String, required: true },
  name: { type: String, required: true },
  checked: { type: Boolean, default: false },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

export const Item = mongoose.model('Item', itemSchema);
