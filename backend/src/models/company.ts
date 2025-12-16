import mongoose, { Schema, Document, Model } from 'mongoose';
import type { IUser } from './user';

export interface ICompany extends Document {
  name: string;
  cmp: number;
  pointChange: number;
  lastPoint: number;
  user: IUser | mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const CompanySchema: Schema = new Schema<ICompany>(
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

const Company: Model<ICompany> = mongoose.models.Company || mongoose.model<ICompany>('Company', CompanySchema);

export default Company;
