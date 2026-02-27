// /pages/api/auth/forgotpassword.ts - FIXED
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/emails/PasswordRestEmail";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST")
        return res.status(405).json({ error: "Method not allowed" });

    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    try {
        const db = await connectDB();
        const usersCollection = db.collection("users");
        const resetTokensCollection = db.collection("resettokens");

        const user = await usersCollection.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 3600 * 1000); // 1 hour

        await resetTokensCollection.insertOne({ email, token, expires });

        await sendPasswordResetEmail(email, token);

        return res.status(200).json({ message: "Reset link sent to email" });
    } catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}