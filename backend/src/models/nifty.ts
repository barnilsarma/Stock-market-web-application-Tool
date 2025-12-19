import mongoose, { Schema, Document, Model } from 'mongoose';
import type { IUser } from './user';

export interface INifty extends Document {
  name: string;
  cmp: number;
  pointChange: number;
  lastPoint: number;
  user: IUser | mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const NiftySchema: Schema = new Schema<INifty>(
  {
    name: { type: String, required: true },
    cmp: { type: Number, required: true },
    pointChange: { type: Number, default: 0 },
    lastPoint: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId }
  },
  { timestamps: true }
);

const Nifty: Model<INifty> = mongoose.models.Nifty || mongoose.model<INifty>('Nifty', NiftySchema);

export default Nifty;
