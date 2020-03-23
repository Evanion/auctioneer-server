import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    pnr: { type: String, unique: true, trim: true },
    password: { type: String },
  },
  { timestamps: true },
);
