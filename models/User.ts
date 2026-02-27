/// /models/User.ts
// /models/User.ts - Updated version
import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name?: string;
  email: string;
  image?: string;
  password?: string | null;
  verified: boolean;
  verifyToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    image: { type: String },
    password: { type: String, required: false, default: null },
    verified: { type: Boolean, default: false },
    verifyToken: { type: String, default: null },
  },
  { collection: "users", timestamps: true }
);

// Export the schema, not the model
export const UserSchema = userSchema;