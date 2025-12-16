import mongoose, {Schema, Document, Model} from 'mongoose';
import { ICompany } from './company';
import { INifty } from './nifty';
export interface IUser extends Document {
  name: string;
  email: string;
  role?: string;
  token?: string;
  companies: ICompany[];
  nifties: INifty[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  role: { type: String, default: 'user' },
  token: { type: String, default: '' },
  companies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
  nifties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Nifty' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
