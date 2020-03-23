import { Document } from 'mongoose';
export interface IUser extends Document {
  readonly id: string;
  readonly username: string;
  readonly pnr: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
