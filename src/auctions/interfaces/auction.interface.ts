import { Document } from 'mongoose';
import { IUser } from '../../users/interfaces/user.interface';
export interface Auction extends Document {
  id: string;
  seller: IUser;
}
