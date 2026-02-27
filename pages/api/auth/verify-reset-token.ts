// pages/api/auth/verify-reset-token.ts - IMPROVED
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { token } = req.query;

    if (!token || typeof token !== "string") {
        return res.status(400).json({ error: "Token is required" });
    }

    try {
        const db = await connectDB();
        const resetTokensCollection = db.collection("resettokens");

        const resetTokenDoc = await resetTokensCollection.findOne({ token });
        if (!resetTokenDoc) {
            return res.status(400).json({ error: "Invalid token" });
        }

        // 🗑 Delete if expired
        if (resetTokenDoc.expires < new Date()) {
            await resetTokensCollection.deleteOne({ token });
            return res.status(400).json({ error: "Token expired" });
        }

        // ✅ Return consistent success response with email
        return res.status(200).json({
            valid: true,
            message: "Token valid",
            email: resetTokenDoc.email // Optional: useful for debugging
        });
    } catch (error) {
        console.error("Verify reset token error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}