import mongoose, { Schema, models, model } from "mongoose";

const verificationTokenSchema = new Schema(
  {
    email: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    expires: { type: Date, required: true },
    name: { type: String },
    passwordHash: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const VerificationToken =
  models.VerificationToken ||
  model("VerificationToken", verificationTokenSchema);

export default VerificationToken;
