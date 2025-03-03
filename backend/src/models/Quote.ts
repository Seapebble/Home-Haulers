import mongoose, { Schema, Document } from "mongoose";

export interface IQuote extends Document {
  name: string;
  email: string;
  phone: string;
  movingDate: Date;
  movingSize: string;
  movingFrom: string;
  movingTo: string;
  additionalDetails?: string;
  status: "pending" | "confirmed" | "completed";
  createdAt: Date;
}

const QuoteSchema = new Schema<IQuote>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  movingDate: { type: Date, required: true },
  movingSize: { type: String, required: true },
  movingFrom: { type: String, required: true },
  movingTo: { type: String, required: true },
  additionalDetails: { type: String },
  status: { type: String, enum: ["pending", "confirmed", "completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IQuote>("Quote", QuoteSchema);
