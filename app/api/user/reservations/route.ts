// /app/api/user/reservations/route.ts - FIXED
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { ReservationFactory, IReservation } from "@/models/Reservation";
import { Model } from "mongoose";

export async function GET() {
    try {
        // 1️⃣ Connect to Restaurant DB
        const db = await connectDB();

        // ✅ FIX: Get the model instance correctly
        const ReservationModel: Model<IReservation> = db.models.Reservation || ReservationFactory(db);

        // 2️⃣ Get current user session
        const session = (await getServerSession(authOptions)) as {
            user?: { email?: string };
        } | null;

        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // 3️⃣ Fetch reservations for the logged-in user
        const reservations = await ReservationModel.find({
            email: session.user.email,
        }).sort({ createdAt: -1 });

        return NextResponse.json(reservations);
    } catch (err) {
        console.error("Reservations route error:", err);
        return NextResponse.json(
            { message: "Failed to load reservations" },
            { status: 500 }
        );
    }
}