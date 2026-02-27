// /models/Subscription.ts - UPDATED WITH FACTORY PATTERN
import mongoose, { Schema, Document, Connection, Model } from "mongoose";

export interface ISubscription extends Document {
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
    {
        email: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

// Factory function (same as your Reservation model)
export default function SubscriptionFactory(conn: Connection): Model<ISubscription> {
    return conn.models.Subscription || conn.model<ISubscription>("Subscription", SubscriptionSchema);
}
