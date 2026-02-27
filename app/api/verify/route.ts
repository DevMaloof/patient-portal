// /app/api/verify/route.ts - FIXED
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.json({ error: "Token missing" }, { status: 400 });
        }

        const db = await connectDB();

        // Use native MongoDB collections
        const verificationTokensCollection = db.collection("verificationtokens");
        const usersCollection = db.collection("users");

        // 1️⃣ Find token
        const record = await verificationTokensCollection.findOne({ token });
        if (!record) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        // 2️⃣ Check expiry
        if (record.expires < new Date()) {
            await verificationTokensCollection.deleteOne({ token });
            return NextResponse.json({ error: "Token expired" }, { status: 400 });
        }

        // 3️⃣ Find user by email
        const user = await usersCollection.findOne({ email: record.email });

        if (user) {
            // 🟢 If user exists but is unverified → mark verified
            if (!user.verified) {
                await usersCollection.updateOne(
                    { email: record.email },
                    {
                        $set: {
                            verified: true,
                            verifyToken: null
                        }
                    }
                );
            }
        } else {
            // 🟢 If user does NOT exist → create a new verified user
            await usersCollection.insertOne({
                email: record.email,
                name: record.name,
                password: record.passwordHash,
                image: record.image || "",
                verified: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        // 4️⃣ Delete token
        await verificationTokensCollection.deleteOne({ token });

        // ✅ Redirect success
        return NextResponse.redirect(new URL("/?verified=success", req.url));
    } catch (error) {
        console.error("Email verification error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}