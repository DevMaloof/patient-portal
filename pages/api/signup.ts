// pages/api/signup.ts - CORRECTED VERSION
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb"; // Use your existing connection function
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/emails/sendVerificationEmail";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // ✅ Use your existing connectDB function that we fixed
    const db = await connectDB();

    // ✅ Use native MongoDB collections from your connection
    const usersCollection = db.collection("users");
    const verificationTokensCollection = db.collection("verificationtokens");

    // ❌ Block if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists. Please log in." });
    }

    // ❌ Block if a token already exists (avoid spam)
    const existingToken = await verificationTokensCollection.findOne({ email });
    if (existingToken) {
      return res.status(400).json({
        error: "Verification email already sent. Please check your inbox.",
      });
    }

    // 🔒 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔑 Create verification token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await verificationTokensCollection.insertOne({
      email,
      name,
      passwordHash: hashedPassword,
      image: "",
      token,
      expires,
    });

    // 📧 Build verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}`;

    // 📤 Send verification email
    await sendVerificationEmail(email, verificationUrl);

    return res.status(200).json({
      message: "Please verify your email before logging in.",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}