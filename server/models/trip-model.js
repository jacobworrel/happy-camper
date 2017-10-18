import mongoose from 'mongoose';
import { itemSchema } from './item-model';
const Schema = mongoose.Schema;

export const tripSchema = new Schema ({
  tripName: { type: String, required: true },
  checklist: [itemSchema],
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export const Trip = mongoose.model('Trip', tripSchema);
