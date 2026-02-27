// /app/api/subscriptions/route.ts - USING FACTORY
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SubscriptionFactory from "@/models/Subscription"; // Import factory

// Helper to format CORS responses
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

// Handle preflight (CORS)
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

// GET /api/subscriptions → Fetch all subscriptions
export async function GET() {
    try {
        const db = await connectDB();
        // ✅ Get model from factory
        const SubscriptionModel = db.models.Subscription || SubscriptionFactory(db);

        const subscriptions = await SubscriptionModel.find().sort({ createdAt: -1 });
        return withCORS(subscriptions, 200);
    } catch (error) {
        console.error("❌ Error fetching subscriptions:", error);
        return withCORS({ error: "Failed to fetch subscriptions" }, 500);
    }
}

// POST /api/subscriptions → Add a new subscription
export async function POST(req: Request) {
    try {
        const db = await connectDB();
        // ✅ Get model from factory
        const SubscriptionModel = db.models.Subscription || SubscriptionFactory(db);

        const { email } = await req.json();

        if (!email) {
            return withCORS({ error: "Email is required" }, 400);
        }

        // Avoid duplicate subscriptions
        const existing = await SubscriptionModel.findOne({ email });
        if (existing) {
            return withCORS({ message: "Already subscribed!" }, 200);
        }

        const newSub = new SubscriptionModel({ email });
        await newSub.save();

        return withCORS({ message: "Subscribed successfully!" }, 201);
    } catch (error) {
        console.error("❌ Error creating subscription:", error);
        return withCORS({ error: "Failed to create subscription" }, 500);
    }
}