import { Schema } from 'mongoose';

export const AuctionSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    seller: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);
