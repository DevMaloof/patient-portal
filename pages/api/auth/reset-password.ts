// /pages/api/auth/reset-password.ts - FIXED
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Handle CORS preflight request
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    // Set CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { token, password } = req.body;

    if (!token || !password) {
        return res.status(400).json({ error: "Token and password are required" });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }

    try {
        const db = await connectDB();
        const resetTokensCollection = db.collection("resettokens");
        const usersCollection = db.collection("users");

        // 1️⃣ Find and validate token
        const resetTokenDoc = await resetTokensCollection.findOne({ token });
        if (!resetTokenDoc) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        if (resetTokenDoc.expires < new Date()) {
            await resetTokensCollection.deleteOne({ token }); // delete expired token
            return res.status(400).json({ error: "Token expired" });
        }

        // 2️⃣ Find the user by email
        const user = await usersCollection.findOne({ email: resetTokenDoc.email });
        if (!user) {
            await resetTokensCollection.deleteOne({ token }); // remove token if no user found
            return res.status(404).json({ error: "User not found" });
        }

        // 3️⃣ Hash the new password
        const hashedPassword = await bcrypt.hash(password, 12);
        await usersCollection.updateOne(
            { email: resetTokenDoc.email },
            {
                $set: {
                    password: hashedPassword,
                    updatedAt: new Date()
                }
            }
        );

        // 4️⃣ Delete the token (one-time use)
        await resetTokensCollection.deleteOne({ token });

        return res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Password reset error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}