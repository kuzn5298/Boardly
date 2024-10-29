import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../interfaces';

export interface IUserModel extends IUser, Document {
  _id: string;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUserModel>('User', UserSchema);
