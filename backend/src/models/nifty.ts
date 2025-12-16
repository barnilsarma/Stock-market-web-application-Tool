import mongoose, {Schema, Document, Model} from 'mongoose';
import { IUser } from './user';
export interface INifty extends Document {
  name: string;
  cmp: Number;
  pointChange: Number;
  lastPoint: Number;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
  userId: mongoose.Schema.Types.ObjectId;
}

const NiftySchema: Schema = new Schema<INifty>({
  name: { type: String, required: true },
  cmp: { type: Number, required: true, unique: true, index: true },
  pointChange: { type: Number, default: 0 },
  lastPoint: { type: Number,required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true }
}, { timestamps: true });

const Nifty: Model<INifty> = mongoose.models.Nifty || mongoose.model<INifty>('Nifty', NiftySchema);

export default Nifty;
