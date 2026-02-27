// /models/Reservation.ts (Restaurant)

import mongoose, { Schema, Document, Connection, Model } from "mongoose";

export interface IReservation extends Document {
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: Date;
  time: string;
  reservationStatus: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const ReservationSchema = new Schema<IReservation>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    guests: { type: Number, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    reservationStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// ----------------------------------------------
// 1️⃣ DEFAULT EXPORT → READY-TO-USE MODEL
// ----------------------------------------------
export const Reservation: Model<IReservation> =
  mongoose.models.Reservation ||
  mongoose.model<IReservation>("Reservation", ReservationSchema);

// ----------------------------------------------
// 2️⃣ FACTORY EXPORT → USE WITH createConnection()
// ----------------------------------------------
export function ReservationFactory(conn: Connection): Model<IReservation> {
  return conn.models.Reservation || conn.model("Reservation", ReservationSchema);
}

export default Reservation;
