// /models/ResetToken.ts
import mongoose, { Schema, models, model } from "mongoose";

const resetTokenSchema = new Schema(
    {
        email: { type: String, required: true },
        token: { type: String, required: true, unique: true },
        expires: { type: Date, required: true },
    },
    { timestamps: true }
);

export default models.ResetToken || model("ResetToken", resetTokenSchema);
