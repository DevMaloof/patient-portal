// /app/api/reservations/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ReservationFactory, IReservation } from "@/models/Reservation";
import { Model } from "mongoose";

// normalize reservation
function formatReservation(r: IReservation & { _id: any }) {
    return {
        id: r._id?.toString(),
        name: r.name,
        email: r.email,
        phone: r.phone,
        date: r.date,
        time: r.time,
        guests: r.guests,
        status: r.reservationStatus ?? "pending",
        createdAt: r.createdAt,
    };
}

// CORS wrapper
function withCORS(data: any, status = 200) {
    return NextResponse.json(data, {
        status,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}

// GET /api/reservations
export async function GET() {
    try {
        const db = await connectDB();
        const Reservation: Model<IReservation> =
            db.models.Reservation || ReservationFactory(db);

        const reservations = await Reservation.find()
            .sort({ createdAt: -1 })
            .lean();

        return withCORS(reservations.map(formatReservation));
    } catch (err) {
        console.error("❌ Fetch error:", err);
        return withCORS({ error: "Failed to fetch reservations" }, 500);
    }
}

// POST /api/reservations
export async function POST(req: Request) {
    try {
        const db = await connectDB();
        const Reservation: Model<IReservation> =
            db.models.Reservation || ReservationFactory(db);

        const body = await req.json();

        const newReservation = await Reservation.create({
            name: body.name,
            email: body.email,
            phone: body.phone,
            guests: body.guests,
            date: body.date,
            time: body.time,
            reservationStatus: "pending",
        });

        return withCORS(formatReservation(newReservation.toObject()), 201);
    } catch (err) {
        console.error("❌ Create error:", err);
        return withCORS({ error: "Failed to create reservation" }, 500);
    }
}
