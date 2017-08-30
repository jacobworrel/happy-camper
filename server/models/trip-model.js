import mongoose from 'mongoose';
import { itemSchema } from './item-model';
const Schema = mongoose.Schema;

export const tripSchema = new Schema ({
  name: { type: String, required: true },
  checklist: [itemSchema]
});

export const Trip = mongoose.model('Trip', tripSchema);
