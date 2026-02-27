// /app/api/dashboard-data/route.ts
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ReservationFactory, IReservation } from "@/models/Reservation";
import { Model } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Format helper
const formatReservation = (r: IReservation & { _id: any }) => ({
    id: r._id?.toString() || "",
    name: r.name || "",
    email: r.email || "",
    phone: r.phone || "",
    date: r.date || "",
    time: r.time || "",
    guests: r.guests || 0,
    reservationStatus: r.reservationStatus || "pending",
});

// Define session type
interface CustomSession {
    user?: {
        email?: string | null;
        name?: string | null;
    };
}

export async function GET() {
    try {
        console.log("🔄 Starting dashboard data API...");

        // SESSION
        const session = (await getServerSession(authOptions)) as CustomSession | null;
        if (!session?.user?.email) {
            console.log("❌ Unauthorized user");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        console.log("✅ Session email:", session.user.email);

        // DB CONNECTION
        const db = await connectDB();

        // MODEL
        const Reservation: Model<IReservation> =
            db.models.Reservation || ReservationFactory(db);

        // QUERY
        const reservations = await Reservation.find({
            email: session.user.email,
        })
            .sort({ createdAt: -1 })
            .lean();

        console.log("✅ Reservations found:", reservations.length);

        const pending = reservations.filter((r) => r.reservationStatus === "pending");
        const approved = reservations.filter((r) => r.reservationStatus === "confirmed");
        const rejected = reservations.filter((r) => r.reservationStatus === "cancelled");
        const lastReservations = reservations
            .filter((r) => r.reservationStatus === "completed")
            .slice(0, 5);

        return NextResponse.json({
            lastReservations: lastReservations.map(formatReservation),
            pending: pending.map(formatReservation),
            approved: approved.map(formatReservation),
            rejected: rejected.map(formatReservation),
        });
    } catch (error) {
        console.error("❌ Dashboard fetch failed:", error);

        return NextResponse.json(
            {
                lastReservations: [],
                pending: [],
                approved: [],
                rejected: [],
            },
            { status: 200 }
        );
    }
}
